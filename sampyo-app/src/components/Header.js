import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import backIcon from 'assets/images/back-icon.png';
const { height, width } = Dimensions.get("window");

const Header = ({handleBackButton, headerTitle}) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={handleBackButton} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
                <Image style={styles.backIconStyle} source={ backIcon }/>
            </TouchableOpacity>
            <Text style={styles.titleStyle}>
                {headerTitle}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: width,
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#ddd',
        backgroundColor: 'white',
    },
    backIconStyle: {
        width: 40,
        height: 40,
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
    }
});

export default Header;
