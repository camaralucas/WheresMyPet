import ImagePicker from 'react-native-image-picker';

export default async function imagePicker(callback) {
  const options = {
    title: 'Selecione uma foto',
    cancelButtonTitle: 'Cancelar',
    takePhotoButtonTitle: 'Tirar foto...',
    chooseFromLibraryButtonTitle: 'Escolher da galeria',
    noData: true,
    mediaType: 'photo',
    cameraType: 'back',
  };

  ImagePicker.showImagePicker(options, callback);
}
