import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import GlobalTheme from '../../../styles/GlobalTheme';
import {ThemeProvider, Button, Avatar} from 'react-native-elements';
import PickerImage from '../../../backend/image-handlers/PickerImage';

export default function ImageSelectScreen({route, navigation}) {
  const [animal, setAnimal] = useState(route.params.animal);
  const [image, setImage] = useState();
  const defaultImage = require('../../../assets/dog-and-cat.png');

  function PickerImageCallback(uri) {
    if (uri) {
      setImage(uri);
    } else {
      Alert.alert('', 'Foto não selecionada');
    }
  }

  return (
    <View style={GlobalTheme.container}>
      <ThemeProvider theme={GlobalTheme}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Avatar
            source={!image ? defaultImage : {uri: image}}
            onPress={() =>
              PickerImage(response => PickerImageCallback(response.uri))
            }
            rounded
            containerStyle={{
              width: '100%',
              height: '80%',
              borderWidth: 1,
              borderColor: '#000000',
            }}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button
            title="SELECIONAR FOTO"
            onPress={() =>
              PickerImage(response => PickerImageCallback(response.uri))
            }
          />
          <Button
            title="APAGAR FOTO"
            onPress={() => setAnimal({...animal, photo: null})}
            disabled={!image}
          />
        </View>
        <Button
          title="PRÓXIMO"
          onPress={() => {
            navigation.navigate('GeneralInfoScreen', {
              animal: animal,
              image: image,
            });
          }}
          disabled={!image}
        />
      </ThemeProvider>
    </View>
  );
}
