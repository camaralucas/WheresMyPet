import React from 'react';
import {View, Text} from 'react-native';

class UploadPhotoScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Upload two photos!</Text>
      </View>
    );
  }
}

export default UploadPhotoScreen;
