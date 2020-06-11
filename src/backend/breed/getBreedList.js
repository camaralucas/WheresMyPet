import React from 'react';
import axios from 'axios';
import {Picker} from '@react-native-community/picker';

import {View, Text} from 'react-native';
import GlobalTheme from '../styles/GlobalTheme';

export default function getBreedList({selectedValue, onValueChange}) {
  useEffect(() => {
    getBreeds();
  }, []);

  async function getBreeds() {
    const breeds = axios.get(`https://dog.ceo/api/breeds/list/all`);
  }

  return (
    <View>
      <Text style={GlobalTheme.headerText}>Lista de raças</Text>
      <View>
        <Picker
          selectedValue={selectedValue}
          style={{height: 50, width: '100%'}}
          onValueChange={onValueChange}>
          <Picker.Item label={'Selecione'} value={'null'} />
          {breeds && breeds.length > 0 ? (
            breeds.map(breed => (
              <Picker.Item key={breed} label={breed} value={breed} />
            ))
          ) : (
            <Picker.Item label={'Você não possui endereços cadastrados'} />
          )}
        </Picker>
      </View>
    </View>
  );
}
