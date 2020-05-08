import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  DrawerItem,
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import DrawerHeader from './components/DrawerHeader';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Animated from 'react-native-reanimated';

// Screens
import HomeScreen from './screens/HomeScreen';
import RegisterAnimalIndex from './screens/RegisterAnimalIndex';
import RegisterAnimalImageSelectScreen from './screens/RegisterAnimalImageSelectScreen';
import RegisterAnimalFormScreen from './screens/RegisterAnimalFormScreen';
import RegisterAnimalObsScreen from './screens/RegisterAnimalObsScreen';

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
          name="RegisterAnimalIndex"
          component={RegisterAnimalIndex}
          options={{title: 'Cadastrar animal perdido'}}
        />
        <Stack.Screen
          name="RegisterAnimalImageSelectScreen"
          component={RegisterAnimalImageSelectScreen}
          options={{title: 'Selecionar foto'}}
        />
        <Stack.Screen
          name="RegisterAnimalFormScreen"
          component={RegisterAnimalFormScreen}
          options={{title: 'Preencha os campos'}}
        />
        <Stack.Screen
          name="RegisterAnimalObsScreen"
          component={RegisterAnimalObsScreen}
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
        onPress={() => props.navigation.navigate('RegisterAnimalIndex')}
        labelStyle={{marginLeft: -16, marginVertical: -10, marginBottom: -10}}
        icon={() => <Icon name="paw" size={16} />}
      />
      <DrawerItem
        label="Sair"
        onPress={() => console.log('Inserir função de logout')}
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
    <NavigationContainer>
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
    </NavigationContainer>
  );
};
