import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// Pages
import HomePage from './pages/home';
import RegisterAnimalPage from './pages/register/animal';
import UploadPhotoPage from './pages/upload';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomePage,
    },
    RegisterAnimal: {
      screen: RegisterAnimalPage,
    },
    UploadPhoto: {
      screen: UploadPhotoPage,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

export default createAppContainer(AppNavigator);
