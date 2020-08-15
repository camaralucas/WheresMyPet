import Amplify from 'aws-amplify';
import {AmazonAIPredictionsProvider} from '@aws-amplify/predictions';
import Predictions from '@aws-amplify/predictions';
import DogBreeds from '../../backend/breeds/DogBreeds';

Amplify.addPluggable(new AmazonAIPredictionsProvider());

export default async function IdentifyLabels(key) {
  const labels = await Predictions.identify({
    labels: {
      source: {
        key: key,
      },
      type: 'LABELS',
    },
  })
    .then(response => {
      const {labels} = response;
      return labels;
    })
    .catch(err => console.log({err}));

  var actualBreed = {
    name: undefined,
    breed: undefined,
    subBreed: undefined,
    confidence: undefined,
    photo: undefined,
  };

  await labels.forEach(label => {
    const {name, metadata} = label;
    var labelName = name.toLowerCase().replace(' ', '');

    Object.keys(DogBreeds).forEach(breed => {
      if (
        labelName.includes(breed) &&
        metadata.confidence > 85 &&
        (actualBreed.breed == undefined ||
          actualBreed.breed.length < labelName.length)
      ) {
        actualBreed.name = name;
        actualBreed.breed = breed;
        actualBreed.subBreed = undefined;
        actualBreed.confidence = metadata.confidence.toString().slice(0, 5);

        if (DogBreeds[breed].length > 0) {
          DogBreeds[breed].forEach(subBreed => {
            if (labelName.includes(subBreed)) {
              actualBreed.subBreed = subBreed;
            }
          });
        }
      }
    });
  });

  return actualBreed;
}
