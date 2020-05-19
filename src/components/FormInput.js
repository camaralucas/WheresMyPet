import React from 'react';
import GlobalTheme from '../theme/GlobalTheme';
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
}) {
  return (
    <View>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {header && <Text style={GlobalTheme.headerText}>{header}</Text>}
      </View>
      <Text style={GlobalTheme.text}>{title} </Text>
      <TextInput
        multiline={true}
        style={GlobalTheme.input}
        placeholder="Digite aqui..."
        onChangeText={onChangeText}
        value={value}
      />
      {touched && errorMessage && (
        <Text style={GlobalTheme.errorText}>{errorMessage}</Text>
      )}
      {divider && <Divider style={GlobalTheme.divider} />}
    </View>
  );
}
