import React, {useState} from 'react';
import GlobalTheme from '../../../theme/GlobalTheme';
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
import ColorPicker from '../../../components/ColorPicker';
import Checkbox from '../../../components/Checkbox';

export default function FormScreen({route, navigation}) {
  const [animal, setAnimal] = useState(route.params.animal);
  const [checkedEye, setCheckedEye] = useState(false);
  const [checkedFur, setCheckedFur] = useState(false);

  function RegisterAnimalFormSchema() {
    return yup.object({
      name: yup
        .string()
        .required('campo requerido')
        .min(2, 'mínimo de 2 caracteres')
        .max(15, 'máximo de 15 caracteres'),
      address: yup
        .string()
        .required('campo requerido')
        .min(8, 'mínimo de 8 caracteres'),
      text: yup
        .string()
        .required('campo requerido')
        .min(2, 'máximo de 2 caracteres')
        .max(10, 'máximo de 10 caracteres'),
      number: yup
        .string()
        .required('campo requerido')
        .min(1, 'mínimo de 1 caractere')
        .max(10, 'máximo de 10 caracteres')
        .test('is-numb-1-5', 'É valido números maiores que 0', val => {
          return parseInt(val) > 0;
        }),
    });
  }

  return (
    <Formik
      initialValues={animal}
      validationSchema={RegisterAnimalFormSchema()}
      onSubmit={values => {
        if (!checkedEye) {
          values.eye_right = values.eye_left;
        }
        if (!checkedFur) {
          values.secundary_fur = values.primary_fur;
        }
        setAnimal(values);
        navigation.navigate('ObservationScreen', {animal: values});
      }}>
      {({values, handleChange, handleSubmit, errors, touched}) => (
        <SafeAreaView>
          <ThemeProvider theme={GlobalTheme}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView>
                <FormInput
                  title={'Atende por:'}
                  onChangeText={handleChange('name')}
                  value={values.name}
                  errorMessage={errors.name}
                  touched={touched.name}
                />
                <FormInput
                  title={'Ultimo endereço que o animal foi visto:'}
                  onChangeText={handleChange('address')}
                  value={values.address}
                  errorMessage={errors.address}
                  touched={touched.address}
                />
                <FormInput
                  header="Marcações na coleira do animal"
                  title={'Texto:'}
                  onChangeText={handleChange('text')}
                  value={values.text}
                  errorMessage={errors.text}
                  touched={touched.text}
                />
                <FormInput
                  title={'Número:'}
                  onChangeText={handleChange('number')}
                  value={values.number}
                  errorMessage={errors.number}
                  touched={touched.number}
                />
                <Text style={GlobalTheme.headerText}>Cor dos olhos</Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <ColorPicker
                    title={
                      !checkedEye ? 'Cor dos olhos:' : 'Cor do olho esquerdo'
                    }
                    onValueChange={handleChange('eye_left')}
                    selectedValue={values.eye_left}
                  />
                  {checkedEye && (
                    <ColorPicker
                      title={'Cor do olho direito:'}
                      onValueChange={handleChange('eye_right')}
                      selectedValue={values.eye_right}
                    />
                  )}
                </View>
                <Checkbox
                  title={'Selecione se o animal possui heterocromia'}
                  onPress={() => setCheckedEye(!checkedEye)}
                  checked={checkedEye}
                />
                <Text style={GlobalTheme.headerText}>Cor do pelo</Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <ColorPicker
                    title={'Predominante:'}
                    onValueChange={handleChange('primary_fur')}
                    selectedValue={values.primary_fur}
                  />
                  {checkedFur && (
                    <ColorPicker
                      title={'Secundária:'}
                      onValueChange={handleChange('secundary_fur')}
                      selectedValue={values.secundary_fur}
                    />
                  )}
                </View>
                <Checkbox
                  title={'Selecione se o animal possui duas cores'}
                  onPress={() => setCheckedFur(!checkedFur)}
                  checked={checkedFur}
                />
                <Button title="PRÓXIMO >>" onPress={handleSubmit} />
              </ScrollView>
            </TouchableWithoutFeedback>
          </ThemeProvider>
        </SafeAreaView>
      )}
    </Formik>
  );
}
