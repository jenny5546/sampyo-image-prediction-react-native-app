import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import Home from './screens/Home';
import Archive from './screens/Archive';
import About from './screens/About';
import CameraScreen from './screens/Camera';
import ImageCropperScreen from './screens/ImageCropper';
import ImagePickerScreen from './screens/ImagePicker';
import ResultScreen from './screens/Result';

const App = () => {

    const Stack = createStackNavigator();

    SplashScreen.preventAutoHideAsync();
    setTimeout(() => {
        SplashScreen.hideAsync();
    }, 1000);

    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="ImageCropper" component={ImageCropperScreen} />
          <Stack.Screen name="ImagePicker" component={ImagePickerScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
          <Stack.Screen name="Archive" component={Archive} />
          <Stack.Screen name="About" component={About} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default App;
