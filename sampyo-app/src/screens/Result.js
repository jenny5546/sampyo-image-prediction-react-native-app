import React, { useState, useEffect } from 'react';
import Header from 'components/Header';
import AnimatedLoader from "react-native-animated-loader";
import { renderPredictionResult } from 'api/api';
import * as FileSystem from 'expo-file-system';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image,  Dimensions } from 'react-native';

const { height, width } = Dimensions.get("window");

const ResultScreen = ({route, navigation}) => {

    const { picture, uriEncoded } = route.params;
    const [loading, setLoading] = useState(true);
    const [predictionResult, setPredictionResult] = useState(null);

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
            console.log('classification', res.data.classification)
            setPredictionResult(res.data.classification);
            setLoading(false);
        }
        else {
            // ERROR HANDLING
        }
    }

    const handleBackButton = () => {
        navigation.navigate('Camera');
    }

    return (
        <SafeAreaView style={styles.container}>
            
            <Header handleBackButton={handleBackButton} headerTitle="분석 결과"/>
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
    }
});

export default ResultScreen;
