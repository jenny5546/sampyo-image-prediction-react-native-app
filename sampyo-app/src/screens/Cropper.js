import React, { useState, useEffect, useRef } from 'react';
import Header from 'components/Header';
import AnimatedLoader from "react-native-animated-loader";
import { sendRawImageForCrop } from 'api/api';
import * as FileSystem from 'expo-file-system';
import ScalableImageComponent from 'components/ScalableImageComponent';
import ImageCropOverlay from 'components/ImageCropOverlay';
import { Animated, PanResponder, SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image,  Dimensions } from 'react-native';

const { height, width } = Dimensions.get("window");

const CropperScreen = ({route, navigation}) => {

    const { picture } = route.params;

    // const [automaticCropDone, setAutomaticCropDone] = useState(false);
    // const [croppedImage, setCroppedImage] = useState(null);
    const [cropDivX, setCropDivX] = useState(0);
    const [cropDivY, setCropDivY] = useState(0);
    const [cropDivWidth, setCropDivWidth] = useState(0);
    const [cropDivHeight, setCropDivHeight] = useState(0);

    // const responseData  = 
    // {
    //     "AscaledHeight": 1700,
    //     "AscaledWidth": 3000,
    //     "algorithm": "croppola",
    //     "cropHeight": 1700,
    //     "cropWidth": 3000,
    //     "cropX": 387,
    //     "cropY": 345,
    //     "dominantColors": [
    //         {
    //             "b": 56,
    //             "g": 46,
    //             "importance": 0.47,
    //             "r": 43,
    //         },
    //         {
    //             "b": 124,
    //             "g": 133,
    //             "importance": 0.165,
    //             "r": 144,
    //         },
    //         {
    //             "b": 128,
    //             "g": 92,
    //             "importance": 0.089,
    //             "r": 93,
    //         },
    //         {
    //             "b": 98,
    //             "g": 178,
    //             "importance": 0.027,
    //             "r": 229,
    //         },
    //         {
    //             "b": 137,
    //             "g": 221,
    //             "importance": 0.007,
    //             "r": 188,
    //         },
    //         {
    //             "b": 236,
    //             "g": 240,
    //             "importance": 0.242,
    //             "r": 240,
    //         },
    //     ],
    //     "faces": [],
    //     "height": 1700,
    //     "imageHeight": 2376,
    //     "imageWidth": 4110,
    //     "scaledHeight": 1700,
    //     "scaledWidth": 3000,
    //     "token": "64c8a24c490d4d8a8ff1",
    //     "version": 2,
    //     "width": 3000,
    //     "x": 386.613603,
    //     "y": 345.383459,
    // }


    const sendRawImageToServerForAutoCrop = async (photo) => {
        try {
            let form_data = new FormData();
            const base64 = await FileSystem.readAsStringAsync(photo.uri, { encoding: 'base64' });
            form_data.append("base64_encoded", base64);
            form_data.append("local_file_name", photo.uri);
            const res = await sendRawImageForCrop(form_data);
            console.log('json data', res.data)
            // setCroppedImage(res.data.img)

        } catch(e) {
            console.log(e)
        }
    }

    const handleAutomaticCrop = async () => {
        await sendRawImageToServerForAutoCrop(picture);
        // setAutomaticCropDone(true);
    }


    const handleBackButton = () => {
        navigation.goBack();
    }

    const renderResultScreen = () => {
        navigation.navigate('Result',{ picture: picture })
    }

    const styles = StyleSheet.create({
        container: {
            // backgroundColor: '#1C1A1B',
            alignItems: 'center',
            height: height,
        },
        cropContainerStyle: {
            position: "relative",
            height: height-200,
            overflow: 'hidden',
            marginTop: 20,
        },
        imageStyle: {
            
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
        },
        lottie: {
            width: 100,
            height: 100
        }
    });

    const imageContainerHeight = height - 200;
    console.log()

    return (
        <SafeAreaView style={styles.container}>
            {/* {automaticCropDone ?
            
                <View>
                    <Header handleBackButton={handleBackButton} headerTitle="크롭결과"/>
                    <Image source={{uri: `data:image/jpeg;base64,${croppedImage}`}} style={styles.imageStyle} />
                </View>
                :
                <>
                <AnimatedLoader
                    visible={true}
                    overlayColor="rgba(255,255,255,0.75)"
                    source={require("./loader.json")}
                    animationStyle={styles.lottie}
                    speed={1}
                /> */}
                
                <Header handleBackButton={handleBackButton} headerTitle="이미지 크롭하기"/>
                <View style={styles.cropContainerStyle} onLayout={(event) => {
                    var {x, y, width, height} = event.nativeEvent.layout
                    // console.log(x,y,width,height)
                    setCropDivX(x);
                    setCropDivY(y);
                    setCropDivWidth(width);
                    setCropDivHeight(height);
                }}>
                    <ImageCropOverlay 
                        containerHeight = {imageContainerHeight-50}
                        divPosX = {cropDivX}
                        divPosY = {cropDivY}
                        divWidth = {cropDivWidth}
                        divHeight = {cropDivHeight}
                    />
                    <ScalableImageComponent 
                        source = {picture}
                        containerHeight = {imageContainerHeight}
                        style= {styles.imageStyle}
                    />
                </View>
                
                
                {/* <TouchableOpacity style={styles.buttonStyle} onPress={renderResultScreen}>
                    <Text style={styles.textStyle}>본 이미지로 결과 분석하기</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.buttonStyle} onPress={handleBackButton}>
                    <Text style={styles.textStyle}>재촬영</Text>
                </TouchableOpacity>
            
        </SafeAreaView>
    );
}



export default CropperScreen;
