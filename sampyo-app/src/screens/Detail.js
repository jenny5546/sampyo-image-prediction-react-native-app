import React, { useState, useEffect, useRef } from 'react';
import Header from 'components/Header';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image,  Dimensions } from 'react-native';

const { height, width } = Dimensions.get("window");

const DetailScreen = ({route, navigation}) => {

    const { info } = route.params;

    const handleBackButton = () => {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={styles.container}>
                <Header handleBackButton={handleBackButton} headerTitle="디테일"/>
                <View>
                    <Image source={info.source} style={styles.imageStyle} />
                </View>
                <Text>
                    {info.label}
                </Text>
                <Text>
                    {info.created_at}
                </Text>
                <Text>
                    {info.classification}
                </Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#1C1A1B',
        alignItems: 'center',
        height: height,
    },
    imageStyle: { 
        marginTop: 20,
        width: 300,
        height:300
    },
    buttonStyle: {
        marginTop: 30,
        borderRadius: 10,
        width: width-150,
        height: 50,
        backgroundColor: '#404040',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.6,
    },
    textStyle: {
        color: 'white',
        fontSize: 16,
    }
});

export default DetailScreen;
