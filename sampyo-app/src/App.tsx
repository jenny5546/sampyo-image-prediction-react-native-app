// import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

const App = () => {
    /* Splash 3초 지속 */
    SplashScreen.preventAutoHideAsync();
    setTimeout(() => {
        SplashScreen.hideAsync();
    }, 3000);

    return (
        <SafeAreaView style={styles.container}>
            <Text>
              hi
            </Text>
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

export default App;
