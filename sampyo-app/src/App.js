import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import CameraScreen from 'screens/Camera';
import OnboardingScreen from 'screens/Onboarding';
import ArchiveScreen from 'screens/Archive';
import CropperScreen from 'screens/Cropper';
import GalleryScreen from 'screens/Gallery';
import ResultScreen from 'screens/Result';
import ImageValidatorScreen from 'screens/ImageValidator';
import DetailScreen from './screens/Detail';


const App = () => {

    const Stack = createStackNavigator();

    // SplashScreen.preventAutoHideAsync();
    // setTimeout(() => {
    //     SplashScreen.hideAsync();
    // }, 3000);

    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
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

export default App;