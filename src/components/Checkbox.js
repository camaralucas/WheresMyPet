import React from 'react';
import {View} from 'react-native';
import {CheckBox, Divider} from 'react-native-elements';
import globalTheme from '../theme/globalTheme';

export default function Checkbox({title, checked, onPress, divider = true}) {
  return (
    <View>
      <CheckBox title={title} checked={checked} onPress={onPress} />
      {divider && <Divider style={globalTheme.divider} />}
    </View>
  );
}
