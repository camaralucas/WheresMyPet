import React from 'react';
import {Alert, View, Button} from 'react-native';
import {Storage} from 'aws-amplify';
import globalTheme from '../../theme/globalTheme';

export default function UploadImageButton({
  route,
  navigation,
  disabled = false,
}) {
  let {animal} = route.params;

  async function uploadImageHandle() {
    try {
      if (animal.photoURI) {
        let timestamp = new Date().getTime();
        const response = await fetch(animal.photoURI);
        const blob = await response.blob();

        let imageInfo = await Storage.put(`${timestamp}.jpeg`, blob, {
          contentType: 'image/jpeg',
        });

        console.log('IMAGE INFO → ', imageInfo);

        if (imageInfo.key) {
          let signedURL = await Storage.get(imageInfo.key);
          console.log('SIGNED URL → ', signedURL);

          animal = {...animal, photoKey: imageInfo.key, photoURL: signedURL};
        }

        Alert.alert('SUCESSO', 'Imagem enviada com sucesso!');
        navigation.navigate('FormScreen', {animal});
      } else {
        Alert.alert('ERRO', 'Foto não selecionada.');
      }
    } catch (e) {
      console.log('ERRO', e);
    }
  }

  return (
    <View style={globalTheme.buttonContainerStyle}>
      <Button
        title="ENVIAR FOTO"
        onPress={uploadImageHandle}
        color="#ffad33"
        disabled={disabled}
      />
    </View>
  );
}
