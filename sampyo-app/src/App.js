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
import * as Permissions from 'expo-permissions';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fontIsReady: false,
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

    const { status } = await Permissions.getAsync(Permissions.CAMERA);
    if (status !== 'granted') {
      this.setState({ 
        showOnboarding: true
      });
    }

    this.setState({ 
      fontIsReady: true,
    });

  }

  render() {
    const Stack = createStackNavigator();
    const { fontIsReady, showOnboarding } = this.state;
    return (
      // !!fontIsReady &&
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {showOnboarding &&
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
