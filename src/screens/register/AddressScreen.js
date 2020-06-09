import React, {useState} from 'react';
import GlobalTheme from '../../styles/GlobalTheme';
import {
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Alert,
} from 'react-native';
import {ThemeProvider, Button} from 'react-native-elements';
import {Formik} from 'formik';
import * as yup from 'yup';
import FormInput from '../../components/FormInput';
import LoadingIndicator from '../../components/LoadingIndicator';
import Axios from '../../backend/Axios';

import addressSchema from '../../backend/schemas/addressSchema';

import {API, graphqlOperation} from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import Authenticator from '../../backend/auth/Authenticator';

export default function AddressScreen({route, navigation}) {
  const [isLoaded, setIsLoaded] = useState(true);
  const [address, setAddress] = useState({...addressSchema});

  function RegisterAddressFormSchema() {
    return yup.object({
      cep: yup
        .string()
        .required('campo requerido')
        .min(8, 'mínimo de 8 caracteres')
        .max(10, 'máximo de 9 caracteres')
        .test('is-numb-1-5', 'Somente números são permitidos', val => {
          return parseInt(val) > 0;
        }),
      street: yup.string().required('campo requerido'),
      neighborhood: yup.string().required('campo requerido'),
      city: yup.string().required('campo requerido'),
      state: yup.string().required('campo requerido'),
    });
  }

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
          latitude: `${
            responseGeocoding.data.results[0].geometry.location.lat
          }`,
          longitude: `${
            responseGeocoding.data.results[0].geometry.location.lng
          }`,
          neighborhood: responseCep.data.bairro,
          street: responseCep.data.logradouro,
          state: responseCep.data.uf,
          addressUserId: responseUserAttb.attributes.sub,
        });
      }
    } catch (error) {
      console.log('ERROR CEP → ', error);
      Alert.alert('Erro ao buscar cep!');
    }
    setIsLoaded(true);
  }

  async function createAddress() {
    setIsLoaded(false);
    try {
      const response = await API.graphql(
        graphqlOperation(mutations.createAddress, {input: address}),
      );
      console.log('response graphql → ', response);
      Alert.alert('Endereço cadastrado com sucesso!');
    } catch (error) {
      console.log('CATCH ERROR → ', error);
      Alert.alert('Erro ao cadastrar endereço!');
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
        navigation.goBack();
      }}>
      {({values, handleChange, handleSubmit, errors, touched}) => (
        <SafeAreaView>
          {console.log('ADDRESS →', address)}

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
                    />
                    <Button
                      title="BUSCAR CEP"
                      onPress={() => {
                        handleSubmitCep(values.cep);
                      }}
                      disabled={!values.cep}
                    />
                    <FormInput
                      title={'Rua:'}
                      onChangeText={handleChange('street')}
                      value={values.street}
                      errorMessage={errors.street}
                      touched={touched.street}
                      divider={false}
                    />
                    <FormInput
                      title={'Bairro:'}
                      onChangeText={handleChange('neighborhood')}
                      value={values.neighborhood}
                      errorMessage={errors.neighborhood}
                      touched={touched.neighborhood}
                      divider={false}
                    />
                    <FormInput
                      title={'Cidade:'}
                      onChangeText={handleChange('city')}
                      value={values.city}
                      errorMessage={errors.city}
                      touched={touched.city}
                      divider={false}
                    />
                    <FormInput
                      title={'Estado:'}
                      onChangeText={handleChange('state')}
                      value={values.state}
                      errorMessage={errors.state}
                      touched={touched.state}
                    />

                    <Button
                      title="CADASTRAR ENDEREÇO"
                      onPress={handleSubmit}
                      disabled={!address.cep}
                    />
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
