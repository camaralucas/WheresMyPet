import 'react-native-gesture-handler';
import React, {Component} from 'react';

// Dependencies
//import 'react-native-gesture-handler';
import AppNavigator from './navigator';
import {createAppContainer} from 'react-navigation';

// Amplify
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
import {withAuthenticator} from 'aws-amplify-react-native';
import SignUpConfig from './config/amplify/SignUp';
//import amplifyCustomTheme from './styles/amplify/authenticator';

Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
});

const AppContainer = createAppContainer(AppNavigator);

// App
class App extends Component {
  render() {
    return <AppContainer />;
  }
}

export default withAuthenticator(App, {
  includeGreetings: true,
  signUpConfig: SignUpConfig,
  // theme: amplifyCustomTheme,
});
