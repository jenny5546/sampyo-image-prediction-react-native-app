import React, { useState, useEffect } from 'react';
import Header from 'components/Header';
// import ImageManipulator from 'components/ImageManipulator';
import { sendRawImageForCrop } from 'api/api';
import * as FileSystem from 'expo-file-system';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image,  Dimensions } from 'react-native';

const { height, width } = Dimensions.get("window");

const CropperScreen = ({route, navigation}) => {

    const { picture } = route.params;

    const [automaticCropDone, setAutomaticCropDone] = useState(false);

    const sendRawImageToServerForAutoCrop = async (photo) => {
        try {
            let form_data = new FormData();
            const base64 = await FileSystem.readAsStringAsync(photo.uri, { encoding: 'base64' });
            form_data.append("base64_encoded", base64);
            form_data.append("local_file_name", photo.uri);
            await sendRawImageForCrop(form_data);

        } catch(e) {
            console.log(e)
        }
    }

    const handleAutomaticCrop = async () => {
        await sendRawImageToServerForAutoCrop(picture);
        setAutomaticCropDone(true);
    }

    useEffect(()=>{
        // handleAutomaticCrop();
        console.log(picture.uri)
    },[])

    const handleBackButton = () => {
        navigation.goBack();
    }

    const renderResultScreen = () => {
        navigation.navigate('Result',{ picture: picture })
    }

    return (
        <SafeAreaView style={styles.container}>
            {automaticCropDone ?
            
                <View>
                    <Header handleBackButton={handleBackButton} headerTitle="이미지 크롭하기"/>
                    <Text>DONE</Text>
                </View>
                :
                <>
                <Header handleBackButton={handleBackButton} headerTitle="이미지 크롭하기"/>
                <Image source={picture} style={styles.imageStyle} />
                <TouchableOpacity style={styles.buttonStyle} onPress={renderResultScreen}>
                    <Text style={styles.textStyle}>본 이미지로 결과 분석하기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle} onPress={handleBackButton}>
                    <Text style={styles.textStyle}>재촬영</Text>
                </TouchableOpacity>
                </>
            }
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1C1A1B',
        alignItems: 'center',
        height: height,
    },
    imageStyle: { 
        marginTop: 40,
        width: width, 
        height: width,
        // borderRadius: 15,
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
    }
});

export default CropperScreen;
