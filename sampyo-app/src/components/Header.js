import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import backIcon from 'assets/images/back-icon.png';
import homeIcon from 'assets/images/home-icon.png';
const { height, width } = Dimensions.get("window");

const Header = ({handleBackButton, handleHomeButton, headerTitle}) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={handleBackButton} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
                <Image style={styles.backIconStyle} source={ backIcon }/>
            </TouchableOpacity>
            <Text style={styles.titleStyle}>
                {headerTitle}
            </Text>
            <TouchableOpacity onPress={handleHomeButton} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
                <Image style={styles.homeIconStyle} source={ homeIcon }/>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: width,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 2,
        borderBottomColor: '#ddd',
        backgroundColor: 'white',
        zIndex: 3,
    },
    backIconStyle: {
        width: 20,
        height: 20,
        marginLeft: 10,
        padding: 10
    },
    textStyle: {
        fontSize: 13,
    },
    titleStyle: {
        position: 'absolute',
        width: width,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'NotoSansKR-Medium',
        letterSpacing: -0.4,
    },
    homeIconStyle: {
        width: 20,
        height: 20,
        marginRight: 10,
        padding: 10
    }
});

export default Header;
