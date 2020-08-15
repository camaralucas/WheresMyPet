import React, {useState, useEffect} from 'react';
import {View, Alert, Text} from 'react-native';
import GlobalTheme from '../../styles/GlobalTheme';
import IdentifyLabels from '../../backend/rekognition/IdentifyLabels';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import LoadingIndicator from '../../components/LoadingIndicator';
import {ThemeProvider, Avatar, Button} from 'react-native-elements';
import BreedModal from '../../components/BreedModal';

export default function BreedScreen({route, navigation}) {
  const defaultImage = require('../../assets/dog-and-cat.png');
  const [isLoaded, setIsLoaded] = useState(true);
  const [animal, setAnimal] = useState(route.params.animal);
  const [openModal, setOpenModal] = useState(false);
  const [label, setLabel] = useState({});
  const image = route.params.image;

  console.log('label → ', label);
  console.log('animal → ', animal);

  async function labelsHandler() {
    setIsLoaded(false);
    try {
      const label = await IdentifyLabels(animal.photoKey);
      if (label.name) {
        setLabel(label);
        setOpenModal(true);
      } else {
        throw e;
      }
    } catch {
      Alert.alert(
        'Não encontramos uma raça compatível',
        'Nosso sistema não encontrou compatibilidade da imagem com nenhuma raça existente, por favor, selecione uma raça clicando no botão "ABRIR LISTA DE RAÇAS"',
      );
    }
    setIsLoaded(true);
  }

  return (
    <View style={GlobalTheme.container}>
      <ThemeProvider theme={GlobalTheme}>
        {isLoaded ? (
          <View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 30}}>
                  {animal.breed != 'undefined'
                    ? animal.breed
                    : 'Raça não definida'}
                </Text>
              </View>
              <Avatar
                source={image ? {uri: image} : defaultImage}
                rounded
                containerStyle={{
                  width: '100%',
                  borderWidth: 1,
                  borderColor: '#000000',
                  marginBottom: 10,
                }}
              />
            </View>

            {animal.specie == 'dog' && (
              <Button
                title={'IDENTIFICAR RAÇA AUTOMATICAMENTE'}
                onPress={() => {
                  labelsHandler();
                }}
              />
            )}
            <Button
              title="ABRIR LISTA DE RAÇAS"
              onPress={() => {
                labelsHandler();
              }}
            />
          </View>
        ) : (
          <LoadingIndicator />
        )}
        <BreedModal
          visible={openModal}
          label={label}
          openModal={setOpenModal}
          animal={animal}
          image={image}
          navigation={navigation}
          route={route}
        />
      </ThemeProvider>
    </View>
  );
}
