import React, {useState, useEffect} from 'react';
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
import GlobalTheme from '../../../styles/GlobalTheme';
import Checkbox from '../../../components/Checkbox';
import AddressSelect from '../../../components/AddressSelect';
import LoadingIndicator from '../../../components/LoadingIndicator';
// Formik
import {Formik} from 'formik';
import FormInput from '../../../components/FormInput';
import CollarFormSchema from '../../../backend/form-validation-schemas/CollarFormSchema';
// GraphQL
import Queries from '../../../backend/resolvers/Queries';

export default function GeneralInfoScreen({route, navigation}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animal, setAnimal] = useState(route.params.animal);
  const [checkedCollarText, setCheckedCollarText] = useState(false);
  const [checkedCollarNumber, setCheckedCollarNumber] = useState(false);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    initialize();
  }, []);

  function initialize() {
    setIsLoaded(false);
    getAddresses();
    setIsLoaded(true);
  }

  async function getAddresses() {
    const response = await Queries().getUserAddresses();
    setAddresses(response.data.listAddresss.items);
  }

  return (
    <Formik
      initialValues={animal}
      validationSchema={CollarFormSchema({
        checkedCollarText,
        checkedCollarNumber,
      })}
      enableReinitialize={true}
      onSubmit={values => {
        if (
          values.animalAddressId == null ||
          values.animalAddressId == 'null'
        ) {
          return Alert.alert('Selecione um endereço!');
        }
        setAnimal(values);
        navigation.navigate('CollorsFormScreen', {animal: values});
      }}>
      {({values, handleChange, handleSubmit, errors, touched}) => (
        <SafeAreaView>
          {isLoaded ? (
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
                      onValueChange={handleChange('animalAddressId')}
                      selectedValue={values.animalAddressId}
                      addresses={addresses}
                    />
                    <Button
                      title="Cadastrar novo endereço"
                      onPress={() =>
                        navigation.navigate('AddressScreen', {
                          animal: animal,
                          initialize,
                        })
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
                      onPress={() =>
                        setCheckedCollarNumber(!checkedCollarNumber)
                      }
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
          ) : (
            <LoadingIndicator />
          )}
        </SafeAreaView>
      )}
    </Formik>
  );
}
