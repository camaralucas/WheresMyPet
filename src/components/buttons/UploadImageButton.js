import React from 'react';
import {Alert} from 'react-native';
import {ThemeProvider, Button} from 'react-native-elements';
import {Storage} from 'aws-amplify';

export default function UploadImageButton({route, navigation}) {
  const {animal} = route.params;

  async function uploadImageHandle() {
    try {
      if (animal.image.uri) {
        let timestamp = new Date().getTime();
        let imageInfo = await Storage.put(timestamp, animal.image.uri, {
          contentType: 'image/jpeg',
        });
        navigation.setParams((animal.image.key = imageInfo.key));
        setSignedURL;
        Alert.alert('SUCESSO', 'Imagem enviada com sucesso!');
        navigation.navigate('HomePage', {animal});
      } else {
        Alert.alert('ERRO', 'Foto não selecionada.');
      }

      async function setSignedURL() {
        if (animal.image.key) {
          let signedURL = await Storage.get(animal.image.key);
          setParams((animal.image.signedURL = signedURL));
        }
      }
    } catch (e) {
      console.log('ERRO', e);
    }
  }

  return (
    <ThemeProvider>
      <Button title="ENVIAR FOTO" onPress={uploadImageHandle} />
    </ThemeProvider>
  );
}
