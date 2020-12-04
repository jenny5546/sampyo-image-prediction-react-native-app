import React, { useState, useEffect } from 'react';
import Header from 'components/Header';
import AnimatedLoader from "react-native-animated-loader";
import { sendImageForAutoCrop } from 'api/api';
import ScalableImageComponent from 'components/ScalableImageComponent';
import { ImageManipulator } from 'expo-image-crop'
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get("window");

const CropperScreen = ({route, navigation}) => {


    const originalPicture = route.params.picture;

    const [autoCropDone, setAutoCropDone] = useState(false);
    const [autoCroppedImage, setAutoCroppedImage] = useState(null);

    const [customCropMode, setCustomCropMode] = useState(false);
    const [openCustomCropModal, setOpenCustomCropModal] = useState(false);
    const [customCroppedImage, setCustomCroppedImage] = useState(null);
    const [finalCroppedImage, setFinalCroppedImage] = useState(originalPicture);


    /* 1. Auto Crop Handlers */
    useEffect(()=>{
        handleAutomaticCrop();
    },[])

    const sendRawImageToServerForAutoCrop = async (photo) => {
        try {
            let form_data = new FormData();
            form_data.append("local_file_name", photo.uri);

            const res = await sendImageForAutoCrop(form_data);
            return res;

        } catch(e) {
            console.log(e)
            return null;
        }
    }

    const handleAutomaticCrop = async () => {
        const res = await sendRawImageToServerForAutoCrop(originalPicture);
        if (res) {
            setAutoCroppedImage({uri: `data:image/jpeg;base64,${res.data.img}`});
            setAutoCropDone(true);
            setFinalCroppedImage({uri: `data:image/jpeg;base64,${res.data.img}`});
        }
        else {
            // ERROR HANDLING
        }
    }

    /* 2. Custom Crop Handlers */
    const handleOpenCustomCropModal = () => {
        
        setOpenCustomCropModal(true);
    }

    const handleCloseCustomCrop = () => {
        setOpenCustomCropModal(false);
    }

    const finishCustomCrop = (uriM) => {
        setCustomCroppedImage({ uri: uriM });
        setCustomCropMode(true);
        setFinalCroppedImage({ uri: uriM });
        handleCloseCustomCrop();
    }

    /* 3. UI Handlers */
    const handleBackButton = () => {
        navigation.goBack();
    }

    const renderResultScreen = () => {
        navigation.navigate('Result',{ picture: finalCroppedImage, uriEncoded: !customCropMode }) // Send final cropped img to render result
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

    const onToggleModal = () => {
        console.log('toggle');
    }

    const imageContainerWidth = width - 50;
    const imageContainerHeight = height - 200;


    return (
        <SafeAreaView style={styles.container}>
            {autoCropDone ?
                <>
                    <Header handleBackButton={handleBackButton} headerTitle="크롭결과"/>

                    {customCropMode ?
                        <ScalableImageComponent 
                            source={customCroppedImage}
                            containerWidth = {imageContainerWidth}
                            containerHeight = {imageContainerHeight}
                            style= {styles.imageStyle}
                        />
                        :
                        <ScalableImageComponent 
                            source={autoCroppedImage}
                            containerWidth = {imageContainerWidth}
                            containerHeight = {imageContainerHeight}
                            style= {styles.imageStyle}
                        />
                    }
                    {openCustomCropModal &&
                        <ImageManipulator
                            photo={originalPicture}
                            isVisible={true}
                            onPictureChoosed={(uriM) => finishCustomCrop(uriM)}
                            onToggleModal={onToggleModal}
                            allowFlip={false}
                            allowRotate={false}
                            fixedMask={{width: 255, height: 450}}
                        />
                    }
                    
                    <TouchableOpacity style={styles.buttonStyle} onPress={handleOpenCustomCropModal}>
                        <Text style={styles.textStyle}>{ customCropMode ? '다시 크롭하기':'직접 크롭하기'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} onPress={renderResultScreen}>
                        <Text style={styles.textStyle}>결과 확인하기</Text>
                    </TouchableOpacity>
                </>
                :
                <>
                    <Header handleBackButton={handleBackButton} headerTitle="이미지 크롭하기"/>
                    <AnimatedLoader
                        visible={true}
                        overlayColor="rgba(255,255,255,0.75)"
                        source={require("./loader.json")}
                        animationStyle={styles.lottie}
                        speed={1}
                    /> 
                    <ScalableImageComponent 
                        source = {originalPicture}
                        containerWidth = {imageContainerWidth}
                        containerHeight = {imageContainerHeight}
                        style= {styles.imageStyle}
                    />
                </>
                }
            
        </SafeAreaView>
    );
}



export default CropperScreen;
