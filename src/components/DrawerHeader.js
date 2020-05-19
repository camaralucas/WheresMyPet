import React from 'react';
import GlobalTheme from '../theme/GlobalTheme';
import {ThemeProvider, Text} from 'react-native-elements';

const DrawerHeader = () => (
  <ThemeProvider>
    <Text style={GlobalTheme.drawerHeader}>MENU</Text>
  </ThemeProvider>
);

export default DrawerHeader;
