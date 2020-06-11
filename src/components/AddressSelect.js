import React from 'react';
import {Picker} from '@react-native-community/picker';

import {View, Text} from 'react-native';
import GlobalTheme from '../styles/GlobalTheme';

export default function AddressSelect({
  title,
  addresses,
  selectedValue,
  onValueChange,
}) {
  return (
    <View>
      <Text style={GlobalTheme.headerText}>{title}</Text>
      <View>
        <Picker
          selectedValue={selectedValue}
          style={{height: 50, width: '100%'}}
          onValueChange={onValueChange}>
          <Picker.Item label={'Selecione'} value={'null'} />
          {addresses && addresses.length > 0 ? (
            addresses.map(address => (
              <Picker.Item
                key={address.id}
                label={`${address.street}, ${address.neighborhood}, ${
                  address.city
                }`}
                value={address.id}
              />
            ))
          ) : (
            <Picker.Item label={'Você não possui endereços cadastrados'} />
          )}
        </Picker>
      </View>
    </View>
  );
}
