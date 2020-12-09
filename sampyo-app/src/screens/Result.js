import React, { useState, useEffect, useRef } from 'react';
import Header from 'components/Header';
import LottieView from 'lottie-react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import editIcon from 'assets/images/edit-icon.png';
import homeIcon from 'assets/images/home-thick-icon.png';
import shareIcon from 'assets/images/share-icon.png';
import { renderPredictionResult, savePredictionLabel } from 'api/api';
import * as FileSystem from 'expo-file-system';
import { Animated, SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image,  Dimensions, TextInput } from 'react-native';

const { height, width } = Dimensions.get("window");

const ResultScreen = ({route, navigation}) => {

    const { picture, uriEncoded } = route.params;
    const [loading, setLoading] = useState(true);
    const [predictionResult, setPredictionResult] = useState(null);
    const [predictionId, setPredictionId] = useState(null);
    const [labelInput, setLabelInput] = useState('라벨 ');


    const lottieRef = useRef(null);
    const floatAnim = useRef(new Animated.Value(0)).current;
    const fadeInAnim = useRef(new Animated.Value(0)).current;

    const floatUp = () => {
        Animated.timing(floatAnim, {
            toValue: -50,
            duration: 1000,
            useNativeDriver: true
        }).start();
    };

    const fadeIn = () => {
        Animated.timing(fadeInAnim, {
            toValue: 0.85,
            duration: 1200,
            useNativeDriver: true
        }).start();
    }
    
    useEffect(() => {
        if (lottieRef.current) {
            lottieRef.current.play();
        }
    }, [lottieRef.current]);

    useEffect(()=>{
        handleGetPredictionResult();
    },[])

    useEffect(()=>{
        if (loading!==false) {
            setTimeout(()=>{
                floatUp();
                fadeIn();
            },500)

        }
    },[loading])

    const sendImageToServerForPrediction = async (photo) => {
        try {

            let form_data = new FormData();

            // If uri already encoded, no need to encode just put picture uri 
            const base64 = uriEncoded ? photo.uri : await FileSystem.readAsStringAsync(photo.uri, { encoding: 'base64' });
            form_data.append("base64_encoded", base64);
            form_data.append("local_file_name", photo.uri.slice(0,12));

            const res = await renderPredictionResult(form_data);
            return res;

        } catch(e) {
            console.log(e)
            return null;
        }
    }

    const handleGetPredictionResult = async () => {
        const res = await sendImageToServerForPrediction(picture);
        if (res) {
            setPredictionResult(res.data.classification);
            setPredictionId(res.data.result_id);
            setLoading(false);
        }
        else {
            // ERROR HANDLING
        }
    }

    const handleBackButton = () => {
        navigation.goBack();
    }

    const handleHomeButton = () => {
        navigation.navigate('Camera');
    }

    const handleLabelInput = (text) => {
        setLabelInput(text);
    }

    const handleSaveLabel = async () => {
        let form_data = new FormData();
        form_data.append("prediction_id", predictionId);
        form_data.append("label", labelInput);
        await savePredictionLabel(form_data);
    }

    return (
        <SafeAreaView style={styles.container}>
            
            <Header handleBackButton={handleBackButton} handleHomeButton={handleHomeButton} headerTitle="분석 결과"/>
            
            {/* <TextInput
                style={styles.inputStyle}
                underlineColorAndroid="transparent"
                placeholder={labelInput}
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                onChangeText={handleLabelInput}
            />
            <TouchableOpacity style={styles.buttonStyle} onPress={handleSaveLabel}>
                <Text style={styles.buttonTextStyle}>라벨 저장하기</Text>
            </TouchableOpacity> */}
            {/* <Image source={picture} style={styles.imageStyle} /> */}
            <AutoHeightImage
                style= {styles.imageStyle}
                source={picture}
                resizeMode={'contain'}
                width={width}
                height={height}
            />
            <Animated.View 
                style={[
                    styles.popUpContainer,
                    { transform: [{ translateY: floatAnim }] },
                ]}
            >
                {predictionResult === null ?

                <View style={styles.popUpWrap}>
                    <Text style={styles.waitingText}>토분 품질 측정 중.. 잠시만 기다리세요</Text>
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
                predictionResult === 0 ? 
                <View style={styles.popUpWrap}>
                    <Text style={styles.waitingText}>토분 분석 결과:  0</Text>
                    <Text style={styles.passedText}>적합</Text>
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
                (predictionResult===1) ?
                <View style={styles.popUpWrap}>
                    <Text style={styles.waitingText}>토분 분석 결과: 0과 100 사이</Text>
                    <Text style={styles.dangerousText}>위험</Text>
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
                        source={require('components/animation/snackbar-danger.json')}
                    />
                </View>
                :
                <View style={styles.popUpWrap}>
                    <Text style={styles.waitingText}>토분 분석 결과: 100 이상</Text>
                    <Text style={styles.failedText}>부적합</Text>
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
            </Animated.View>
            <Animated.View 
                style={[
                    styles.buttonContainer,
                    { opacity: fadeInAnim },
                ]}
            >
                <TouchableOpacity style={[styles.buttonStyle]}>
                    <Image style={styles.iconStyle} source={ homeIcon }/>
                    <Text style={styles.buttonTextStyle}>홈으로</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonStyle]}>
                    <Image style={styles.iconStyle} source={ editIcon }/>
                    <Text style={styles.buttonTextStyle}>라벨 달기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonStyle, { borderRightWidth: 0 }]}>
                    <Image style={styles.iconStyle} source={ shareIcon }/>
                    <Text style={styles.buttonTextStyle}>공유하기</Text>
                </TouchableOpacity>
                
            </Animated.View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        height: height,
    },
    imageStyle: { 
        // marginTop: 10,
        // width: width/2 + 100,
        // height: height/2 + 100
    },
    lottie: {
        width: 100,
        height: 100
    },
    inputStyle: {
        margin: 15,
        height: 40,
        borderColor: "#7a42f4",
        borderWidth: 1
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
        color: '#76A7ED'
    },
    dangerousText: {
        fontFamily: 'NotoSansKR-Bold',
        letterSpacing: -1.5,
        fontSize: 18,
        marginLeft: 20,
        color: '#db6400'
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
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 15,
        width: width-40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#f8f8f8',
        height: 50,
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 12,
        
    },
    buttonStyle: {
        width: (width-40)/3,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: 'black',
        flexDirection:'row',
        
    },
    buttonTextStyle: {
        // color: 'white',
        fontSize: 14,
        fontFamily: 'NotoSansKR-Bold',
    },
    iconStyle: {
        width: 15,
        height: 15,
        marginRight: 5,
        marginLeft: -10,
    }
});

export default ResultScreen;
