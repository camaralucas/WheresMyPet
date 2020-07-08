import React, {useState, useEffect} from 'react';
import {DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import Authenticator from '../../backend/auth/Authenticator';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View, Text, Alert} from 'react-native';
import LoadingIndicator from '../LoadingIndicator';
import GlobalTheme from '../../styles/GlobalTheme';
import {Divider} from 'react-native-elements';
import AnimalDrawerView from './AnimalDrawerView';
import Queries from '../../backend/resolvers/Queries';

function ContentScrollView(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [userAnimals, setUserAnimals] = useState([]);

  useEffect(() => {
    load();
  }, [props]);

  async function load() {
    setIsLoaded(false);
    try {
      const {attributes} = await Authenticator().GetUserSub();
      const {data} = await Queries().GetUserAnimalsIds(attributes.sub);
      let animals = data.getUser.animals.items;

      let idList = [];

      animals.map(async animal => {
        idList.push({id: {eq: animal.id}});
      });

      let filter = {
        or: idList,
      };

      const response = await Queries().ListAllAnimals(filter);
      let listUserAnimals = response.data.listAnimals.items;

      listUserAnimals.map(async animal => {
        animal.image = `https://wheresmypet9f856ad94eb34c7da8e58ad95eeacc37192432-dev.s3.amazonaws.com/public/${
          animal.photoKey
        }`;
      });
      setUserAnimals(listUserAnimals);
    } catch (e) {
      Alert.alert('Não foi possível buscar os dados do usuário');
    }
    setIsLoaded(true);
  }

  return (
    <DrawerContentScrollView {...props}>
      {isLoaded ? (
        <View>
          <View style={{paddingTop: 30}}>
            <Text style={GlobalTheme.drawerHeader}>MENU</Text>
            <DrawerItem
              label="Início"
              onPress={() => props.navigation.navigate('HomeScreen')}
              labelStyle={{
                marginLeft: -16,
                marginVertical: -10,
                marginBottom: -10,
              }}
              icon={() => <Icon name="home" size={16} />}
            />
            <DrawerItem
              label="Meu perfil"
              onPress={() => props.navigation.navigate('ProfileScreen')}
              labelStyle={{
                marginLeft: -16,
                marginVertical: -10,
                marginBottom: -10,
              }}
              icon={() => <Icon name="user-alt" size={16} />}
            />
            <DrawerItem
              label="Cadastrar animal perdido"
              onPress={() => props.navigation.navigate('SelectSpecieScreen')}
              labelStyle={{
                marginLeft: -16,
                marginVertical: -10,
                marginBottom: -10,
              }}
              icon={() => <Icon name="paw" size={16} />}
            />
            <DrawerItem
              label="Sair"
              onPress={async () => await Authenticator().LogoutUser()}
              labelStyle={{
                marginLeft: -16,
                marginVertical: -10,
                marginBottom: -10,
              }}
              icon={() => (
                <Icon name="sign-out-alt" size={16} color="#ff0000" />
              )}
            />
          </View>
          <Divider style={GlobalTheme.divider} />
          <AnimalDrawerView
            route={props.route}
            navigation={props.navigation}
            animals={userAnimals}
          />
          <Divider style={GlobalTheme.divider} />
        </View>
      ) : (
        <LoadingIndicator />
      )}
    </DrawerContentScrollView>
  );
}

export default ContentScrollView;
