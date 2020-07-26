// import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import OnBoardingScreen from "./scenes/onboarding/OnBoardingScreen";
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

export default function App() {
    /* Splash 3초 지속 */
    SplashScreen.preventAutoHideAsync();
    setTimeout(() => {
        SplashScreen.hideAsync();
    }, 3000);

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <OnBoardingScreen/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
