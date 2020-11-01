import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import Logo from '../assets/images/logo.png';
const { height, width } = Dimensions.get("window");

const Header = () => {
    return (
        <View style={styles.header}>
            {/* <Image
                style={styles.logo}
                source={ Logo }
            /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: width,
        height: 40,
    },
    logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    button: {

    }
});

export default Header;
