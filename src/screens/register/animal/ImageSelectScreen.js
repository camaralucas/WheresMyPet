import React, {useState, useEffect} from 'react';
import {SafeAreaView, Alert} from 'react-native';
import GlobalTheme from '../../../styles/GlobalTheme';
import {ThemeProvider, Button, Avatar} from 'react-native-elements';
import imagePicker from '../../../backend/image-handlers/imagePicker';

export default function ImageSelectScreen({route, navigation}) {
  const [animal, setAnimal] = useState(route.params.animal);

  function imagePickerCallback(uri) {
    if (uri) {
      setAnimal({...animal, photoURI: uri});
    } else {
      Alert.alert('', 'Foto não selecionada');
    }
  }

  return (
    <SafeAreaView>
      <ThemeProvider theme={GlobalTheme}>
        <Avatar
          source={
            !animal.photoURI
              ? require('../../../assets/dog-and-cat.png')
              : {uri: animal.photoURI}
          }
          onPress={() =>
            imagePicker(response => imagePickerCallback(response.uri))
          }
        />
        <Button
          title="SELECIONAR FOTO"
          onPress={() =>
            imagePicker(response => imagePickerCallback(response.uri))
          }
        />
        <Button
          title="APAGAR FOTO"
          onPress={() => setAnimal({...animal, photoURI: null})}
          disabled={!animal.photoURI}
        />
        <Button
          title="PRÓXIMO"
          onPress={() => {
            navigation.navigate('GeneralInfoScreen', {animal});
          }}
          disabled={!animal.photoURI}
        />
      </ThemeProvider>
    </SafeAreaView>
  );
}

// <UploadImageButton navigation={navigation} animal={animal} title={"ENVIAR IMAGEM"} disabled={!animal.photoURI} />
