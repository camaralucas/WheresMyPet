import React, {Component} from 'react';
import AppNavigator from './navigator';

// AMPLIFY
import {withAuthenticator} from 'aws-amplify-react-native';
import amplifySignUpConfig from './config/amplify/SignUp';
import amplifyCustomTheme from './styles/amplify';

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
