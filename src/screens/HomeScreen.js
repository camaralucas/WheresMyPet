import React from 'react';
import {SafeAreaView} from 'react-native';
import {ThemeProvider, Text, Button} from 'react-native-elements';
import GlobalTheme from '../theme/GlobalTheme';

export default function HomeScreen({route, navigation}) {
  return (
    <ThemeProvider theme={GlobalTheme}>
      <SafeAreaView style={GlobalTheme.container}>
        <Text> Home screen </Text>
      </SafeAreaView>
    </ThemeProvider>
  );
}
