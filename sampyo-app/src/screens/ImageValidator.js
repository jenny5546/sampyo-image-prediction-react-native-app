import React, { useState, useEffect, useRef } from 'react';
import LottieView from 'lottie-react-native';
import { sendRawImageForBrightness } from 'api/api';
import * as FileSystem from 'expo-file-system';
import ScalableImageComponent from 'components/ScalableImageComponent';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image,  Dimensions } from 'react-native';

const { height, width } = Dimensions.get("window");

const ImageValidatorScreen = ({route, navigation}) => {

    const lottieRef = useRef(null);

    useEffect(() => {
        if (lottieRef.current) {
            lottieRef.current.play();
        }
    }, [lottieRef.current]);

    const { picture } = route.params;
    const [imageBrightness, setImageBrightness] = useState(null);

    useEffect(()=>{
        handleGetBrightness();
    },[])

    const sendRawImageToServerForBrightness = async (photo) => {
        try {

            let form_data = new FormData();
            const base64 = await FileSystem.readAsStringAsync(photo.uri, { encoding: 'base64' });
            form_data.append("base64_encoded", base64);
            form_data.append("local_file_name", photo.uri);

            const res = await sendRawImageForBrightness(form_data);
            return res;

        } catch(e) {
            console.log(e)
            return null;
        }
    }

    const handleGetBrightness = async () => {
        const res = await sendRawImageToServerForBrightness(picture);
        if (res) {
            console.log('brihgtness', res.data.brightness)
            setImageBrightness(res.data.brightness);
        }
        else {
            // ERROR HANDLING
        }
    }

    const handleBackButton = () => {
        navigation.goBack();
    }

    const renderResultScreen = () => {
        navigation.navigate('Cropper',{ picture: picture })
    }


    return (
        <SafeAreaView style={styles.container}>
                {/* <Header handleBackButton={handleBackButton} headerTitle="이미지 확인"/> */}
                {/* <View style={styles.titleContainer}>
                    <Text style={styles.titleTextStyle}>선택한 이미지</Text>
                </View> */}
                <ScalableImageComponent 
                    source = {picture}
                    containerWidth = {width}
                    containerHeight = {height}
                    style= {styles.imageStyle}
                />
                {/* <View style={styles .overlay} /> */}
                <View style={styles.popUpContainer}>
                    {imageBrightness===null ?
                        <View style={styles.popUpWrap}>
                            <Text style={styles.waitingText}>명도 적합성 판단 중.. 잠시만 기다리세요</Text>
                            <View style={styles.divider}/>
                            <LottieView
                                ref={lottieRef} 
                                style={{
                                    width: 80,
                                    height: 80,
                                    position: 'absolute',
                                    right: 0,
                                }}
                                source={require('components/animation/snackbar-loading.json')}
                            />
                        </View>
                        :
                    imageBrightness >= 20 ?
                        <View style={styles.popUpWrap}>
                            <Text style={styles.waitingText}>이미지 명도: {imageBrightness.toFixed(2)}</Text>
                            <Text style={styles.passedText}>통과</Text>
                            <View style={styles.divider}/>
                            <LottieView
                                loop={false}
                                ref={lottieRef} 
                                style={{
                                    width: 40,
                                    height: 40,
                                    position: 'absolute',
                                    right: 7,
                                }}
                                source={require('components/animation/snackbar-check.json')}
                            />
                        </View>
                        :
                        <View style={styles.popUpWrap}>
                            <Text style={styles.waitingText}>이미지 명도: {imageBrightness.toFixed(2)}</Text>
                            <Text style={styles.failedText}>실패</Text>
                            <View style={styles.divider}/>
                            <LottieView
                                loop={false}
                                ref={lottieRef} 
                                style={{
                                    width: 40,
                                    height: 40,
                                    position: 'absolute',
                                    right: 7,
                                }}
                                source={require('components/animation/snackbar-failed.json')}
                            />
                        </View>
                    }
                </View>
                {/* {imageBrightness!==null &&
                    <View>
                        <Text style={styles.textStyle}>이미지 명도: {imageBrightness}</Text>
                    </View>
                } */}
                {/* <TouchableOpacity style={styles.buttonStyle} onPress={renderResultScreen}>
                    <Text style={styles.textStyle}>본 이미지 크롭하기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle} onPress={handleBackButton}>
                    <Text style={styles.textStyle}>재촬영</Text>
                </TouchableOpacity> */}
                {/* <NavBar navigation={navigation} active="none"/> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        height: height,
    },
    titleContainer: {
        position: 'absolute',
        top: 30,
        zIndex: 5,
    },
    titleTextStyle: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'NotoSansKR-Light',
        letterSpacing: -1.5,
    },
    imageStyle: { 
        // marginTop: 20,
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
        // color: 'white',
        fontSize: 16,
    },
    overlay: {
        width: width,
        height: height,
        position: 'absolute',
        zIndex: 4,
        backgroundColor: 'black',
        opacity: 0.6,
    },
    popUpContainer: {
        width: width-40,
        height: 80,
        backgroundColor: '#ffffff',
        zIndex: 6,
        position: 'absolute',
        bottom: 25,
        borderRadius: 10,
        shadowColor: "#333333",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 12,
    
    },
    popUpWrap: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative'
        // justifyContent: 'center',
    },
    waitingText: {
        fontFamily: 'NotoSansKR-Medium',
        letterSpacing: -1.5,
        fontSize: 16,
        marginLeft: 20,
    },
    passedText: {
        fontFamily: 'NotoSansKR-Bold',
        letterSpacing: -1.5,
        fontSize: 18,
        marginLeft: 20,
        color: '#76A7ED' //#f35750
    },
    failedText: {
        fontFamily: 'NotoSansKR-Bold',
        letterSpacing: -1.5,
        fontSize: 18,
        marginLeft: 20,
        color: '#f35750'
    },
    divider: {
        height: 80,
        width: 1,
        borderRightWidth: 2,
        borderRightColor: '#dde1e7',
        position: 'absolute',
        right: 80,
    }
});

export default ImageValidatorScreen;
