import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Alert,
  Text,
} from 'react-native';
import {ThemeProvider, Button} from 'react-native-elements';
import GlobalTheme from '../../styles/GlobalTheme';
import {Formik} from 'formik';
import FormInput from '../../components/FormInput';
import LoadingIndicator from '../../components/LoadingIndicator';
//Schemas
import addressSchema from '../../backend/schemas/addressSchema';
import RegisterAddressFormSchema from '../../backend/form-validation-schemas/RegisterAddressFormSchema';
// Backend
import Axios from '../../backend/Axios';
import Authenticator from '../../backend/auth/Authenticator';
import Mutations from '../../backend/resolvers/Mutations';
// Google map
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Polygon,
  Circle,
} from 'react-native-maps';

export default function AddressScreen({route, navigation}) {
  const [isLoaded, setIsLoaded] = useState(true);
  const [animal, setAnimal] = useState(route.params.animal);
  const [address, setAddress] = useState({...addressSchema});

  const [region, setRegion] = useState({
    latitude: -12.0,
    longitude: -50.0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  async function handleSubmitCep(value) {
    setIsLoaded(false);
    const cep = value.replace(/\D/g, '');

    try {
      const responseCep = await Axios().SearchCep(cep);
      const responseGeocoding = await Axios().GetGeocoding(cep);
      const responseUserAttb = await Authenticator().GetUserAttributes();

      if (responseCep && responseGeocoding && responseUserAttb) {
        setAddress({
          cep: responseCep.data.cep,
          city: responseCep.data.localidade,
          latitude: responseGeocoding.data.results[0].geometry.location.lat,
          longitude: responseGeocoding.data.results[0].geometry.location.lng,
          neighborhood: responseCep.data.bairro,
          street: responseCep.data.logradouro,
          state: responseCep.data.uf,
          addressUserId: responseUserAttb.attributes.sub,
        });
        setRegion({
          ...region,
          latitude: responseGeocoding.data.results[0].geometry.location.lat,
          longitude: responseGeocoding.data.results[0].geometry.location.lng,
        });
      }
    } catch (error) {
      Alert.alert('Erro ao buscar cep!');
    }
    setIsLoaded(true);
  }

  async function createAddress() {
    setIsLoaded(false);
    try {
      const response = await Mutations().CreateUserAddress(address);
      setAnimal((animal.animalAddressId = response.data.createAddress.id));
      route.params.initialize();
      navigation.goBack();
      Alert.alert('Endereço cadastrado com sucesso!');
    } catch (e) {
      Alert.alert('Não foi possivel cadastrar o endereço!');
    }
    setIsLoaded(true);
  }

  return (
    <Formik
      initialValues={address}
      validationSchema={RegisterAddressFormSchema()}
      enableReinitialize={true}
      onSubmit={values => {
        createAddress();
      }}>
      {({values, handleChange, handleSubmit, errors, touched}) => (
        <SafeAreaView>
          <ThemeProvider theme={GlobalTheme}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView>
                {isLoaded ? (
                  <View style={GlobalTheme.container}>
                    <FormInput
                      title={
                        'Digite o CEP do ultimo endereço que o animal foi visto:'
                      }
                      onChangeText={handleChange('cep')}
                      value={values.cep}
                      errorMessage={errors.cep}
                      touched={touched.cep}
                      divider={false}
                    />
                    <Button
                      title="BUSCAR CEP"
                      onPress={() => {
                        handleSubmitCep(values.cep);
                      }}
                      disabled={!values.cep}
                    />
                    {address.cep && (
                      <View>
                        <View
                          style={{
                            alignContent: 'center',
                            width: '100%',
                            height: 100,
                            borderRadius: 10,
                            backgroundColor: '#BFBFBF',
                            marginTop: 30,
                            marginBottom: 30,
                          }}>
                          <View
                            style={{
                              flexDirection: 'column',
                              marginStart: 20,
                              marginTop: 10,
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                              }}>
                              <Text style={{fontWeight: 'bold'}}>Rua:</Text>
                              <Text style={{marginStart: 5}}>
                                {address.street}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                              }}>
                              <Text style={{fontWeight: 'bold'}}>Bairro:</Text>
                              <Text style={{marginStart: 5}}>
                                {address.neighborhood}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                              }}>
                              <Text style={{fontWeight: 'bold'}}>Cidade:</Text>
                              <Text style={{marginStart: 5}}>
                                {address.city}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                              }}>
                              <Text style={{fontWeight: 'bold'}}>Estado:</Text>
                              <Text style={{marginStart: 5}}>
                                {address.state}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View
                          style={{
                            width: '100%',
                            height: 200,
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
                            region={region}>
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
                    )}

                    {address.cep && (
                      <Button
                        title="CADASTRAR ENDEREÇO"
                        onPress={handleSubmit}
                        disabled={!address.cep}
                      />
                    )}
                  </View>
                ) : (
                  <LoadingIndicator />
                )}
              </ScrollView>
            </TouchableWithoutFeedback>
          </ThemeProvider>
        </SafeAreaView>
      )}
    </Formik>
  );
}
