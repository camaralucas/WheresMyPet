import React from 'react';
import {Alert, View, Button} from 'react-native';
import {Storage} from 'aws-amplify';
import globalTheme from '../../theme/globalTheme';

export default function UploadImageButton({
  route,
  navigation,
  disable = false,
}) {
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
        navigation.navigate('RegisterAnimalFormScreen', {animal});
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
    <View style={globalTheme.buttonContainerStyle}>
      <Button
        title="ENVIAR FOTO"
        onPress={uploadImageHandle}
        color="#ffad33"
        disable={disable}
      />
    </View>
  );
}
