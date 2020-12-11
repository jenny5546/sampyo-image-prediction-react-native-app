import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import CameraScreen from 'screens/Camera';
import OnboardingScreen from 'screens/Onboarding';
import ArchiveScreen from 'screens/Archive';
import CropperScreen from 'screens/Cropper';
import GalleryScreen from 'screens/Gallery';
import ResultScreen from 'screens/Result';
import ImageValidatorScreen from 'screens/ImageValidator';
import DetailScreen from './screens/Detail';

import { Camera } from 'expo-camera';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      showOnboarding: null,
    };
  }


  async componentDidMount() {

    SplashScreen.preventAutoHideAsync();
    setTimeout(() => {
        SplashScreen.hideAsync();
    }, 3000);

    await Font.loadAsync({
        'NotoSansKR-Thin': require('assets/fonts/NotoSansKR-Thin.otf'),
        'NotoSansKR-Black': require('assets/fonts/NotoSansKR-Black.otf'),
        'NotoSansKR-Light': require('assets/fonts/NotoSansKR-Light.otf'),
        'NotoSansKR-Medium': require('assets/fonts/NotoSansKR-Medium.otf'),
        'NotoSansKR-Regular': require('assets/fonts/NotoSansKR-Regular.otf'),
        'NotoSansKR-Bold': require('assets/fonts/NotoSansKR-Bold.otf'),
    });

    const { status } = await Camera.requestPermissionsAsync();

    this.setState({ 
      isReady: true ,
      showOnboarding: status === 'granted',
    });

  }

  render() {
    const Stack = createStackNavigator();
    const { isReady, showOnboarding } = this.state;
    return (
      isReady &&
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {showOnboarding === null &&
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          }
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="Gallery" component={GalleryScreen} options={{animationEnabled: false}}/>
          <Stack.Screen name="Archive" component={ArchiveScreen} />
          <Stack.Screen name="Cropper" component={CropperScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="ImageValidator" component={ImageValidatorScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
