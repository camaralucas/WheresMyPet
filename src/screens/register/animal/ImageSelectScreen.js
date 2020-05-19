import React, {useState, useEffect} from 'react';
import GlobalTheme from '../../../theme/GlobalTheme';
import {ThemeProvider, Button, Avatar} from 'react-native-elements';
import {SafeAreaView} from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default function ImageSelectScreen({route, navigation}) {
  const defaultImage = require('../../../assets/dog-and-cat.png');
  const [animal, setAnimal] = useState(route.params.animal);

  useEffect(() => {
    if (route.params?.animal) {
      setAnimal(route.params.animal);
    }
  }, [route.params?.animal]);

  function imagePicker() {
    const options = {
      title: 'Selecione uma foto',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Tirar foto...',
      chooseFromLibraryButtonTitle: 'Escolher da galeria',
      noData: true,
      mediaType: 'photo',
      cameraType: 'back',
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        setAnimal({...animal, photoURI: response.uri});
      }
    });
  }

  return (
    <SafeAreaView>
      <ThemeProvider theme={GlobalTheme}>
        <Avatar
          rounded
          source={!animal.photoURI ? defaultImage : {uri: animal.photoURI}}
          onPress={imagePicker}
        />
        <Button title="SELECIONAR FOTO" onPress={imagePicker} />
        <Button
          title="APAGAR FOTO"
          onPress={() => setAnimal({...animal, photoURI: null})}
        />
        <Button
          title="PRÓXIMO"
          onPress={() => {
            navigation.navigate('BreedSelectScreen', {animal});
          }}
          disabled={!animal.photoURI}
        />
      </ThemeProvider>
    </SafeAreaView>
  );
}
