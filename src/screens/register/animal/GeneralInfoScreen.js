import React, {useState} from 'react';
import GlobalTheme from '../../../styles/GlobalTheme';
import {
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
} from 'react-native';
import {ThemeProvider, Button} from 'react-native-elements';
import {Formik} from 'formik';
import * as yup from 'yup';
import FormInput from '../../../components/FormInput';
import Checkbox from '../../../components/Checkbox';
import AddressSelect from '../../../components/AddressSelect';

export default function GeneralInfoScreen({route, navigation}) {
  const [animal, setAnimal] = useState(route.params.animal);
  const [checkedCollarText, setCheckedCollarText] = useState(false);
  const [checkedCollarNumber, setCheckedCollarNumber] = useState(false);

  function CollarScreenFormSchema() {
    const rules = {};

    if (checkedCollarText)
      rules.text = yup
        .string()
        .required('campo requerido')
        .min(2, 'mínimo de 2 caracteres')
        .max(10, 'máximo de 10 caracteres');

    if (checkedCollarNumber)
      rules.number = yup
        .string()
        .required('campo requerido')
        .min(1, 'mínimo de 1 caractere')
        .max(10, 'máximo de 10 caracteres')
        .test('is-numb-1-5', 'É valido números maiores que 0', val => {
          return parseInt(val) > 0;
        });

    return yup.object({
      name: yup
        .string()
        .required('campo requerido')
        .min(2, 'mínimo de 2 caracteres')
        .max(15, 'máximo de 15 caracteres'),
      address: yup.string().required('campo requerido'),
      ...rules,
    });
  }

  return (
    <Formik
      initialValues={animal}
      validationSchema={CollarScreenFormSchema()}
      onSubmit={values => {
        setAnimal(values);
        navigation.navigate('CollorsFormScreen', {animal: values});
      }}>
      {({values, handleChange, handleSubmit, errors, touched}) => (
        <SafeAreaView>
          <ThemeProvider theme={GlobalTheme}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView>
                <View style={GlobalTheme.container}>
                  <FormInput
                    title={'O animal atende por:'}
                    onChangeText={handleChange('name')}
                    value={values.name}
                    errorMessage={errors.name}
                    touched={touched.name}
                    divider={true}
                  />
                  <AddressSelect
                    title={'Selecione o ultimo endereço que animal foi visto'}
                    onValueChange={handleChange('address')}
                    selectedValue={values.address}
                  />
                  <Button
                    title="Cadastrar novo endereço"
                    onPress={() =>
                      navigation.navigate('AddressScreen', {animal: animal})
                    }
                  />

                  <Text style={{...GlobalTheme.headerText, marginBottom: 20}}>
                    Selecione e preencha os campos abaixo em caso afirmativo
                  </Text>
                  <Checkbox
                    title={'O animal possui algum TEXTO na coleira?'}
                    onPress={() => setCheckedCollarText(!checkedCollarText)}
                    checked={checkedCollarText}
                    divider={false}
                  />
                  {checkedCollarText && (
                    <FormInput
                      title={'Preencha o valor do TEXTO:'}
                      onChangeText={handleChange('text')}
                      value={values.text}
                      errorMessage={errors.text}
                      touched={touched.text}
                      divider={false}
                    />
                  )}
                  <Checkbox
                    title={'O animal possui algum NÚMERO na coleira?'}
                    onPress={() => setCheckedCollarNumber(!checkedCollarNumber)}
                    checked={checkedCollarNumber}
                    divider={false}
                  />
                  {checkedCollarNumber && (
                    <FormInput
                      title={'Preencha o valor do NÚMERO:'}
                      onChangeText={handleChange('number')}
                      value={values.number}
                      errorMessage={errors.number}
                      touched={touched.number}
                    />
                  )}

                  <Button title="PRÓXIMO" onPress={handleSubmit} />
                </View>
              </ScrollView>
            </TouchableWithoutFeedback>
          </ThemeProvider>
        </SafeAreaView>
      )}
    </Formik>
  );
}
