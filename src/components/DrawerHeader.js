import React from 'react';
import GlobalTheme from '../styles/GlobalTheme';
import {View, Text} from 'react-native';

const DrawerHeader = () => (
  <View>
    <Text style={GlobalTheme.drawerHeader}>MENU</Text>
  </View>
);

export default DrawerHeader;
