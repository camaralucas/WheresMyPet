import React from 'react';
import {Picker} from '@react-native-community/picker';
import {View, Text} from 'react-native';

export default function ColorPicker({title, selectedValue, onValueChange}) {
  return (
    <View style={{marginTop: 10, marginBottom: 10}}>
      <Text style={{fontSize: 16, marginStart: 8}}>{title}</Text>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Picker
          selectedValue={selectedValue}
          style={{
            height: 50,
            width: 140,
          }}
          onValueChange={onValueChange}>
          <Picker.Item label="Selecione" value="null" />
          <Picker.Item label="Branco" value="#ffffff" />
          <Picker.Item label="Preto" value="#000000" />
          <Picker.Item label="Amarelo" value="#ffff00" />
          <Picker.Item label="Vermelho" value="#ff0000" />
          <Picker.Item label="Azul" value="#0000ff" />
          <Picker.Item label="Marrom" value="#800000" />
          <Picker.Item label="Fúcsia" value="#ff00ff" />
        </Picker>
        <View
          style={{
            width: 20,
            height: 20,
            backgroundColor:
              selectedValue == 'null' ? '#ffffff' : selectedValue,
            borderWidth: 1,
            borderColor: '#000000',
          }}
        />
      </View>
    </View>
  );
}
