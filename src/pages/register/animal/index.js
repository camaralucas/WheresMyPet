import React from 'react';
import {View, Text, Button} from 'react-native';

class RegisterAnimalPage extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Register a animal!</Text>
        <Button
          title="Go to Upload Photo Page"
          onPress={() => this.props.navigation.navigate('UploadPhoto')}
        />
      </View>
    );
  }
}

export default RegisterAnimalPage;
