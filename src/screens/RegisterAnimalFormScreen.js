import React, {useState} from 'react';
import globalTheme from '../theme/globalTheme';
import {
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {ThemeProvider, Button} from 'react-native-elements';
import {Formik} from 'formik';
import FormInput from '../components/FormInput';
import animalFormSchema from '../components/animalFormSchema';

export default function RegisterAnimalFormScreen({route, navigation}) {
  console.log('FORM navigation → ', navigation);
  console.log('route → ', route);

  const [checkedEye, setCheckedEye] = useState(false);
  const [checkedFur, setCheckedFur] = useState(false);

  return (
    <SafeAreaView style={globalTheme.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <Formik
            initialValues={{...route.params.animal}}
            validationSchema={animalFormSchema({checkedEye, checkedFur})}
            onSubmit={values => {
              navigation.setParams({
                animal: values,
              });
              console.log('VALUES → ', values);
            }}>
            {({values, handleChange, handleSubmit, errors, touched}) => (
              <ThemeProvider theme={globalTheme}>
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
                <FormInput
                  header="Cor do olho"
                  titleCheckbox={'Selecione se o animal possui heterocromia'}
                  onPressCheckbox={() => setCheckedEye(!checkedEye)}
                  checkedCheckbox={checkedEye}
                  title={!checkedEye ? 'Selecione:' : 'Olho esquerdo'}
                  onChangeText={handleChange('eye_left')}
                  value={values.eye_left}
                  divider={false}
                  errorMessage={errors.eye_left}
                  touched={touched.eye_left}
                />
                {checkedEye && (
                  <FormInput
                    title={'Olho direito:'}
                    onChangeText={handleChange('eye_right')}
                    value={values.eye_right}
                    errorMessage={errors.eye_right}
                    touched={touched.eye_right}
                  />
                )}
                <FormInput
                  header={'Cor do pelo'}
                  titleCheckbox={'Selecione se o animal possui duas cores'}
                  onPressCheckbox={() => setCheckedFur(!checkedFur)}
                  checkedCheckbox={checkedFur}
                  title={'Predominante:'}
                  onChangeText={handleChange('primary_fur')}
                  value={values.primary_fur}
                  divider={false}
                  errorMessage={errors.primary_fur}
                  touched={touched.primary_fur}
                />
                {checkedFur && (
                  <FormInput
                    title={'Secundária:'}
                    onChangeText={handleChange('secundary_fur')}
                    value={values.secundary_fur}
                    errorMessage={errors.secundary_fur}
                    touched={touched.secundary_fur}
                  />
                )}

                <Button
                  title="PRÓXIMO >>"
                  color="maroon"
                  onPress={handleSubmit}
                />
              </ThemeProvider>
            )}
          </Formik>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
