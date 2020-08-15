import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, Alert, Platform, View} from 'react-native';
import {Image} from 'react-native-elements';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';
import MarkerView from '../components/MarkerView';

export default function AnimalMapView({route, navigation, animals}) {
  const [listAnimals, setListAnimals] = useState(animals);

  const [region, setRegion] = useState({
    latitude: -12.0,
    longitude: -50.0,
    latitudeDelta: 20,
    longitudeDelta: 20,
  });

  useEffect(() => {
    requestLocationPermission();
  }, []);

  async function addressHandler(address) {
    try {
      setRegion({
        ...region,
        latitude: parseFloat(route.params.animal.address.latitude),
        longitude: parseFloat(route.params.animal.address.longitude),
      });
    } catch (e) {
      return Alert.alert('ERRO', 'Não foi possível obter dados do endereço');
    }
  }

  function showWelcomeMessage() {
    Alert.alert('Welcome to san francisco', 'The food is amazing', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Ok'},
    ]);
  }

  async function requestLocationPermission() {
    const response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (response === 'granted') {
      locateCurrentPosition();
    }
  }

  function locateCurrentPosition() {
    Geolocation.getCurrentPosition(
      position => {
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.025,
        });
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},
    );
  }

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      ref={map => (_map = map)}
      showsUserLocation={true}
      style={{height: '100%', width: '100%'}}
      initialRegion={region}
      region={region}
      showsMyLocationButton={true}>
      {listAnimals.map(animal => (
        <MarkerView key={animal.id} animal={animal} />
      ))}
    </MapView>
  );
}

{
  /* <Circle
center={{latitude: region.latitude, longitude: region.longitude}}
radius={1000}
fillColor={'rgba(100, 200, 200, 0.3)'}
strokeWidth={1}
/> */
}

{
  /* <Polygon
coordinates={coordinates}
fillColor={'rgba(100, 200, 200, 0.3)'}
strokeWidth={1}
/> */
}

// {coordinates.map(marker => (
//   <Marker
//     key={marker.name}
//     coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
//     title={marker.name}>
//     <Image
//       source={require('../assets/dog-and-cat.png')}
//       style={{
//         height: 50,
//         width: 50,
//         borderRadius: 40,
//         borderColor: '#000000',
//         borderWidth: 1,
//       }}
//     />
//     <Callout onPress={showWelcomeMessage}>
//       <Text>{marker.name}</Text>
//     </Callout>
//   </Marker>
// ))}

{
  /* <Marker
        draggable
        coordinate={{latitude: -22.898901, longitude: -47.075086}}
        title={'San Francisco'}>
        <Callout onPress={showWelcomeMessage}>
          <Text> An Intersting city</Text>
        </Callout>
      </Marker> */
}
