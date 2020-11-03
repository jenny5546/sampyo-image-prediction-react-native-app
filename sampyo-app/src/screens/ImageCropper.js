import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ImageManipulator from '../components/ImageManipulator';
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
            <TouchableOpacity onPress={renderResultScreen}>
                <Text>결과 보기</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'pink',
        alignItems: 'center',
        height: height,
    },
    imageStyle: { 
        marginTop: 10,
        width: width-20, 
        height: height-200 
    }
});

export default ImageCropperScreen;
