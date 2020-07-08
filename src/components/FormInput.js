import React from 'react';
import GlobalTheme from '../styles/GlobalTheme';
import {View, Text, TextInput} from 'react-native';
import {Divider} from 'react-native-elements';

export default function FormInput({
  header = false,
  title,
  onChangeText,
  value,
  divider = true,
  errorMessage,
  touched,
  multiline = false,
  keyboardType = 'default',
  style = GlobalTheme.textInput,
}) {
  return (
    <View>
      {header && <Text style={GlobalTheme.headerText}>{header}</Text>}
      <Text>{title} </Text>
      <TextInput
        multiline={multiline}
        style={style}
        placeholder="Digite aqui..."
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
      />
      {touched && errorMessage && (
        <Text style={GlobalTheme.textInputError}>{errorMessage}</Text>
      )}
      {divider && <Divider style={GlobalTheme.divider} />}
    </View>
  );
}
