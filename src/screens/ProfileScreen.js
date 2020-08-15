import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import GlobalTheme from '../styles/GlobalTheme';
import LoadingIndicator from '../components/LoadingIndicator';
import Authenticator from '../backend/auth/Authenticator';
import {Button, ThemeProvider, Divider} from 'react-native-elements';

export default function({route, navigation}) {
  //const [animal, setAnimal] = useState(route.params.animal);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userAttributes, setUserAttributes] = useState();

  console.log(' userAttb → ', userAttributes);

  useEffect(() => {
    load();
    setIsLoaded(true);
  }, []);

  async function load() {
    const {attributes} = await Authenticator().GetUserSub();
    setUserAttributes(attributes);
  }

  return (
    <SafeAreaView>
      {isLoaded && userAttributes ? (
        <ThemeProvider theme={GlobalTheme}>
          <View style={GlobalTheme.container}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 10,
              }}>
              DADOS DO USUÁRIO
            </Text>
            <Text style={{fontSize: 15, fontWeight: 'bold', marginTop: 20}}>
              E-mail:
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#000',
                padding: 10,
              }}>
              <Text>{userAttributes.email}</Text>
            </View>
            <Text style={{fontSize: 15, fontWeight: 'bold', marginTop: 20}}>
              Nome:
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#000',
                padding: 10,
              }}>
              <Text>{userAttributes.given_name}</Text>
            </View>
            <Text style={{fontSize: 15, fontWeight: 'bold', marginTop: 20}}>
              Sobrenome:
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#000',
                padding: 10,
              }}>
              <Text>{userAttributes.family_name}</Text>
            </View>

            <Text style={{fontSize: 15, fontWeight: 'bold', marginTop: 20}}>
              Telefone:
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#000',
                padding: 10,
                marginBottom: 20,
              }}>
              <Text>{userAttributes.phone_number}</Text>
            </View>

            <Button title={'SALVAR ALTERAÇÕES'} disabled={true} />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Button title={'ALTERAR SENHA'} />
              <Button
                title={'EXCLUIR CONTA'}
                buttonStyle={{
                  backgroundColor: '#ff3333',
                }}
              />
            </View>
            <Divider style={GlobalTheme.divider} />
            <Button title={'GERENCIAR ENDEREÇOS'} />
          </View>
        </ThemeProvider>
      ) : (
        <LoadingIndicator />
      )}
    </SafeAreaView>
  );
}
