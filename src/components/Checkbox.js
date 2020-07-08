import React from 'react';
import {CheckBox, ThemeProvider} from 'react-native-elements';

export default function Checkbox({title, checked, onPress}) {
  return (
    <ThemeProvider>
      <CheckBox title={title} checked={checked} onPress={onPress} />
    </ThemeProvider>
  );
}
