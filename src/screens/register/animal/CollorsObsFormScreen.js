import React, {useState, useEffect} from 'react';
import GlobalTheme from '../../../styles/GlobalTheme';
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  Alert,
  ScrollView,
} from 'react-native';
import {ThemeProvider, Button, Divider} from 'react-native-elements';
import {Formik} from 'formik';
import ColorPicker from '../../../components/ColorPicker';
import Checkbox from '../../../components/Checkbox';
import FormInput from '../../../components/FormInput';
import * as yup from 'yup';
import LoadingIndicator from '../../../components/LoadingIndicator';
import UploadPhoto from '../../../backend/image-handlers/UploadPhoto';

export default function CollorsObsFormScreen({route, navigation}) {
  const [isLoaded, setIsLoaded] = useState(true);
  const [animal, setAnimal] = useState(route.params.animal);
  const [initialValues, setInitialValues] = useState(route.params.animal);
  const [checkedEye, setCheckedEye] = useState(false);
  const [checkedFur, setCheckedFur] = useState(false);
  console.log('route params → ', route.params);

  function ObservationFormSchema() {
    return yup.object({
      observation: yup.string().max(40, 'máximo de 40 caracteres'),
    });
  }

  return (
    <View>
      {isLoaded ? (
        <Formik
          initialValues={initialValues}
          validationSchema={ObservationFormSchema()}
          enableReinitialize={true}
          onSubmit={async values => {
            setIsLoaded(false);
            if (values.primary_fur == null || values.primary_fur == 'null') {
              return Alert.alert('Selecione a cor do pelo!');
            }
            if (!checkedFur) {
              values.secundary_fur = values.primary_fur;
            } else if (
              values.secundary_fur == null ||
              values.secundary_fur == 'null'
            ) {
              return Alert.alert('Selecione a cor secundária do pelo!');
            }

            checkedEye
              ? (values.heterochromia = 1)
              : (values.heterochromia = 0);

            try {
              const {key} = await UploadPhoto(
                route.params.image,
                (temporary = true),
              );
              values.photoKey = key;
              setAnimal(values);
            } catch (e) {
              Alert.alert('Erro ao enviar imagem.');
            }

            if (values.photoKey) {
              try {
                navigation.navigate('BreedScreen', {
                  animal: values,
                  image: route.params.image,
                });
              } catch (e) {
                Alert.alert('Não foi possível cadastrar o animal!');
              }
            }
            setIsLoaded(true);
          }}>
          {({values, handleChange, handleSubmit, errors, touched}) => (
            <View
              style={{
                ...GlobalTheme.container,
                justifyContent: 'space-between',
              }}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                  <ThemeProvider theme={GlobalTheme}>
                    <Text style={GlobalTheme.headerText}>
                      Cor do pelo do animal
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
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
                      title={'Selecione se o animal possui duas cores de pelo'}
                      onPress={() => setCheckedFur(!checkedFur)}
                      checked={checkedFur}
                    />
                    <Checkbox
                      title={'Selecione se o animal possui heterocromia'}
                      onPress={() => setCheckedEye(!checkedEye)}
                      checked={checkedEye}
                    />
                    <Divider style={GlobalTheme.divider} />
                    <Text style={GlobalTheme.headerText}>Observações</Text>
                    <FormInput
                      title="Insira aqui alguma informação que ajude na identificação do animal. Exemplo: 'Possui um machudado na orelha esquerda'. (máximo de 40 caracteres)"
                      onChangeText={handleChange('observation')}
                      style={{...GlobalTheme.textInput, height: 60}}
                      value={values.observation}
                      errorMessage={errors.observation}
                      touched={touched.observation}
                      multiline={true}
                      divider={true}
                    />
                    <Button title="PROXIMO" onPress={handleSubmit} />
                  </ThemeProvider>
                </ScrollView>
              </TouchableWithoutFeedback>
            </View>
          )}
        </Formik>
      ) : (
        <LoadingIndicator />
      )}
    </View>
  );
}
