import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, Alert} from 'react-native';
import GlobalTheme from '../styles/GlobalTheme';
import LoadingIndicator from '../components/LoadingIndicator';
import Queries from '../backend/resolvers/Queries';
import {ScrollView} from 'react-native-gesture-handler';
import {Avatar, ThemeProvider, Button} from 'react-native-elements';

export default function HomeScreen({route, navigation}) {
  const [userAttributes, setUserAttributes] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [listAnimals, setListAnimals] = useState(true);

  useEffect(() => {
    listAnimalsHandler();
  }, []);

  // var filter = {
  //   breed: breed,
  //   collarColor: collarColor,
  //   collarText: collarText,
  //   heterocromia: 1,
  //   primary_fur: primary_fur,
  //   secundary_fur: secundary_fur,
  //   specie: specie,
  //   status: 1,
  // };

  async function listAnimalsHandler() {
    try {
      setIsLoaded(false);
      const {data} = await Queries().ListAllAnimals();
      var animals = data.listAnimals.items;
      animals.map(async animal => {
        animal.image = `https://wheresmypet9f856ad94eb34c7da8e58ad95eeacc37192432-dev.s3.amazonaws.com/public/${
          animal.photoKey
        }`;
        setListAnimals(animals);
      });
      setListAnimals(animals);
      setIsLoaded(true);
    } catch (e) {
      console.log('error → ', e);
      Alert.alert('ERRO', 'Não foi possível obter os animais cadastrados');
    }
  }

  return (
    <SafeAreaView>
      {isLoaded ? (
        <View style={{width: '100%'}}>
          <Text style={{...GlobalTheme.drawerHeader, textAlign: 'center'}}>
            ANIMAIS DESAPARECIDOS
          </Text>
          {isLoaded && listAnimals ? (
            <ScrollView>
              <ThemeProvider theme={GlobalTheme}>
                {listAnimals.length > 0 ? (
                  listAnimals.map(animal => (
                    <View
                      key={animal.id}
                      style={{
                        width: '97%',
                        height: 160,
                        backgroundColor: '#E0E0E0',
                        margin: 5,
                        padding: 5,
                        borderWidth: 1,
                        borderColor: '#000',
                        borderRadius: 2,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Avatar
                        source={{uri: animal.image}}
                        rounded
                        containerStyle={{
                          width: 140,
                          height: 140,
                          borderWidth: 1,
                          borderColor: '#000000',
                          margin: 5,
                        }}
                      />
                      <View
                        style={{
                          width: '100%',
                          height: '100%',
                          marginTop: 10,
                          marginStart: 5,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text style={{fontSize: 14}}>Raça: </Text>
                          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                            {animal.breed}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Text style={{fontSize: 14}}>Atender por: </Text>
                          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                            {animal.name}
                          </Text>
                        </View>

                        <Text>Visto pela ultima vez em: </Text>

                        <View
                          style={{
                            flexDirection: 'row',
                          }}>
                          <Text
                            style={{
                              width: 250,
                              fontSize: 14,
                              fontWeight: 'bold',
                            }}>
                            {animal.address.street},
                            {animal.address.neighborhood}, {animal.address.city}
                          </Text>
                        </View>
                        <Button
                          title={'MAIS INFORMAÇÕES'}
                          containerStyle={{
                            width: 200,
                            height: 200,
                            marginStart: 20,
                          }}
                          titleStyle={{
                            color: 'black',
                            fontSize: 12,
                            paddingStart: 0,
                            paddingEnd: 0,
                          }}
                        />
                      </View>
                    </View>
                  ))
                ) : (
                  <Text style={{marginStart: 20}}>
                    Não foi possível encontrar animais com os filtros aplicados
                  </Text>
                )}
              </ThemeProvider>
            </ScrollView>
          ) : (
            <LoadingIndicator />
          )}
        </View>
      ) : (
        <LoadingIndicator />
      )}
    </SafeAreaView>
  );
}
