import React from 'react';
import globalTheme from '../theme/globalTheme';
import {ThemeProvider, Text} from 'react-native-elements';

const DrawerHeader = () => (
  <ThemeProvider>
    <Text style={globalTheme.drawerHeader}>MENU</Text>
  </ThemeProvider>
);

export default DrawerHeader;
