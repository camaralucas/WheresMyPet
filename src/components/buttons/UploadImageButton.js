import React from 'react';
import {Alert} from 'react-native';
import {ThemeProvider, Button} from 'react-native-elements';
import {Storage} from 'aws-amplify';
import GlobalTheme from '../../styles/GlobalTheme';

import Predictions from '@aws-amplify/predictions';

export default function UploadImageButton({
  navigation,
  animal,
  title,
  disabled = false,
}) {
  console.log('ANIMAL → ', animal);

  async function uploadImageHandle() {
    try {
      if (animal.photoURI) {
        let timestamp = new Date().getTime();
        const response = await fetch(animal.photoURI);
        const blob = await response.blob();

        let imageInfo = await Storage.put(`${timestamp}.jpeg`, blob, {
          contentType: 'image/jpeg',
        });

        if (imageInfo.key) {
          let signedURL = await Storage.get(imageInfo.key);

          animal = {...animal, photoKey: imageInfo.key, photoURL: signedURL};
          Alert.alert('SUCESSO', 'Imagem enviada com sucesso!');
          indetifyLabels(animal.photoKey);
        }
        navigation.setParams({animal: animal});
      } else {
        Alert.alert('ERRO', 'Foto não selecionada.');
      }
    } catch (e) {
      console.log('ERRO', e);
    }
  }

  async function indetifyLabels(key) {
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

  return (
    <ThemeProvider theme={GlobalTheme}>
      <Button title={title} onPress={uploadImageHandle} disabled={disabled} />
    </ThemeProvider>
  );
}

// labels: {
//   source: {
//     key: key,
//   },
//   type: 'LABELS',
// },
