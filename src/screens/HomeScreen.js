import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import GlobalTheme from '../styles/GlobalTheme';
import Authenticator from '../backend/auth/Authenticator';
import LoadingIndicator from '../components/LoadingIndicator';

export default function HomeScreen({route, navigation}) {
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
    <SafeAreaView>
      {console.log(userAttributes)}
      {isLoaded ? (
        <View style={GlobalTheme.container}>
          <Text>
            Bem vindo, {userAttributes.given_name} {userAttributes.family_name}
          </Text>
        </View>
      ) : (
        <LoadingIndicator />
      )}
    </SafeAreaView>
  );
}
