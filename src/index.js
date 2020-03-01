import React, {Component} from 'react';
import AppNavigator from './navigator';

// Amplify
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
import {withAuthenticator} from 'aws-amplify-react-native';
import amplifySignUpConfig from './config/amplify/SignUp';
import amplifyCustomTheme from './styles/amplify';

Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
});

class App extends Component {
  render() {
    return <AppNavigator />;
  }
}

export default withAuthenticator(App, { 
  includeGreetings: false,
  signUpConfig: amplifySignUpConfig,
}, 
  undefined, // placeholder for authenticatorComponents
  undefined, // placeholder for federated
  amplifyCustomTheme,
)
