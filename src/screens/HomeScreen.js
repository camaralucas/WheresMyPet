import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, Alert} from 'react-native';
import GlobalTheme from '../styles/GlobalTheme';
import LoadingIndicator from '../components/LoadingIndicator';
import Queries from '../backend/resolvers/Queries';
import {ScrollView} from 'react-native-gesture-handler';
import {ThemeProvider} from 'react-native-elements';
import AnimalListView from '../components/AnimalListView';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AnimalMapView from './AnimalMapView';
import FilterModal from '../components/FilterModal';

export default function HomeScreen({route, navigation}) {
  const [userAttributes, setUserAttributes] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [listAnimals, setListAnimals] = useState();
  const [mapView, setMapView] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    listAnimalsHandler();
  }, []);

  async function listAnimalsHandler() {
    try {
      setIsLoaded(false);
      const {data} = await Queries().ListAllAnimals();
      var animals = data.listAnimals.items;
      animals.map(async animal => {
        animal.image = `https://wheresmypet53dadc1f2d8b4073a540859cb7849223192432-dev.s3.amazonaws.com/public/${
          animal.photoKey
        }`;
        setListAnimals(animals);
      });
      setListAnimals(animals);
      setIsLoaded(true);
    } catch (e) {
      Alert.alert('ERRO', 'Não foi possível obter os animais cadastrados');
    }
  }

  navigation.setOptions({
    headerRight: () => (
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}>
          <Icon
            name="filter"
            size={25}
            color="#000000"
            style={{marginEnd: 10}}
            onPress={() => setOpenFilter(true)}
          />

          <View
            style={{
              width: 1,
              height: 50,
              backgroundColor: '#000',
              margin: 5,
            }}
          />
          <Icon
            name="list-alt"
            size={25}
            color="#000000"
            style={{margin: 8, paddingTop: 5}}
            onPress={() => setMapView(false)}
          />
          <Icon
            name="map-marked-alt"
            size={25}
            color="#000000"
            style={{margin: 8}}
            onPress={() => setMapView(true)}
          />
        </View>
      </View>
    ),
  });

  return (
    <SafeAreaView>
      {isLoaded ? (
        <View style={{width: '100%'}}>
          <Text style={{...GlobalTheme.drawerHeader, textAlign: 'center'}}>
            ANIMAIS DESAPARECIDOS
          </Text>
          {isLoaded && listAnimals ? (
            <ThemeProvider theme={GlobalTheme}>
              {listAnimals.length > 0 && !mapView ? (
                <ScrollView>
                  {listAnimals.map(animal => (
                    <AnimalListView
                      key={animal.id}
                      animal={animal}
                      onClick={() => setMapView(!mapView)}
                    />
                  ))}
                </ScrollView>
              ) : (
                <AnimalMapView animals={listAnimals} />
              )}
            </ThemeProvider>
          ) : (
            <LoadingIndicator />
          )}
          <FilterModal visible={openFilter} openModal={setOpenFilter} />
        </View>
      ) : (
        <LoadingIndicator />
      )}
    </SafeAreaView>
  );
}
