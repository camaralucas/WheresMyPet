import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import GlobalTheme from '../styles/GlobalTheme';
import LoadingIndicator from '../components/LoadingIndicator';

export default function({route, navigation}) {
  //const [animal, setAnimal] = useState(route.params.animal);
  const [isLoaded, setIsLoaded] = useState(false);

  //console.log('animal → ', animal);

  useEffect(() => {
    async function load() {
      setTimeout(() => {
        setIsLoaded(true);
      }, 3000);
    }
    load();
  }, []);

  return (
    <SafeAreaView>
      {isLoaded ? (
        <View style={GlobalTheme.container}>
          <Text>Bem vindo</Text>
        </View>
      ) : (
        <LoadingIndicator />
      )}
    </SafeAreaView>
  );
}
