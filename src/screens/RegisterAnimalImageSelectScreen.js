import React from 'react';
import globalTheme from '../theme/globalTheme';
import {Avatar} from 'react-native-elements';
import {SafeAreaView, View, Button} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import UploadImageButton from '../components/buttons/UploadImageButton';
import CustomButton from '../components/buttons/CustomButton';

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
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Avatar
          avatarStyle={globalTheme.avatar}
          rounded
          source={!animal.image.uri ? defaultImage : {uri: animal.image.uri}}
          onPress={imagePicker}
          containerStyle={globalTheme.avatar}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <CustomButton title="SELECIONAR FOTO" onPress={imagePicker} />
          <CustomButton
            title="APAGAR FOTO"
            onPress={() => navigation.setParams((animal.image.uri = null))}
          />
        </View>
      </View>
      <UploadImageButton route={route} navigation={navigation} />
    </SafeAreaView>
  );
}
