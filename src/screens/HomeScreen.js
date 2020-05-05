import React from 'react';
import {SafeAreaView} from 'react-native';
import {ThemeProvider, Text, Button} from 'react-native-elements';
import globalTheme from '../theme/globalTheme';

export default function HomeScreen({route, navigation}) {
  console.log('navigation → ', navigation);
  console.log('route → ', route);

  return (
    <ThemeProvider theme={globalTheme}>
      <SafeAreaView style={globalTheme.container}>
        <Text> Home screen </Text>
      </SafeAreaView>
    </ThemeProvider>
  );
}
