import React from 'react';
import globalTheme from '../theme/globalTheme';
import {ThemeProvider, Button, Avatar} from 'react-native-elements';
import {SafeAreaView} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import UploadImageButton from '../components/buttons/UploadImageButton';

export default function RegisterAnimalImageSelectScreen({route, navigation}) {
  const defaultImage = require('../assets/dog-and-cat.png');
  const {animal} = route.params;

  console.log('IMAGE SELECT navigation → ', navigation);
  console.log('route → ', route);

  console.log('Image uri → ' + animal.image.uri);
  function imagePicker() {
    const options = {
      noDate: true,
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        navigation.setParams((animal.image.uri = response.uri));
      }
    });
  }

  return (
    <ThemeProvider theme={globalTheme}>
      <SafeAreaView style={globalTheme.container}>
        <Avatar
          rounded
          source={!animal.image.uri ? defaultImage : {uri: animal.image.uri}}
          onPress={imagePicker}
        />
        <Button title="SELECIONAR FOTO" onPress={imagePicker} />
        <Button
          title="APAGAR FOTO"
          onPress={() => {
            navigation.setParams((animal.image.uri = null));
          }}
        />
        <UploadImageButton route={route} navigation={navigation} />
      </SafeAreaView>
    </ThemeProvider>
  );
}
