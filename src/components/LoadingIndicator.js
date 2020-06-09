import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import GlobalTheme from '../styles/GlobalTheme';

export default function LoadingIndicator() {
  return (
    <View style={{...GlobalTheme.container, justifyContent: 'center'}}>
      <ActivityIndicator size="large" color="#000000" />
    </View>
  );
}
