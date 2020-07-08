import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  Alert,
} from 'react-native';
import {ThemeProvider, Button, Divider} from 'react-native-elements';
import GlobalTheme from '../../../styles/GlobalTheme';
import Checkbox from '../../../components/Checkbox';
import AddressSelect from '../../../components/AddressSelect';
import LoadingIndicator from '../../../components/LoadingIndicator';
import ColorPicker from '../../../components/ColorPicker';
// Formik
import {Formik} from 'formik';
import FormInput from '../../../components/FormInput';
import CollarFormSchema from '../../../backend/form-validation-schemas/CollarFormSchema';
// GraphQL
import Queries from '../../../backend/resolvers/Queries';
import Authenticator from '../../../backend/auth/Authenticator';

export default function GeneralInfoScreen({route, navigation}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animal, setAnimal] = useState(route.params.animal);
  const [checkedCollar, setCheckedCollar] = useState(false);
  const [checkedCollarText, setCheckedCollarText] = useState(false);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    initialize();
  }, []);

  function initialize() {
    userAddressesHandler();
  }

  async function userAddressesHandler() {
    try {
      setIsLoaded(false);
      const {username} = await Authenticator().GetUserSub();
      const {data} = await Queries().GetUserAddresses(username);
      setAddresses(data.getUser.addresses.items);
      setIsLoaded(true);
    } catch {
      Alert.alert('ERRO', 'Não foi possível obter os endereços cadastrados');
    }
  }

  return (
    <View>
      {isLoaded ? (
        <Formik
          initialValues={animal}
          validationSchema={CollarFormSchema({
            checkedCollarText,
          })}
          enableReinitialize={true}
          onSubmit={values => {
            if (
              values.animalAddressId == null ||
              values.animalAddressId == 'null'
            ) {
              return Alert.alert('Selecione um endereço!');
            }

            if (!checkedCollar) {
              values.collarText = null;
              values.collarColor = null;
            } else if (
              values.collarColor == null ||
              values.collarColor == 'null'
            ) {
              return Alert.alert('Selecione a cor da coleira!');
            }

            setAnimal(values);
            navigation.navigate('CollorsObsFormScreen', {
              animal: values,
              image: route.params.image,
            });
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
                      O animal atende por
                    </Text>
                    <FormInput
                      onChangeText={handleChange('name')}
                      value={values.name}
                      errorMessage={errors.name}
                      touched={touched.name}
                      divider={true}
                    />
                    <Text style={GlobalTheme.headerText}>
                      Selecione o ultimo endereço que animal foi visto
                    </Text>
                    <AddressSelect
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
                    <Divider style={GlobalTheme.divider} />
                    <Text style={GlobalTheme.headerText}>
                      Selecione e preencha os campos abaixo em caso afirmativo
                    </Text>
                    <Checkbox
                      title={'O animal possui coleira?'}
                      onPress={() => setCheckedCollar(!checkedCollar)}
                      checked={checkedCollar}
                      divider={false}
                    />

                    {checkedCollar && (
                      <View>
                        <Text style={GlobalTheme.headerText}>
                          Selecione a cor da coleira do animal
                        </Text>
                        <ColorPicker
                          onValueChange={handleChange('collarColor')}
                          selectedValue={values.collarColor}
                        />
                        <Divider style={GlobalTheme.divider} />
                        <Checkbox
                          title={'O animal possui algo marcado na coleira?'}
                          onPress={() =>
                            setCheckedCollarText(!checkedCollarText)
                          }
                          checked={checkedCollarText}
                          divider={false}
                        />
                        <Text style={{marginBottom: 10}}>
                          Exemplo: Pingente com identificação com nome ou número
                          de identificação.
                        </Text>

                        {checkedCollarText && (
                          <View>
                            <Text style={GlobalTheme.headerText}>
                              Digite o que está marcado na coleira do animal
                            </Text>
                            <FormInput
                              onChangeText={handleChange('collarText')}
                              value={values.collarText}
                              errorMessage={errors.collarText}
                              touched={touched.collarText}
                              divider={false}
                            />
                            <Divider style={GlobalTheme.divider} />
                          </View>
                        )}
                      </View>
                    )}

                    <Button title="PRÓXIMO" onPress={handleSubmit} />
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
