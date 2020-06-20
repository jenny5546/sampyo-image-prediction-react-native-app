import React from 'react';
import globalStyles from './styles/globalStyles';
import { SplashScreen } from 'expo';


import {   
  SafeAreaView, 
  ScrollView,
  View, 
  Text,
} from 'react-native';

/* Splash Screen Time */
SplashScreen.preventAutoHide();
setTimeout(SplashScreen.hide, 3000);

export default function App() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={globalStyles.container}>
          <Text>로그인</Text>
        </View>
      </ScrollView>
    </SafeAreaView>   
  );
}

