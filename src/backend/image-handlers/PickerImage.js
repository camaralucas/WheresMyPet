import ImagePicker from 'react-native-image-picker';

export default async function PickerImage(callback) {
  const options = {
    title: 'Selecione uma foto',
    cancelButtonTitle: 'Cancelar',
    takePhotoButtonTitle: 'Tirar foto...',
    chooseFromLibraryButtonTitle: 'Escolher da galeria',
    mediaType: 'photo',
    cameraType: 'back',
  };

  ImagePicker.showImagePicker(options, callback);
}
