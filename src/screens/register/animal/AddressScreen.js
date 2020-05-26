import React, {useState} from 'react';
import GlobalTheme from '../../../styles/GlobalTheme';
import {
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from 'react-native';
import {ThemeProvider, Button} from 'react-native-elements';
import {Formik} from 'formik';
import * as yup from 'yup';
import FormInput from '../../../components/FormInput';
import axios from 'axios';

export default function FormScreen({route, navigation}) {
  const [animal, setAnimal] = useState(route.params.animal);

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

  async function getCep(value) {
    let cep = value.replace(/\D/g, '');
    let regexCep = /^[0-9]{8}$/;

    if (regexCep.test(cep)) {
      let response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setAnimal({
        ...animal,
        address: {
          cep: response.data.cep,
          street: response.data.logradouro,
          neighborhood: response.data.bairro,
          city: response.data.localidade,
          state: response.data.uf,
        },
      });
    } else {
      alert('Formato de CEP inválido.');
    }
  }

  return (
    <Formik
      initialValues={animal.address}
      validationSchema={RegisterAddressFormSchema()}
      enableReinitialize={true}
      onSubmit={values => {
        navigation.navigate('ObservationScreen', {animal: animal});
      }}>
      {({values, handleChange, handleSubmit, errors, touched}) => (
        <SafeAreaView>
          <ThemeProvider theme={GlobalTheme}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView>
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
                    onPress={() => getCep(values.cep)}
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
                    title="PRÓXIMO"
                    onPress={handleSubmit}
                    disabled={!animal.address.cep}
                  />
                </View>
              </ScrollView>
            </TouchableWithoutFeedback>
          </ThemeProvider>
        </SafeAreaView>
      )}
    </Formik>
  );
}
