import React from 'react';
import {View, Button} from 'react-native';
import globalTheme from '../../theme/globalTheme';

export default function CustomButton({
  title,
  onPress,
  color = '#ffad33',
  disable = false,
}) {
  return (
    <View style={globalTheme.buttonContainerStyle}>
      <Button title={title} onPress={onPress} color={color} disable={disable} />
    </View>
  );
}
