import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ContentScrollView from './components/drawer/ContentScrollView';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Animated from 'react-native-reanimated';

// Register animal screens
import HomeScreen from './screens/HomeScreen';
import SelectSpecieScreen from './screens/register/animal/SelectSpecieScreen';
import ImageSelectScreen from './screens/register/animal/ImageSelectScreen';
import GeneralInfoScreen from './screens/register/animal/GeneralInfoScreen';
import CollorsObsFormScreen from './screens/register/animal/CollorsObsFormScreen';
import AbstractScreen from './screens/register/animal/AbstractScreen';
// Commons screens
import AddressScreen from './screens/register/AddressScreen';
import BreedScreen from './screens/register/BreedScreen';
import EditAnimalScreen from './screens/EditAnimalScreen';
import ProfileScreen from './screens/ProfileScreen';
import {View, Text} from 'react-native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Screens = ({navigation, style}) => {
  return (
    <Animated.View style={[{flex: 1, overflow: 'hidden'}, style]}>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          gestureEnabled: true,
          headerStyle: {
            backgroundColor: '#ffad33',
          },
          headerTintColor: '#000000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'Início',
            headerLeft: () => (
              <Icon
                name="bars"
                size={18}
                color="#000000"
                style={{marginStart: 20}}
                onPress={() => navigation.openDrawer()}
              />
            ),
          }}
        />
        <Stack.Screen
          name="SelectSpecieScreen"
          component={SelectSpecieScreen}
          options={{title: 'Cadastrar animal perdido'}}
        />
        <Stack.Screen
          name="ImageSelectScreen"
          component={ImageSelectScreen}
          options={{title: 'Selecionar foto'}}
        />
        <Stack.Screen
          name="GeneralInfoScreen"
          component={GeneralInfoScreen}
          options={{title: 'Informações gerais'}}
        />
        <Stack.Screen
          name="AddressScreen"
          component={AddressScreen}
          options={{title: 'Cadastrar endereço'}}
        />
        <Stack.Screen
          name="CollorsObsFormScreen"
          component={CollorsObsFormScreen}
          options={{title: 'Selecione e preencha'}}
        />
        <Stack.Screen
          name="AbstractScreen"
          component={AbstractScreen}
          options={{title: 'Resumo das informações'}}
        />
        <Stack.Screen
          name="BreedScreen"
          component={BreedScreen}
          options={{
            title: 'Selecione a raça do animal',
          }}
        />
        <Stack.Screen
          name="EditAnimalScreen"
          component={EditAnimalScreen}
          options={{
            title: 'Editar informações do animal',
            headerLeft: () => (
              <Icon
                name="arrow-left"
                size={18}
                color="#000000"
                style={{marginStart: 20}}
                onPress={() =>
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'HomeScreen'}],
                  })
                }
              />
            ),
          }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{title: 'Editar informações de perfil'}}
        />
      </Stack.Navigator>
    </Animated.View>
  );
};

export default () => {
  const [progress, setProgress] = useState(new Animated.Value(0));

  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  const screenTheme = {borderRadius, transform: [{scale}]};

  return (
    <Drawer.Navigator
      drawerType="slide"
      overlayColor="transparent"
      initialRouteName="HomeScreen"
      drawerStyle={{width: '60%'}}
      sceneContainerStyle={{backgroundColor: '#ffcc80'}}
      drawerContent={props => {
        setProgress(props.progress);
        return <ContentScrollView {...props} />;
      }}>
      <Drawer.Screen name="Screens">
        {props => <Screens {...props} style={screenTheme} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};
