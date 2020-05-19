import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Localei18n from './config/Localei18n';
import DrawerNavigator from './navigator';
import {withAuthenticator} from 'aws-amplify-react-native';
import SignUpConfig from './config/SignUpConfig';
import amplifyTheme from './theme/amplifyTheme';
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';

Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
});

<Localei18n />; // Language

function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

export default withAuthenticator(
  App,
  {
    includeGreetings: false,
    signUpConfig: SignUpConfig,
  },
  undefined, // placeholder for authenticatorComponents
  undefined, // placeholder for federated
  amplifyTheme,
);
