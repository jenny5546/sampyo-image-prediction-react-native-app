import React, { useState, useEffect, useRef } from 'react';
import Header from 'components/Header';
import ScalableImageComponent from 'components/ScalableImageComponent';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image,  Dimensions } from 'react-native';

const { height, width } = Dimensions.get("window");

const ImageValidatorScreen = ({route, navigation}) => {

    const { picture } = route.params;

    const handleBackButton = () => {
        // navigation.goBack();
        navigation.navigate('Camera');
    }

    const renderResultScreen = () => {
        navigation.navigate('Cropper',{ picture: picture })
    }


    return (
        <SafeAreaView style={styles.container}>
                <Header handleBackButton={handleBackButton} headerTitle="이미지 확인"/>
                <ScalableImageComponent 
                    source = {picture}
                    containerWidth = {width}
                    containerHeight = {height-300}
                    style= {styles.imageStyle}
                />
                <TouchableOpacity style={styles.buttonStyle} onPress={renderResultScreen}>
                    <Text style={styles.textStyle}>본 이미지 크롭하기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle} onPress={handleBackButton}>
                    <Text style={styles.textStyle}>재촬영</Text>
                </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1C1A1B',
        alignItems: 'center',
        height: height,
    },
    imageStyle: { 
        marginTop: 20,
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

export default ImageValidatorScreen;
