import React from 'react';
import globalTheme from '../theme/globalTheme';
import {View, Text, TextInput} from 'react-native';
import {Divider, CheckBox} from 'react-native-elements';

export default function FormInput({
  header = false,
  title,
  onChangeText,
  value,
  divider = true,
  errorMessage,
  touched,
  titleCheckbox,
  onPressCheckbox,
  checkedCheckbox,
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
        {titleCheckbox && (
          <CheckBox
            title={titleCheckbox}
            checked={checkedCheckbox}
            onPress={onPressCheckbox}
          />
        )}
      </View>
      <Text style={globalTheme.text}>{title} </Text>
      <TextInput
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
