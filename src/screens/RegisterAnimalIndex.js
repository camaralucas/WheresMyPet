import React, {useState} from 'react';
import {ThemeProvider, Button, Divider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View} from 'react-native';
import globalTheme from '../theme/globalTheme';

export default function RegisterAnimalIndex({route, navigation}) {
  console.log('navigation → ', navigation);
  console.log('route → ', route);

  const [animal, setAnimal] = useState({
    address: null,
    breed: null,
    eye_right: null,
    eye_left: null,
    image: {uri: null, key: null, signedURL: null},
    name: null,
    number: null,
    observation: null,
    primary_fur: null,
    secundary_fur: null,
    specie: null,
    text: null,
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
          <Button
            title="PRÓXIMO >>"
            onPress={() =>
              navigation.navigate('RegisterAnimalFormScreen', {animal})
            }
          />
        )}
      </View>
    </ThemeProvider>
  );
}
