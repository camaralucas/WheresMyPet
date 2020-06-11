import React, {useState} from 'react';
import GlobalTheme from '../../../styles/GlobalTheme';
import {
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  Alert,
} from 'react-native';
import {ThemeProvider, Button} from 'react-native-elements';
import {Formik} from 'formik';
import ColorPicker from '../../../components/ColorPicker';
import Checkbox from '../../../components/Checkbox';

export default function CollorsFormScreen({route, navigation}) {
  const [animal, setAnimal] = useState(route.params.animal);
  const [checkedEye, setCheckedEye] = useState(false);
  const [checkedFur, setCheckedFur] = useState(false);

  return (
    <Formik
      initialValues={animal}
      enableReinitialize={true}
      onSubmit={values => {
        if (values.eye_left == null || values.eye_left == 'null') {
          return Alert.alert('Selecione a cor dos olhos!');
        }
        if (!checkedEye) {
          values.eye_right = values.eye_left;
        } else if (values.eye_right == null || values.eye_right == 'null') {
          return Alert.alert('Selecione a cor do olho direito!');
        }

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
        setAnimal(values);
        navigation.navigate('ObservationScreen', {animal: values});
      }}>
      {({values, handleChange, handleSubmit}) => (
        <SafeAreaView>
          <ThemeProvider theme={GlobalTheme}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView>
                <View style={GlobalTheme.container}>
                  <Text style={GlobalTheme.headerText}>
                    Cor dos olhos do animal
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <ColorPicker
                      title={
                        checkedEye ? 'Cor do olho esquerdo' : 'Cor dos olhos:'
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
                  <Text style={GlobalTheme.headerText}>
                    Cor do pelo do animal
                  </Text>
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
                    title={'Selecione se o animal possui duas cores de pelo'}
                    onPress={() => setCheckedFur(!checkedFur)}
                    checked={checkedFur}
                  />
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
