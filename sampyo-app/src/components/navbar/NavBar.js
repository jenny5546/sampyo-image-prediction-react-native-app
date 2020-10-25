import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const { height, width } = Dimensions.get("window");

const NavBar = ({navigation}) => {
    return (
        <View style={styles.footer}>
            <TouchableOpacity  onPress={() => navigation.navigate('Home')}>
                <Text>Home Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Archive')}>
                <Text>Archive Menu</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    button: {

    }
});

export default NavBar;
