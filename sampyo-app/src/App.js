import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import CameraScreen from './screens/Camera';
import About from './screens/About';
import ArchiveScreen from './screens/Archive';
import ImageCropperScreen from './screens/ImageCropper';
import ImagePickerScreen from './screens/ImagePicker';
import ResultScreen from './screens/Result';


const App = () => {

    const Stack = createStackNavigator();

    SplashScreen.preventAutoHideAsync();
    setTimeout(() => {
        SplashScreen.hideAsync();
    }, 3000);

    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Camera" component={CameraScreen} />
          <Stack.Screen name="ImagePicker" component={ImagePickerScreen} options={{animationEnabled: false}}/>
          <Stack.Screen name="Archive" component={ArchiveScreen} />
          <Stack.Screen name="ImageCropper" component={ImageCropperScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
          <Stack.Screen name="About" component={About} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default App;
