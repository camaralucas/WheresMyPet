import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ThemeProvider, Button, Icon} from 'react-native-elements';
import GlobalTheme from '../../../styles/GlobalTheme';
import animalSchema from '../../../backend/schemas/animalSchema';
import Authenticator from '../../../backend/auth/Authenticator';

export default function SelectSpecieScreen({route, navigation}) {
  const [animal, setAnimal] = useState({
    ...animalSchema,
  });

  useEffect(() => {
    initiate();
  }, []);

  async function initiate() {
    const {username} = await Authenticator().GetUserSub();
    setAnimal({...animal, animalUserId: username});
  }

  return (
    <ThemeProvider theme={GlobalTheme}>
      <View style={{...GlobalTheme.container, justifyContent: 'space-between'}}>
        <Icon
          type="font-awesome-5"
          name="cat"
          size={200}
          onPress={() => setAnimal({...animal, specie: 'cat'})}
          containerStyle={
            animal.specie == 'cat'
              ? {
                  ...GlobalTheme.Icon.containerStyle,
                  ...borderRadiusStyle,
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
                  ...borderRadiusStyle,
                }
              : {
                  ...GlobalTheme.Icon.containerStyle,
                  opacity: 0.5,
                }
          }
        />
        <Button
          title={'PRÓXIMO'}
          onPress={() => {
            navigation.navigate('ImageSelectScreen', {animal});
          }}
          disabled={!animal.specie}
        />
      </View>
    </ThemeProvider>
  );
}

const borderRadiusStyle = {
  width: '100%',
  borderWidth: 2,
  borderRadius: 20,
  borderColor: '#000000',
};
