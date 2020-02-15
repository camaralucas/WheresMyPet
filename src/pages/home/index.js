import React from 'react';
import {View} from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';


class HomePage extends React.Component {
  render() {
    return (
      <ThemeProvider>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Button 
            title="Go to Register Animal Page"
            onPress={() => this.props.navigation.navigate('RegisterAnimal')} 
          />
        </View>
      </ThemeProvider>
    );
  }
}

export default HomePage;
