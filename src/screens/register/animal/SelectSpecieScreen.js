import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ThemeProvider, Button, Icon} from 'react-native-elements';
import GlobalTheme from '../../../styles/GlobalTheme';

export default function SelectSpecieScreen({route, navigation}) {
  const [animal, setAnimal] = useState({
    address: {
      cep: null,
      street: null,
      neighborhood: null,
      city: null,
      state: null,
    },
    breed: null,
    eye_left: '#ffffff',
    eye_right: null,
    name: 'Fininho',
    number: '172614',
    observation: 'Possui um olho de cada cor',
    photoKey: null,
    photoURL: null,
    photoURI: null,
    primary_fur: '#ffffff',
    secundary_fur: null,
    specie: null,
    status: 1,
    text: 'Gato #1',
  });

  useEffect(() => {
    if (route.params?.animal) {
      setAnimal(route.params.animal);
    }
  }, [route.params?.animal]);

  return (
    <ThemeProvider theme={GlobalTheme}>
      <View style={GlobalTheme.container}>
        <Icon
          type="font-awesome-5"
          name="cat"
          size={200}
          onPress={() => setAnimal({...animal, specie: 'cat'})}
          containerStyle={
            animal.specie == 'cat'
              ? {
                  ...GlobalTheme.Icon.containerStyle,
                  borderWidth: 2,
                  borderRadius: 20,
                  borderColor: '#000000',
                }
              : {
                  ...GlobalTheme.Icon.containerStyle,
                  opacity: 0.5,
                }
          }
        />
        <Icon
          type="font-awesome-5"
          name="dog"
          size={200}
          onPress={() => setAnimal({...animal, specie: 'dog'})}
          containerStyle={
            animal.specie == 'dog'
              ? {
                  ...GlobalTheme.Icon.containerStyle,
                  borderWidth: 2,
                  borderRadius: 20,
                  borderColor: '#000000',
                }
              : {
                  ...GlobalTheme.Icon.containerStyle,
                  opacity: 0.5,
                }
          }
        />

        <Button
          title="PRÓXIMO"
          onPress={() => {
            navigation.navigate('ImageSelectScreen', {animal});
          }}
          disabled={!animal.specie}
        />
      </View>
    </ThemeProvider>
  );
}
