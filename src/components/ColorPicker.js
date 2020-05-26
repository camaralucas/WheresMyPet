import React from 'react';
import {View, Picker, Text} from 'react-native';
import GlobalTheme from '../styles/GlobalTheme';

export default function ColorPicker({title, selectedValue, onValueChange}) {
  return (
    <View style={GlobalTheme.container}>
      <Text style={GlobalTheme.text}>{title}</Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 20,
            height: 20,
            marginStart: 15,
            backgroundColor: selectedValue,
            borderWidth: 1,
            borderColor: '#000000',
          }}
        />
        <Picker
          selectedValue={selectedValue}
          style={{height: 50, width: 150}}
          onValueChange={onValueChange}>
          <Picker.Item label="Branco" value="#ffffff" />
          <Picker.Item label="Preto" value="#000000" />
          <Picker.Item label="Amarelo" value="#ffff00" />
          <Picker.Item label="Vermelho" value="#ff0000" />
          <Picker.Item label="Azul" value="#0000ff" />
          <Picker.Item label="Marrom" value="#800000" />
          <Picker.Item label="Fúcsia" value="#ff00ff" />
        </Picker>
      </View>
    </View>
  );
}
