import {createStackNavigator} from 'react-navigation-stack';

// Screens
import HomeScreen from './screens/home';
import RegisterAnimalScreen from './screens/register/animal';
import UploadPhotoScreen from './screens/upload';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    RegisterAnimal: {
      screen: RegisterAnimalScreen,
    },
    UploadPhoto: {
      screen: UploadPhotoScreen,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

export default AppNavigator;
