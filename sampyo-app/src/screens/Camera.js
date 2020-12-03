import React, { useState, useEffect, useRef } from 'react';
import NavBar from 'components/NavBar';

import { Platform, TouchableOpacity, Image, StatusBar, SafeAreaView, View, Text, StyleSheet, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';

const { height, width } = Dimensions.get("window");

const CameraScreen = ({navigation}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [showText, setShowText] = useState(true);
    const [cameraRef, setCameraRef] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [picture, setPicture] = useState(null);
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
        const interval = setInterval(() => {
            setShowText((showText) => !showText);
        }, 1000);
        return () => clearInterval(interval);
    }, []);


    const takePicture = async () => {
        if (cameraRef) {
            let photo = await cameraRef.takePictureAsync();
            setShowImage(true);
            setPicture(photo);
        }
    }

    const goToImageValidatorScreen = () => {
        navigation.navigate('ImageValidator', { picture: picture })
    }

    useEffect(()=>{
        if (picture!==null) {
            goToImageValidatorScreen();
        }
    },[picture])

    
    // const handleBackButton = () => {
    //     setShowImage(false);
    //     setPicture(null);
    // }

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Camera style={styles.cameraScreenStyle} type={type} ref={ref => {setCameraRef(ref)}}>
                <View style={styles.textContainer}>
                    <Text
                        style={[
                            styles.textStyle,
                            {opacity: showText ? 1 : 0.1}
                        ]}
                    >
                        화면에 골재의 이미지만 나오도록 촬영해주세요
                    </Text>
                </View>
            </Camera>
            <NavBar navigation={navigation} takePicture={takePicture} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1,
    },
    textContainer: {
        backgroundColor: 'transparent',
        flex: 1,
        alignSelf: 'center',
        marginTop: 20,
    },
    textStyle: {
        fontSize: 16,
        fontWeight: '100', 
        marginBottom: 10, 
        color: 'white',
        opacity: 0.6,
    },
    cameraScreenStyle: {
        // flex: 1
        width: width,
        height: height -130,
        // height: 300,
    },
    imageStyle: { 
        marginTop: 10,
        width: 300, 
        height: 300
    }
});


export default CameraScreen;

