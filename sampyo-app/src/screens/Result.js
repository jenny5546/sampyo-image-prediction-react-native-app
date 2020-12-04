import React, { useState, useEffect } from 'react';
import Header from 'components/Header';
import AnimatedLoader from "react-native-animated-loader";
import { renderPredictionResult, savePredictionLabel } from 'api/api';
import * as FileSystem from 'expo-file-system';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image,  Dimensions, TextInput } from 'react-native';

const { height, width } = Dimensions.get("window");

const ResultScreen = ({route, navigation}) => {

    const { picture, uriEncoded } = route.params;
    const [loading, setLoading] = useState(true);
    const [predictionResult, setPredictionResult] = useState(null);
    const [predictionId, setPredictionId] = useState(null);
    const [labelInput, setLabelInput] = useState('라벨 ');

    useEffect(()=>{
        handleGetPredictionResult();
    },[])

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
            
            <Header handleBackButton={handleBackButton} headerTitle="분석 결과"/>
            
            <TextInput
                style={styles.inputStyle}
                underlineColorAndroid="transparent"
                placeholder={labelInput}
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                onChangeText={handleLabelInput}
            />
            <TouchableOpacity style={styles.buttonStyle} onPress={handleSaveLabel}>
                <Text style={styles.textStyle}>라벨 저장하기</Text>
            </TouchableOpacity>
            <Image source={picture} style={styles.imageStyle} />
            {loading ?
                <AnimatedLoader
                    visible={loading}
                    overlayColor="rgba(255,255,255,0.75)"
                    source={require("./loader.json")}
                    animationStyle={styles.lottie}
                    speed={1}
                />
                :
                <View>
                    <Text>{predictionResult}</Text>
                </View>
            }
            
            
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
        width: width/2 + 100,
        height: height/2 + 100
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
    buttonStyle: {
        borderRadius: 10,
        width: 100,
        height: 30,
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
});

export default ResultScreen;
