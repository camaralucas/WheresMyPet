import React from 'react';
import {View, Picker, StyleSheet, Text} from 'react-native';
import globalTheme from '../theme/globalTheme';

export default function ColorPicker({title, selectedValue, onValueChange}) {
  return (
    <View style={styles.container}>
      <Text style={globalTheme.text}>{title}</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 10,
    justifyContent: 'space-between',
  },
});
