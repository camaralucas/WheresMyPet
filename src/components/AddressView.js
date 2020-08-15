import React from 'react';
import {View, Text} from 'react-native';

export default function AddressView({title, value}) {
  return (
    <View
      style={{
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 25,
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Text style={{fontWeight: 'bold'}}>{title}</Text>
        <Text
          style={{
            marginStart: 5,
            backgroundColor: '#BFBFBF',
            paddingStart: 5,
            paddingEnd: 5,
            borderRadius: 5,
          }}>
          {value}
        </Text>
      </View>
    </View>
  );
}
