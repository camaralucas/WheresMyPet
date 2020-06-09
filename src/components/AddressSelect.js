import React from 'react';
import {Picker} from '@react-native-community/picker';

import {View, Text} from 'react-native';
import GlobalTheme from '../styles/GlobalTheme';

export default function AddressSelect({title, selectedValue, onValueChange}) {
  const addresses = [{}];
  return (
    <View>
      <Text style={GlobalTheme.headerText}>{title}</Text>
      <View>
        <Picker
          selectedValue={selectedValue}
          style={{height: 50, width: '100%'}}
          onValueChange={onValueChange}
          enabled={!addresses}>
          {!addresses ? (
            addresses.map(address => (
              <Picker.Item
                label={`${address.street},${address.city},${address.state}`}
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
