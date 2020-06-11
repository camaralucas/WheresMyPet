import {Storage} from 'aws-amplify';
import {Alert} from 'react-native';

export default async function uploadImage(photoURI) {
  try {
    const timestamp = new Date().getTime();
    const response = await fetch(photoURI);
    const blob = await response.blob();

    const imageInfo = await Storage.put(`${timestamp}.jpeg`, blob, {
      contentType: 'image/jpeg',
    });

    if (imageInfo.key) {
      const signedURL = await Storage.get(imageInfo.key);
      Alert.alert('SUCESSO', 'Imagem enviada com sucesso!');
      return imageInfo.key, signedURL;
    }
  } catch (e) {
    Alert.alert('ERRO', 'Erro ao enviar imagem.');
  }
}
