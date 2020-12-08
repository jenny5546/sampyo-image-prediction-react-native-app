import React, { useState, useEffect, useRef } from 'react';
import Header from 'components/Header';
import AnimatedLoader from "react-native-animated-loader";
import LottieView from 'lottie-react-native';
import { sendImageForAutoCrop } from 'api/api';
import AutoHeightImage from 'react-native-auto-height-image'
import { ImageManipulator } from 'expo-image-crop'
import searchIcon from 'assets/images/search-icon.png';
import cropIcon from 'assets/images/crop-icon.png';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';

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
        if (lottieRef.current) {
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
                            <Text style={styles.cropBtnTextStyle}>{ customCropMode ? '다시 크롭하기':'직접 크롭하기'}</Text>
                            <Image source={cropIcon} style={styles.cropIcon}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonStyle} onPress={renderResultScreen}>
                            <Text style={styles.resultBtnTextStyle}>결과 확인하기</Text>
                            <Image source={searchIcon} style={styles.searchIcon}></Image>
                        </TouchableOpacity>
                    </View>
                    
                </>
                :
                <>
                    <Header handleBackButton={handleBackButton} headerTitle="이미지 크롭하기"/>
                    <View style={styles.overlay} />
                    <View style={styles.lottieContainer}>
                        <LottieView
                            ref={lottieRef} 
                            style={styles.lottie}
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
        alignItems: 'center',
        position: 'relative',
        height: height,
        backgroundColor: 'white',
    },
    imageStyle: {
        // backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: width/2,
        borderRightWidth: 2,
        height: 80,
        borderRightColor: '#969aa2',
        flexDirection: 'row',
    },
    cropBtnTextStyle: {
        fontFamily: 'NotoSansKR-Regular',
        fontSize: 16,
        marginRight: 5,
        color: '#52565d',
        fontSize: 16,
    },
    resultBtnTextStyle: {
        fontFamily: 'NotoSansKR-Bold',
        fontSize: 16,
        marginRight: 5,
        color: '#4C6A91',
        fontSize: 16,
    },
    lottieContainer: {
        width: width,
        height: height-60,
        top: 60,
        position: 'absolute',
        zIndex: 99,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lottie: {
        width: 100,
        height: 100,
        marginTop: -20,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: width,
        position: 'absolute',
        bottom: 0,
        height: 80,
        backgroundColor: '#eef1f4',
        borderTopColor: '#969aa2',
        borderTopWidth: 1,
    },
    overlay: {
        width: width,
        height: height,
        top: 0,
        position: 'absolute',
        zIndex: 98,
        backgroundColor: 'black',
        opacity: 0.6,
    },
    searchIcon: {
        opacity: 0.5,
    },
    cropIcon: {
        opacity: 0.5,
    }
});


export default CropperScreen;
