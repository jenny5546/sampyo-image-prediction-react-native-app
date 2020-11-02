import React from 'react';
import Header from './Header';
import NavBar from './NavBar';
import { Platform, TouchableOpacity, StatusBar, SafeAreaView, View, Text, StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get("window");

const ScreenContainer = ({mainScreen, navigation}) => {

    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            {/* <Header /> */}
            {mainScreen}
            <NavBar navigation={navigation} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    AndroidSafeArea: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        alignItems: 'center',
        height: height,
        backgroundColor: 'white'
    }
});

export default ScreenContainer;
