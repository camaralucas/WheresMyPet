import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import GlobalTheme from '../styles/GlobalTheme';

export default function HomeScreen({route, navigation}) {
  return (
    <SafeAreaView>
      <View style={{...GlobalTheme.container, alignItems: 'center'}}>
        <Text>Home screen</Text>
      </View>
    </SafeAreaView>
  );
}
