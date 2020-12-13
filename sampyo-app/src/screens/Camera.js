import React, { useState, useEffect, useRef } from 'react';
import CameraController from 'components/camera/CameraController';
import * as ImagePicker from 'expo-image-picker';
import { Platform, Animated, StatusBar, SafeAreaView, View, Text, StyleSheet, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';

const { height, width } = Dimensions.get("window");

const CameraScreen = ({navigation}) => {

    const fadeAnim = useRef(new Animated.Value(1)).current;
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [picture, setPicture] = useState(null);
    const [showImage, setShowImage] = useState(false);

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 7000,
            useNativeDriver: true
        }).start();
    };

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            await ImagePicker.requestCameraRollPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    useEffect(()=>{
        fadeOut();
    },[]);

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

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Camera style={styles.cameraScreenStyle} type={type} ref={ref => {setCameraRef(ref)}}>
                <Animated.View style={[
                    styles.textContainer,
                    { opacity: fadeAnim }
                ]}>
                    <Text
                        style={styles.textStyle}
                    >
                        화면에 골재의 이미지만 나오도록 촬영해주세요
                    </Text>
                    <View>

                    </View>
                </Animated.View>
            </Camera>
            <CameraController navigation={navigation} takePicture={takePicture} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1,
        backgroundColor: 'white'
    },
    textContainer: {
        backgroundColor: 'transparent',
        flex: 1,
        alignSelf: 'center',
        marginTop: 20,
    },
    textStyle: {
        fontSize: 14,
        letterSpacing: -0.45,
        fontFamily: 'NotoSansKR-Regular',
        color: 'white',
    },
    cameraScreenStyle: {
        width: width,
        height: height -130,
    },
    imageStyle: { 
        marginTop: 10,
        width: 300, 
        height: 300
    }
});


export default CameraScreen;

