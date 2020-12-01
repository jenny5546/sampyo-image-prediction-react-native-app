import React, { useState, useEffect } from 'react';
import Header from 'components/Header';
import ImageManipulator from 'components/ImageManipulator';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image,  Dimensions } from 'react-native';

const { height, width } = Dimensions.get("window");

const ImageCropperScreen = ({navigation, handleBackButton, picture}) => {
    // const [isVisible, setIsVisible] = useState(false);

    // const onToggleModal = () => {
    //     setIsVisible((visibility)=>!visibility);
    // }
    const renderResultScreen = () => {
        navigation.navigate('Result',{ picture: picture })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header handleBackButton={handleBackButton} headerTitle="이미지 크롭하기"/>
            <Image source={picture} style={styles.imageStyle} />
            <TouchableOpacity style={styles.buttonStyle} onPress={renderResultScreen}>
                <Text style={styles.textStyle}>본 이미지로 결과 분석하기</Text>
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
        marginTop: 40,
        width: width, 
        height: width,
        // borderRadius: 15,
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

export default ImageCropperScreen;
