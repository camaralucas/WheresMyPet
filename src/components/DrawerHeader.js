import React, {useEffect, useState} from 'react';
import GlobalTheme from '../styles/GlobalTheme';
import {View, Text} from 'react-native';
import Authenticator from '../backend/auth/Authenticator';
import LoadingIndicator from '../components/LoadingIndicator';

export default function DrawerHeader() {
  const [userAttributes, setUserAttributes] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      const response = await Authenticator().GetUserAttributes();
      setUserAttributes(response.attributes);
      setTimeout(() => {
        setIsLoaded(true);
      }, 3000);
    }
    load();
  }, []);

  return (
    <View style={{width: '100%'}}>
      <View style={{height: 200, backgroundColor: '#ffffff'}}>
        {isLoaded ? (
          <View>
            <Text style={GlobalTheme.drawerHeader}>
              Bem vindo, {userAttributes.given_name}{' '}
              {userAttributes.family_name}
            </Text>
          </View>
        ) : (
          <LoadingIndicator />
        )}
      </View>
      <Text style={GlobalTheme.drawerHeader}>MENU</Text>
    </View>
  );
}
