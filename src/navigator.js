import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  DrawerItem,
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Authenticator from './backend/auth/Authenticator';
import DrawerHeader from './components/DrawerHeader';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Animated from 'react-native-reanimated';

// Register animal screens
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import SelectSpecieScreen from './screens/register/animal/SelectSpecieScreen';
import BreedSelectScreen from './screens/register/animal/BreedSelectScreen';
import ImageSelectScreen from './screens/register/animal/ImageSelectScreen';
import GeneralInfoScreen from './screens/register/animal/GeneralInfoScreen';
import CollorsFormScreen from './screens/register/animal/CollorsFormScreen';
import ObservationScreen from './screens/register/animal/ObservationScreen';

// Commons screens
import AddressScreen from './screens/register/AddressScreen';

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
          name="MapScreen"
          component={MapScreen}
          options={{
            title: 'Mapa',
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
          name="BreedSelectScreen"
          component={BreedSelectScreen}
          options={{title: 'Selecione a raça do animal'}}
        />
        <Stack.Screen
          name="ImageSelectScreen"
          component={ImageSelectScreen}
          options={{title: 'Selecionar foto'}}
        />
        <Stack.Screen
          name="CollorsFormScreen"
          component={CollorsFormScreen}
          options={{title: 'Selecione os campos'}}
        />
        <Stack.Screen
          name="GeneralInfoScreen"
          component={GeneralInfoScreen}
          options={{title: 'Informações na coleira'}}
        />
        <Stack.Screen
          name="AddressScreen"
          component={AddressScreen}
          options={{title: 'Cadastrar endereço'}}
        />
        <Stack.Screen
          name="ObservationScreen"
          component={ObservationScreen}
          options={{title: 'Observações finais'}}
        />
      </Stack.Navigator>
    </Animated.View>
  );
};

const DrawerContent = props => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerHeader />
      <DrawerItem
        label="Início"
        onPress={() => props.navigation.navigate('HomeScreen')}
        labelStyle={{marginLeft: -16, marginVertical: -10, marginBottom: -10}}
        icon={() => <Icon name="home" size={16} />}
      />
      <DrawerItem
        label="Cadastrar animal perdido"
        onPress={() => props.navigation.navigate('SelectSpecieScreen')}
        labelStyle={{marginLeft: -16, marginVertical: -10, marginBottom: -10}}
        icon={() => <Icon name="paw" size={16} />}
      />
      <DrawerItem
        label="Sair"
        onPress={async () => await Authenticator().LogoutUser()}
        labelStyle={{marginLeft: -16, marginVertical: -10, marginBottom: -10}}
        icon={() => <Icon name="sign-out-alt" size={16} color="#ff0000" />}
      />
    </DrawerContentScrollView>
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
        return <DrawerContent {...props} />;
      }}>
      <Drawer.Screen name="Screens">
        {props => <Screens {...props} style={screenTheme} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};
