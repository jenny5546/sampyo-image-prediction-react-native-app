import React, { useState, useEffect, useRef } from 'react';
import Header from 'components/Header';
import AnimatedLoader from "react-native-animated-loader";
import LottieView from 'lottie-react-native';
import { sendImageForAutoCrop } from 'api/api';
import AutoHeightImage from 'react-native-auto-height-image'
import ScalableImageComponent from 'components/image/ScalableImageComponent';
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

    const lottieRef = useRef(null);

    useEffect(() => {
        if (lottieRef) {
            lottieRef.current.play();
        }
    }, []);


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

    const onToggleModal = () => {
        console.log('toggle');
    }

    const imageContainerHeight = height-120;


    return (
        <SafeAreaView style={styles.container}>
            {autoCropDone ?
                <>
                    <Header handleBackButton={handleBackButton} headerTitle="크롭 결과 확인"/>
                    {customCropMode ?
                        <AutoHeightImage
                            style= {styles.imageStyle}
                            source={customCroppedImage}
                            resizeMode={'contain'}
                            width={width}
                            height={imageContainerHeight-40}
                        />
                        :
                        <AutoHeightImage
                            style= {styles.imageStyle}
                            source={autoCroppedImage}
                            resizeMode={'contain'}
                            width={width}
                            height={imageContainerHeight-40}
                        />
                    }
                    {openCustomCropModal &&
                        <ImageManipulator
                            photo={originalPicture}
                            isVisible={true}
                            onPictureChoosed={(uriM) => finishCustomCrop(uriM)}
                            onToggleModal={onToggleModal}
                            closeModal={handleCloseCustomCrop}
                            allowFlip={false}
                            allowRotate={false}
                            fixedMask={{width: 255, height: 450}}
                        />
                    }
                    
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonStyle} onPress={handleOpenCustomCropModal}>
                            <Text style={styles.textStyle}>{ customCropMode ? '다시 크롭하기':'직접 크롭하기'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonStyle} onPress={renderResultScreen}>
                            <Text style={styles.textStyle}>결과 확인하기</Text>
                        </TouchableOpacity>
                    </View>
                    
                </>
                :
                <>
                    <Header handleBackButton={handleBackButton} headerTitle="이미지 크롭하기"/>
                    <View style={styles.overlay}>
                        <LottieView
                            ref={lottieRef} 
                            style={{
                                width: 100,
                                height: 100,
                            }}
                            source={require('components/animation/loading.json')}
                        />
                    </View>
                    
                    <AutoHeightImage
                        style= {styles.imageStyle}
                        source={originalPicture}
                        resizeMode={'contain'}
                        width={width}
                        height={imageContainerHeight}
                    />
                </>
                }
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        height: height,
    },
    imageStyle: {
        // backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyle: {
        borderRadius: 10,
        // width: width-150,
        // height: 50,
        // backgroundColor: '#404040',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        // color: 'white',
        fontSize: 16,
    },
    lottie: {
        width: 100,
        height: 100
    },
    buttonContainer: {
        flexDirection: 'row',
        backgroundColor: 'grey',
        width: width,
        position: 'absolute',
        bottom: 0,
        height: 40,
    },
    overlay: {
        width: width,
        height: height-60,
        top: 60,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99,
        backgroundColor: 'rgb(255,255,255)',
        opacity: 0.7,

    }
});


export default CropperScreen;
