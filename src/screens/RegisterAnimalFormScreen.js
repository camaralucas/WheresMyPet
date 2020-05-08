import React, {useState} from 'react';
import globalTheme from '../theme/globalTheme';
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
import FormInput from '../components/FormInput';
import animalFormSchema from '../components/animalFormSchema';
import ColorPicker from '../components/ColorPicker';
import Checkbox from '../components/Checkbox';
import CustomButton from '../components/buttons/CustomButton';

export default function RegisterAnimalFormScreen({route, navigation}) {
  console.log('FORM navigation → ', navigation);
  console.log('route → ', route);

  const animal = route.params.animal;

  const [checkedEye, setCheckedEye] = useState(true);
  const [checkedFur, setCheckedFur] = useState(true);

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
              navigation.navigate('RegisterAnimalImageSelectScreen', {animal});
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
                <Text style={globalTheme.headerText}>Cor dos olhos</Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
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

                <Text style={globalTheme.headerText}>Cor do pelo</Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
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
                <CustomButton title="PRÓXIMO >>" onPress={handleSubmit} />
              </ThemeProvider>
            )}
          </Formik>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
