import Amplify from 'aws-amplify';
import {AmazonAIPredictionsProvider} from '@aws-amplify/predictions';
import Predictions from '@aws-amplify/predictions';

Amplify.addPluggable(new AmazonAIPredictionsProvider());

export default async function indetifyLabels(key) {
  Predictions.identify({
    labels: {
      source: {
        key: key,
      },
      type: 'LABELS',
    },
  })
    .then(response => {
      console.log('RESPONSE → ', response);
      const {labels} = response;
      labels.forEach(object => {
        const {name, boundingBoxes} = object;
        console.log('NAME → ', name, 'boundingBoxes → ', boundingBoxes);
      });
    })
    .catch(err => console.log({err}));
}
