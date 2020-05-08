import React, {useState} from 'react';
import globalTheme from '../theme/globalTheme';
import {
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {ThemeProvider} from 'react-native-elements';
import {Formik} from 'formik';
import FormInput from '../components/FormInput';
import animalFormSchema from '../components/animalFormSchema';
import CustomButton from '../components/buttons/CustomButton';

export default function RegisterAnimalObsScreen({route, navigation}) {
  console.log('FORM navigation → ', navigation);
  console.log('route → ', route);

  const animal = route.params.animal;
  const checkedEye = true;
  const checkedFur = true;

  return (
    <SafeAreaView style={globalTheme.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <Formik
            initialValues={{...animal}}
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
                  title="Insira aqui alguma informação que ajuda na identificação do animal"
                  onChangeText={handleChange('observation')}
                  value={values.observation}
                  errorMessage={errors.observation}
                  touched={touched.observation}
                />
                <CustomButton
                  title="FINALIZAR CADASTRO"
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
