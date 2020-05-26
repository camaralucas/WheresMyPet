import React, {useState} from 'react';
import GlobalTheme from '../../../styles/GlobalTheme';
import {
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
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
      enableReinitialize={true}
      validationSchema={ObservationFormSchema()}
      onSubmit={values => {
        setAnimal(values);
      }}>
      {({values, handleChange, handleSubmit, errors, touched}) => (
        <SafeAreaView>
          <ThemeProvider theme={GlobalTheme}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView>
                <View style={GlobalTheme.container}>
                  <FormInput
                    title="Insira aqui alguma informação que ajude na identificação do animal. (máximo de 30 caracteres)"
                    onChangeText={handleChange('observation')}
                    value={values.observation}
                    errorMessage={errors.observation}
                    touched={touched.observation}
                    multiline={true}
                  />
                  <Button title="FINALIZAR CADASTRO" onPress={handleSubmit} />
                </View>
              </ScrollView>
            </TouchableWithoutFeedback>
          </ThemeProvider>
        </SafeAreaView>
      )}
    </Formik>
  );
}
