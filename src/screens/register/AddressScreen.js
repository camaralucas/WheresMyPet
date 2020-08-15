import React, {useState} from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Alert,
  Text,
} from 'react-native';
import {ThemeProvider, Button} from 'react-native-elements';
import {Divider} from 'react-native-elements';
import GlobalTheme from '../../styles/GlobalTheme';
import {Formik} from 'formik';
import FormInput from '../../components/FormInput';
import LoadingIndicator from '../../components/LoadingIndicator';
import AddressView from '../../components/AddressView';
//Schemas
import addressSchema from '../../backend/schemas/addressSchema';
import RegisterAddressFormSchema from '../../backend/form-validation-schemas/RegisterAddressFormSchema';
// Backend
import Axios from '../../backend/Axios';
import Authenticator from '../../backend/auth/Authenticator';
import Mutations from '../../backend/resolvers/Mutations';
// Google map
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

export default function AddressScreen({route, navigation}) {
  const [isLoaded, setIsLoaded] = useState(true);
  const [address, setAddress] = useState({...addressSchema});

  const [region, setRegion] = useState({
    latitude: -12.0,
    longitude: -50.0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  async function handleSubmitCep(value) {
    setIsLoaded(false);
    try {
      const cep = value.replace(/\D/g, '');
      const response = await Axios().SearchCep(cep);
      const {data} = await Axios().GetGeocoding(cep);
      const {username} = await Authenticator().GetUserSub();

      if (response && data && username) {
        setAddress({
          addressUserId: username,
          cep: response.data.cep,
          city: response.data.localidade,
          latitude: data.results[0].geometry.location.lat,
          longitude: data.results[0].geometry.location.lng,
          neighborhood: response.data.bairro,
          street: response.data.logradouro,
          state: response.data.uf,
        });
        setRegion({
          ...region,
          latitude: data.results[0].geometry.location.lat,
          longitude: data.results[0].geometry.location.lng,
        });
      }
    } catch (e) {
      Alert.alert('Erro ao buscar o CEP!');
    }
    setIsLoaded(true);
  }

  async function createAddressHandler() {
    setIsLoaded(false);
    try {
      const {data} = await Mutations().CreateAddress(address);
      if (data) {
        Alert.alert('Endereço cadastrado com sucesso!');
        navigation.goBack();
        route.params.initialize();
      }
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
        createAddressHandler();
      }}>
      {({values, handleChange, handleSubmit, errors, touched}) => (
        <View style={{...GlobalTheme.container, justifyContent: 'center'}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {isLoaded ? (
              <ThemeProvider theme={GlobalTheme}>
                <FormInput
                  title={
                    'Digite o CEP do ultimo endereço que o animal foi visto:'
                  }
                  onChangeText={handleChange('cep')}
                  value={values.cep}
                  errorMessage={errors.cep}
                  touched={touched.cep}
                  keyboardType={'numeric'}
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
                    <Divider style={GlobalTheme.divider} />
                    <Text style={{marginTop: 5}}>
                      Por questões de segurança, não salvamos o complemento do
                      endereço (Nº ou Apto).
                    </Text>
                    <View
                      style={{
                        alignContent: 'center',
                        height: 90,
                        borderRadius: 10,
                        marginTop: 15,
                        marginBottom: 15,
                      }}>
                      <AddressView title={'Rua:'} value={address.street} />
                      <AddressView
                        title={'Bairro:'}
                        value={address.neighborhood}
                      />
                      <AddressView title={'Cidade:'} value={address.city} />
                      <AddressView title={'Estado:'} value={address.state} />
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
                )}

                {address.cep && (
                  <Button
                    title="CADASTRAR ENDEREÇO"
                    onPress={handleSubmit}
                    disabled={!address.cep}
                  />
                )}
              </ThemeProvider>
            ) : (
              <LoadingIndicator />
            )}
          </TouchableWithoutFeedback>
        </View>
      )}
    </Formik>
  );
}
