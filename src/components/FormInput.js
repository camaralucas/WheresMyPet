import React from 'react';
import globalTheme from '../theme/globalTheme';
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
        {header && <Text style={globalTheme.headerText}>{header}</Text>}
      </View>
      <Text style={globalTheme.text}>{title} </Text>
      <TextInput
        multiline={true}
        style={globalTheme.input}
        placeholder="Digite aqui..."
        onChangeText={onChangeText}
        value={value}
      />
      {touched && errorMessage && (
        <Text style={globalTheme.errorText}>{errorMessage}</Text>
      )}
      {divider && <Divider style={globalTheme.divider} />}
    </View>
  );
}
