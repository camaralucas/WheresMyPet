import React, {useState} from 'react';
import GlobalTheme from '../../../theme/GlobalTheme';
import {
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Formik} from 'formik';
import FormInput from '../../../components/FormInput';
import * as yup from 'yup';
import {ThemeProvider, Button} from 'react-native-elements';

export default function ObservationScreen({route, navigation}) {
  console.log('OBSERVATION navigation → ', navigation);
  console.log('route → ', route);

  const [animal, setAnimal] = useState(route.params.animal);

  function ObservationFormSchema() {
    return yup.string().max(30, 'máximo de 20 caracteres');
  }

  return (
    <Formik
      initialValues={{...animal}}
      validationSchema={ObservationFormSchema()}
      onSubmit={values => {
        setAnimal(values);
        console.log('VALUES → ', values);
      }}>
      {({values, handleChange, handleSubmit, errors, touched}) => (
        <SafeAreaView>
          <ThemeProvider theme={GlobalTheme}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView>
                <FormInput
                  title="Insira aqui alguma informação que ajuda na identificação do animal"
                  onChangeText={handleChange('observation')}
                  value={values.observation}
                  errorMessage={errors.observation}
                  touched={touched.observation}
                />
                <Button title="FINALIZAR CADASTRO" onPress={handleSubmit} />
              </ScrollView>
            </TouchableWithoutFeedback>
          </ThemeProvider>
        </SafeAreaView>
      )}
    </Formik>
  );
}
