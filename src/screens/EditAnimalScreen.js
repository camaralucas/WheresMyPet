import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text, Alert} from 'react-native';
import GlobalTheme from '../styles/GlobalTheme';
import LoadingIndicator from '../components/LoadingIndicator';
import {ThemeProvider, Avatar, Button, Divider} from 'react-native-elements';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import ColorView from '../components/ColorView';

export default function({route, navigation}) {
  const [isLoaded, setIsLoaded] = useState(true);
  const [animal, setAnimal] = useState(route.params.animal);

  const [region, setRegion] = useState({
    latitude: -12.0,
    longitude: -50.0,
    latitudeDelta: 0.003,
    longitudeDelta: 0.003,
  });

  useEffect(() => {
    addressHandler();
  }, [route.params]);

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

  console.log('edit animal screen → ', animal);

  return (
    <SafeAreaView>
      {isLoaded && animal ? (
        <View style={GlobalTheme.container}>
          <ThemeProvider theme={GlobalTheme}>
            <View
              style={{
                backgroundColor: '#E0E0E0',
                width: '100%',
                height: '94%',
                padding: 20,
                marginTop: 5,
                borderRadius: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Avatar
                  source={{uri: animal.image}}
                  containerStyle={{
                    width: 110,
                    height: 110,
                    borderWidth: 1,
                    borderColor: '#000000',
                  }}
                  rounded
                />
                <View
                  style={{
                    flexDirection: 'column',
                    marginStart: 10,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 14}}>Raça: </Text>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                      {animal.breed}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 14}}>Atender por: </Text>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                      {animal.name}
                    </Text>
                  </View>
                  <Text
                    style={{textAlign: 'center', marginTop: 5, fontSize: 10}}>
                    COR DA PELAGEM
                  </Text>
                  <View
                    style={{
                      width: 200,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <ColorView
                      colorValue={animal.primary_fur}
                      title={'Predominante:'}
                    />
                    {animal.secundary_fur != animal.primary_fur && (
                      <ColorView
                        colorValue={animal.secundary_fur}
                        title={'Secundária:'}
                      />
                    )}
                  </View>
                </View>
              </View>
              <Divider style={GlobalTheme.divider} />
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{fontSize: 10}}>
                  MARCAÇÕES NA COLEIRA DO ANIMAL
                </Text>
              </View>
              {animal.collarColor ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <ColorView
                    colorValue={animal.collarColor}
                    title={'Cor da coleira:'}
                  />
                  {animal.collarText && (
                    <View style={{alignItems: 'center'}}>
                      <Text>Texto presente na coleira:</Text>
                      <Text style={{fontWeight: 'bold'}}>
                        {animal.collarText}
                      </Text>
                    </View>
                  )}
                </View>
              ) : (
                <Text style={{textAlign: 'center'}}>
                  O animal não possui coleira
                </Text>
              )}
              <Divider style={GlobalTheme.divider} />
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{fontSize: 10}}>VISTO PELA ULTIMA VEZ EM</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                  {animal.address.street}, {animal.address.neighborhood},{' '}
                  {animal.address.city}
                </Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <View
                  style={{
                    width: '100%',
                    height: 120,
                    marginTop: 10,
                    marginBottom: 5,
                    borderColor: '#000000',
                    borderWidth: 1,
                  }}>
                  <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    region={region}
                    showsMyLocationButton={false}
                    showsPointsOfInterest={false}
                    showsCompass={false}
                    showsTraffic={false}
                    zoomEnabled={false}
                    zoomTapEnabled={false}
                    zoomControlEnabled={false}
                    cacheEnabled={true}>
                    <Marker
                      key={animal.address.cep}
                      coordinate={{
                        latitude: region.latitude,
                        longitude: region.longitude,
                      }}
                      title={animal.address.street}
                    />
                  </MapView>
                </View>
              </View>
              <Divider style={GlobalTheme.divider} />
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{fontSize: 10}}>OBSERVAÇÕES ADCIONAIS</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                  {animal.observation}
                </Text>
              </View>
              <Divider style={GlobalTheme.divider} />

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Button
                  title={'EDITAR INFORMAÇÕES'}
                  titleStyle={{
                    color: 'black',
                    fontSize: 12,
                    paddingStart: 0,
                    paddingEnd: 0,
                  }}
                />
                <Button
                  title={'EXCLUIR ANIMAL'}
                  titleStyle={{
                    color: 'black',
                    fontSize: 12,
                    paddingStart: 0,
                    paddingEnd: 0,
                  }}
                  buttonStyle={{
                    backgroundColor: '#ff3333',
                  }}
                />
              </View>
              <Button
                title={'ENCONTROU ESSE ANIMAL? CLIQUE AQUI!'}
                titleStyle={{
                  color: 'black',
                  fontSize: 12,
                  paddingStart: 0,
                  paddingEnd: 0,
                  paddingTop: 0,
                }}
                buttonStyle={{
                  backgroundColor: '#66ff66',
                }}
              />
            </View>
          </ThemeProvider>
        </View>
      ) : (
        <LoadingIndicator />
      )}
    </SafeAreaView>
  );
}
