import React, {useState} from 'react';
import Amplify from 'aws-amplify';
import Predictions, {
  AmazonAIPredictionsProvider,
} from '@aws-amplify/predictions';
import GlobalTheme from '../../../theme/GlobalTheme';
import {ThemeProvider, Button, Avatar} from 'react-native-elements';
import {SafeAreaView} from 'react-native';

Amplify.addPluggable(new AmazonAIPredictionsProvider());

export default function BreedSelectScreen({route, navigation}) {
  const [animal, setAnimal] = useState(route.params.animal);

  async function indetifyLabels() {
    // const response = await fetch(animal.photoURI);
    // const blob = await response.blob();

    Predictions.identify({
      labels: {
        source: {
          key: '0346100963628332.jpg',
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

  return (
    <SafeAreaView>
      <ThemeProvider theme={GlobalTheme}>
        <Avatar
          rounded
          source={{uri: animal.photoURI}}
          onPress={indetifyLabels}
        />

        <Button
          title="PRÓXIMO >>"
          onPress={indetifyLabels}
          disabled={!animal.photoURI ? true : false}
        />
      </ThemeProvider>
    </SafeAreaView>
  );
}

// navigation.navigate('FormScreen', {animal});
