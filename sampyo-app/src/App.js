import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import CameraScreen from 'screens/Camera';
import About from 'screens/About';
import ArchiveScreen from 'screens/Archive';
import CropperScreen from 'screens/Cropper';
import GalleryScreen from 'screens/Gallery';
import ResultScreen from 'screens/Result';
import ImageValidatorScreen from 'screens/ImageValidator';


const App = () => {

    const Stack = createStackNavigator();

    // SplashScreen.preventAutoHideAsync();
    // setTimeout(() => {
    //     SplashScreen.hideAsync();
    // }, 3000);

    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="Gallery" component={GalleryScreen} options={{animationEnabled: false}}/>
          <Stack.Screen name="Archive" component={ArchiveScreen} />
          <Stack.Screen name="Cropper" component={CropperScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="ImageValidator" component={ImageValidatorScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default App;
// import React from 'react'
// import { Dimensions, Button, ImageBackground } from 'react-native'
// import { ImageManipulator } from 'expo-image-crop'

// export default class App extends React.Component {
//   state = {
//       isVisible: false,
//       uri: 'https://i.pinimg.com/originals/39/42/a1/3942a180299d5b9587c2aa8e09d91ecf.jpg',
//   }
//   onToggleModal = () => {
//       const { isVisible } = this.state
//       this.setState({ isVisible: !isVisible })
//   }
//   render() {
//       const { uri, isVisible } = this.state
//       const { width, height } = Dimensions.get('window')
//       return (
          // <ImageBackground
          //     resizeMode="contain"
          //     style={{
          //         justifyContent: 'center', padding: 20, alignItems: 'center', height, width, backgroundColor: 'black',
          //     }}
          //     source={{ uri }}
          // >
          //     <Button title="Open Image Editor" onPress={() => this.setState({ isVisible: true })} />
//               <ImageManipulator
//                   photo={{ uri }}
//                   isVisible={true}
//                   onPictureChoosed={({ uri: uriM }) => this.setState({ uri: uriM })}
//                   onToggleModal={this.onToggleModal}
//                   allowFlip={false}
//                   allowRotate={false}
//                   fixedMask={{width: 340, height: 600}}
//               />
//           // </ImageBackground>
//       )
//   }
// }

// import React from 'react';
// import { Dimensions, View, Image, Button } from 'react-native';
// import ImageCropper from 'react-native-simple-image-cropper';

// const window = Dimensions.get('window');
// const w = window.width;
// const h = window.height;

// const IMAGE = 'https://picsum.photos/id/48/900/500';

// const CROP_AREA_WIDTH = 300;
// const CROP_AREA_HEIGHT = 400;

// export default class App extends React.Component {	
//   state = {
//     cropperParams: {},
//     croppedImage: '',
//   };

//   setCropperParams = cropperParams => {
//     this.setState(prevState => ({
//       ...prevState,
//       cropperParams,
//     }));
//   };
  
//   handlePress = async () => {
//     const { cropperParams } = this.state;

//     const cropSize = {
//       width: 200,
//       height: 200,
//     };

//     const cropAreaSize = {
//       width: CROP_AREA_WIDTH,
//       height: CROP_AREA_HEIGHT,
//     };

//     try {
//       const result = await ImageCropper.crop({
//         ...cropperParams,
//         imageUri: IMAGE,
//         cropSize,
//         cropAreaSize,
//       });
//       this.setState(prevState => ({
//         ...prevState,
//         croppedImage: result,
//       }));
//     } catch (error) {
//       console.log(error);
//     }
//   };
  
//   render() {
//     const { croppedImage } = this.state;
//     const src = { uri: croppedImage };
    
//     return (
//       <View style={{width: w, height: h, marginTop: 400}}>
//         <ImageCropper
//           imageUri={IMAGE}
//           cropAreaWidth={CROP_AREA_WIDTH}
//           cropAreaHeight={CROP_AREA_HEIGHT}
//           containerColor="black"
//           areaColor="black"
//           setCropperParams={this.setCropperParams}
//         />
//         <Button onPress={this.handlePress} title="Crop Image" color="blue" />
//         {croppedImage ? (
//           <Image source={src} />
//         ) : null}
//       </View>
//     );
//   }
// }
