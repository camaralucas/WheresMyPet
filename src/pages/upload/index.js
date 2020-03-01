import React from 'react';
import {View, Image, Button} from 'react-native';
import ImagePicker from 'react-native-image-picker';


export default class UploadPhoto extends React.Component {

  state = {
    avatarSource: null
  }

  selectImage = async () => {
    ImagePicker.showImagePicker({ noData:true, mediaType:'photo' }, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
    
        this.setState({
          avatarSource: response.uri,
        });
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {
          this.state.avatarSource && <Image source={{ uri:this.state.avatarSource }} style={{ width: '80%', height: 200, resizeMode: 'contain'}} />
        }
        <Button title="Selecione uma foto" onPress={ this.selectImage }></Button>
      </View>
    );
  }
}
