import React, {useEffect, useState} from 'react';
import GlobalTheme from '../../styles/GlobalTheme';
import {View, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Avatar} from 'react-native-elements';
import LoadingIndicator from '../LoadingIndicator';

export default function AnimalDrawerView({route, navigation, animals}) {
  const [isLoaded, setIsLoaded] = useState(true);
  const [userAnimals, setUserAnimals] = useState();

  useEffect(() => {
    setUserAnimals(animals);
  }, [animals]);

  return (
    <View style={{width: '100%'}}>
      <Text style={GlobalTheme.drawerHeader}>MEUS ANIMAIS</Text>
      {isLoaded && userAnimals ? (
        <ScrollView>
          {userAnimals.length > 0 ? (
            userAnimals.map(animal => (
              <View
                key={animal.id}
                style={{
                  width: '95%',
                  height: 65,
                  backgroundColor: '#E0E0E0',
                  margin: 5,
                  borderWidth: 1,
                  borderColor: '#000',
                  borderRadius: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onStartShouldSetResponder={() => {
                  navigation.navigate('EditAnimalScreen', {animal: animal});
                }}>
                <Avatar
                  source={{uri: animal.image}}
                  rounded
                  containerStyle={{
                    width: 55,
                    height: 55,
                    borderWidth: 1,
                    borderColor: '#000000',
                    margin: 5,
                  }}
                  avatarStyle={{}}
                />
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: 150,
                      margin: 5,
                    }}>
                    <Text style={{marginEnd: 10, fontWeight: 'bold'}}>
                      {animal.name}
                    </Text>
                    <View
                      style={{
                        width: 70,
                        height: 15,
                        backgroundColor: 'crimson',
                        borderRadius: 5,
                        justifyContent: 'center',
                      }}>
                      {animal.status != 0 && (
                        <Text
                          style={{
                            fontSize: 8.5,
                            textAlign: 'center',
                            color: '#FFF',
                            fontWeight: 'bold',
                          }}>
                          DESAPARECIDO
                        </Text>
                      )}
                    </View>
                  </View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: 'crimson',
                      margin: 5,
                    }}>
                    {animal.breed}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={{marginStart: 20}}>
              Você não possui animais cadastrados
            </Text>
          )}
        </ScrollView>
      ) : (
        <LoadingIndicator />
      )}
    </View>
  );
}
