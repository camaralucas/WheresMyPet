import React, {useState} from 'react';
import {View, Text} from 'react-native';

var colorTitle = '';

function renderSwitch(colorValue) {
  switch (colorValue) {
    case '#ffffff':
      colorTitle = 'Branco';
      break;
    case '#000000':
      colorTitle = 'Preto';
      break;
    case '#ffff00':
      colorTitle = 'Amarelo';
      break;
    case '#ff0000':
      colorTitle = 'Vermelho';
      break;
    case '#0000ff':
      colorTitle = 'Azul';
      break;
    case '#800000':
      colorTitle = 'Marrom';
      break;
    case '#ff00ff':
      colorTitle = 'Fúcsia';
      break;
    default:
      colorTitle = 'default';
  }
}
export default function ColorView({colorValue, title}) {
  renderSwitch(colorValue);
  return (
    <View>
      <Text>{title}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 15,
            height: 15,
            backgroundColor: colorValue,
            borderWidth: 1,
            borderColor: '#000000',
          }}
        />
        <Text style={{fontWeight: 'bold', marginStart: 5}}>{colorTitle}</Text>
      </View>
    </View>
  );
}
