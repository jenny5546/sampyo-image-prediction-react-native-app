import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import NavBar from '../components/navbar/NavBar';
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

const ArchiveScreen = ({navigation}) => {
    return (
        <View>
            <View style={styles.container}>
                <Text>
                    Archive Body
                </Text>
            </View>
            <NavBar navigation={navigation} />
        </View>
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

export default ArchiveScreen;
