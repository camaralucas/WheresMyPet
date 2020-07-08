import React from 'react';
import {View, Text, Modal, Alert} from 'react-native';
import GlobalTheme from '../styles/GlobalTheme';
import {Icon, ThemeProvider, Button, Avatar} from 'react-native-elements';

export default function BreedModal({
  navigation,
  route,
  visible,
  label,
  openModal,
  animal,
  image,
}) {
  async function updateAnimalBreedHandler() {
    try {
      openModal(false);
      navigation.navigate('AbstractScreen', {
        animal: {...animal, breed: label.name},
        image: image,
      });

      console.log(' label modal → ', label);
    } catch (e) {
      Alert.alert('Não foi possível atualizar a raça do animal!');
    }
  }

  return (
    <Modal transparent={true} visible={visible}>
      <ThemeProvider theme={GlobalTheme}>
        <View style={{backgroundColor: '#000000aa', flex: 1}}>
          <View
            style={{
              backgroundColor: '#ffffff',
              marginTop: 50,
              marginBottom: 50,
              marginEnd: 20,
              marginStart: 20,
              paddingTop: 20,
              paddingLeft: 40,
              paddingRight: 40,
              paddingBottom: 40,
              borderRadius: 10,
              flex: 1,
            }}>
            <Icon
              type="font-awesome-5"
              name="window-close"
              size={30}
              onPress={() => openModal(false)}
              containerStyle={{alignItems: 'flex-end'}}
            />
            <Text>{label.confidence}% de certeza de que é um</Text>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 30, marginBottom: 10}}>{label.name}</Text>
              <Avatar
                source={{uri: image}}
                rounded
                containerStyle={{
                  width: '100%',
                  height: '70%',
                  borderWidth: 1,
                  borderColor: '#000000',
                  marginBottom: 10,
                }}
              />
              <Button
                title="CONFIRMAR RAÇA"
                onPress={() => {
                  updateAnimalBreedHandler();
                }}
              />
            </View>
          </View>
        </View>
      </ThemeProvider>
    </Modal>
  );
}
