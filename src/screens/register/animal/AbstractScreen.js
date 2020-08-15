import React, {useState, useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
import {ThemeProvider, Button, Avatar, Divider} from 'react-native-elements';
import GlobalTheme from '../../../styles/GlobalTheme';
import LoadingIndicator from '../../../components/LoadingIndicator';
import Queries from '../../../backend/resolvers/Queries';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import ColorView from '../../../components/ColorView';
import Mutations from '../../../backend/resolvers/Mutations';
import UploadPhoto from '../../../backend/image-handlers/UploadPhoto';

export default function ObservationScreen({route, navigation}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animal, setAnimal] = useState(route.params.animal);
  const image = route.params.image;
  const [address, setAddress] = useState();
  console.log('animal abstract → ', animal);

  const [region, setRegion] = useState({
    latitude: -12.0,
    longitude: -50.0,
    latitudeDelta: 0.003,
    longitudeDelta: 0.003,
  });

  useEffect(() => {
    addressHandler();
  }, []);

  async function addressHandler() {
    setIsLoaded(false);
    try {
      const {data} = await Queries().GetAddressInfo(animal.animalAddressId);
      setAddress(data.getAddress);
      setRegion({
        ...region,
        latitude: parseFloat(data.getAddress.latitude),
        longitude: parseFloat(data.getAddress.longitude),
      });
    } catch (e) {
      return Alert.alert('ERRO', 'Não foi possível obter dados do endereço');
    }
    setIsLoaded(true);
  }

  async function CreateAnimalHandler() {
    try {
      setIsLoaded(false);
      const {key} = await UploadPhoto(image, (temporary = false));
      const {animalId} = await Mutations().CreateAnimal({
        ...animal,
        photoKey: key,
      });

      if (animalId) {
        Alert.alert(
          'Animal cadastrado com sucesso!',
          'Seu animal agora está disponível clicando no menu, para editar alguma informação clique no animal.',
        );
      }

      setIsLoaded(true);

      navigation.reset({
        index: 0,
        routes: [{name: 'HomeScreen'}],
      });
    } catch (e) {
      return Alert.alert('Não foi possível cadastrar o animal!');
    }
  }

  return (
    <View style={GlobalTheme.container}>
      {isLoaded ? (
        <ThemeProvider theme={GlobalTheme}>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 14}}>
            AS INFORMAÇÕES APARECERÃO ASSIM PARA OS OUTROS USUÁRIOS
          </Text>

          <View
            style={{
              backgroundColor: '#E0E0E0',
              width: '100%',
              height: '85%',
              padding: 20,
              marginTop: 5,
              borderRadius: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Avatar
                source={{uri: image}}
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
                <Text style={{textAlign: 'center', marginTop: 5}}>
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
              <Text>MARCAÇÕES NA COLEIRA DO ANIMAL</Text>
            </View>
            {animal.collarColor ? (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
              <Text>VISTO PELA ULTIMA VEZ EM</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                {address.street}, {address.neighborhood}, {address.city}
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
                    key={address.cep}
                    coordinate={{
                      latitude: region.latitude,
                      longitude: region.longitude,
                    }}
                    title={address.street}
                  />
                </MapView>
              </View>
            </View>
            <Divider style={GlobalTheme.divider} />
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text>OBSERVAÇÕES ADCIONAIS</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                {animal.observation}
              </Text>
            </View>
          </View>

          <Button
            title="CONCLUIR CADASTRO"
            onPress={() => CreateAnimalHandler()}
          />
        </ThemeProvider>
      ) : (
        <LoadingIndicator />
      )}
    </View>
  );
}
