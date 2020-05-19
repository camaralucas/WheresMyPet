import React, {useEffect, useState} from 'react';
import {ThemeProvider, Button, Icon} from 'react-native-elements';
import GlobalTheme from '../../../theme/GlobalTheme';

export default function SelectSpecieScreen({route, navigation}) {
  const [animal, setAnimal] = useState({
    address: 'Rua Rodrigo Otávio, 214',
    breed: undefined,
    eye_left: '#ffffff',
    eye_right: null,
    name: 'Fininho',
    number: '172614',
    observation: undefined,
    photoKey: undefined,
    photoURL: undefined,
    photoURI: undefined,
    primary_fur: '#ffffff',
    secundary_fur: null,
    specie: undefined,
    status: 1,
    text: 'Gato #1',
    user: 'UID',
  });

  useEffect(() => {
    if (route.params?.animal) {
      setAnimal(route.params.animal);
    }
  }, [route.params?.animal]);

  return (
    <ThemeProvider theme={GlobalTheme}>
      <Icon
        type="font-awesome-5"
        name="cat"
        size={200}
        onPress={() => setAnimal({...animal, specie: 'cat'})}
      />
      <Icon
        type="font-awesome-5"
        name="dog"
        size={200}
        onPress={() => setAnimal({...animal, specie: 'dog'})}
      />

      <Button
        title="PRÓXIMO"
        onPress={() => {
          navigation.navigate('ImageSelectScreen', {animal});
        }}
        disabled={!animal.specie}
      />
    </ThemeProvider>
  );
}
