// import React from 'react';
// import {View, Image, Button} from 'react-native';
// import ImagePicker from 'react-native-image-picker';

// state = {
//   avatarSource: null
// }

// const [image, updateImage] = useState({key:null, signedUrl:null})

// export default class UploadPhoto extends React.Component {

//   getImage = async () => {
//     if (!image.key) return
//     const signedUrl = await Storage.get(image.key)
//     updateImage({...image, signedUrl})
//   }

//   onChange = async () => () {
//     const file = e.target.files[0];
//     if (!file) return
//     const imageInfo = await Storage.put(file.name, file)
//     updateImage({...image, key: imageInfo.key})
//     console.log('image uplodaded...', imageInfo)
//   }

//   selectImage = async () => {
//     ImagePicker.showImagePicker({ noData:true, mediaType:'photo' }, (response) => {
//       console.log('Response = ', response);
    
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//       } else {  
//         this.setState({
//           avatarSource: response.uri,
//         });
//         console.log(response);
//         console.log(this.avatarSource);
//       }
//     });
//   }

//   render() {
//     return (
//       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//         {
//           this.state.avatarSource && <Image source={{ uri:this.state.avatarSource }} style={{ width: '80%', height: 200, resizeMode: 'contain'}} />
//         }
//         <Button title="Selecione uma foto" onPress={ this.selectImage }></Button>
//         <Button title="SUBMETER FOTO" onPress={ photoUpload.onChange }></Button>
//       </View>
//     );
//   }
// }

import React, {useState, useEffect} from 'react'
import { View, Text, Image, Button } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { Storage } from 'aws-amplify'

export default function App() {

  const [photo, setPhoto] = useState(null);
  const [image, setImage] = useState({key:null, signedUrl:null});

  async function handleChoosePhoto() {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        setPhoto(response)
        console.log(response);
      } else {
        console.log("Selecione uma foto")
      }
    })
  }

  async function handleUploadPhoto() { 
    if (!photo) return
    const imageInfo = await Storage.put(photo.fileName, photo, null)
    console.log("Image info → " + imageInfo)
    setImage({...image, key: imageInfo.key})
    console.log('image uplodaded...', imageInfo)
  };

  async function handleGetImage() {
    if (!image.key) return
    const url = await Storage.get(image.key)
    setImage({...image, signedUrl: url})
  }
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {photo && (
        <Image
          source={{ uri: photo.uri }}
          style={{ width: 300, height: 300 }}
        />
      )}
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
      <Button title="Upload" onPress={handleUploadPhoto} />
      <Button title="Get image" onPress={handleGetImage} />
    </View>
  )  
}

// import React from 'react';
// import { Storage } from 'aws-amplify' 
// import { PhotoPicker } from 'aws-amplify-react-native';
// import { View, Button } from 'react-native';


//   render() {class App extends React.Component {
//   state = {
//     file: {}
//   }
//   onChange(data) {
//     console.log('data: ', data)
//     this.setState({ file: data.file })
//   }

//   saveFile = async () => {
//     const { file } = this.state
//     await Storage.put(file.name, file)
//     console.log('successfully saved file...')
//   }

//     return (
//       <View>
//         <PhotoPicker
//           preview
//           onChange={data => this.onChange(data)}
//         />
//         <Button onPress={this.saveFile}>
//           Save File
//         </Button>        
//         </View>
//     )
//   }
// }

// export default App;

// import React, { Component, useState } from 'react';
// import {View, Image, Button} from 'react-native';
// import ImagePicker from 'react-native-image-picker';
// import { Storage } from 'aws-amplify'

// function App() {
//   state = {
//     avatarSource: null
//   }
  
//   const [image, updateImage] = useState({key:null, signedUrl:null})

//   async function getImage() {
//     if (!image.key) return
//     const signedUrl = await Storage.get(image.key)
//     updateImage({...image, signedUrl})
//   }

//   async function onChange() {
//     const file = e.target.files[0];
//     if (!file) return
//     const imageInfo = await Storage.put(file.name, file)
//     updateImage({...image, key: imageInfo.key})
//     console.log('image uplodaded...', imageInfo)
//   }
// }

// export default class Photo extends Component {  
//   selectImage = async () => {
//     ImagePicker.showImagePicker({ noData:true, mediaType:'photo' }, (response) => {
//       console.log('Response = ', response);
    
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//       } else {
//         console.log(response)
//         this.setState({
//           avatarSource: response.uri,
//         });
//         console.log(avatarSource)
//         //onChange();
//       }
//     });
//   }
  
//   render(
//     return (
//       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//         {
//           this.state.avatarSource && <Image source={{ uri:this.state.avatarSource }} style={{ width: '80%', height: 200, resizeMode: 'contain'}} />
//         }
//         <Button title="Selecione uma foto" onPress={ this.selectImage }></Button>
//         <Button title="Enviar foto" ></Button>
//         <Button title="Buscar foto" ></Button>
//       </View>
//     )
//   )
// }

// export default App
