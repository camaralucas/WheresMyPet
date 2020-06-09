import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ThemeProvider, Button, Icon} from 'react-native-elements';
import GlobalTheme from '../../../styles/GlobalTheme';
import animalSchema from '../../../backend/schemas/animalSchema';

export default function SelectSpecieScreen({route, navigation}) {
  const [animal, setAnimal] = useState({
    ...animalSchema,
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
