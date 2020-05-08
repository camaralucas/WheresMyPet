import React, {useState} from 'react';
import {ThemeProvider, Button, Divider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View} from 'react-native';
import globalTheme from '../theme/globalTheme';
import CustomButton from '../components/buttons/CustomButton';

export default function RegisterAnimalIndex({route, navigation}) {
  console.log('navigation → ', navigation);
  console.log('route → ', route);

  const [animal, setAnimal] = useState({
    address: 'Rua Rodrigo Otavio, 214',
    breed: 1,
    eye_right: '#ffff00',
    eye_left: '#0000ff',
    image: {uri: null, key: null, signedURL: null},
    name: 'Fininho',
    number: '172614',
    observation: 'Possui heterocromia',
    primary_fur: '#ffffff',
    secundary_fur: '#ffffff',
    specie: 'ND',
    text: 'Gato #1',
  });

  console.log('SPECIE navigation → ', navigation);
  console.log('route → ', route);

  return (
    <ThemeProvider theme={globalTheme}>
      <View style={{alignItems: 'center'}}>
        <Icon
          name="cat"
          size={200}
          onPress={() => setAnimal({...animal, specie: 1})}
        />
        <Icon
          name="dog"
          size={200}
          onPress={() => setAnimal({...animal, specie: 2})}
        />

        {animal.specie && (
          <CustomButton
            title="PRÓXIMO >>"
            onPress={() =>
              navigation.navigate('RegisterAnimalImageSelectScreen', {animal})
            }
          />
        )}
      </View>
    </ThemeProvider>
  );
}
