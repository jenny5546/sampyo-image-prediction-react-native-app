import React, { useState, useEffect } from 'react';
import { SafeAreaView,TouchableOpacity, Text, Image, View, Platform, Dimensions, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Header from 'components/Header';
const { height, width } = Dimensions.get("window");

const ImagePickerScreen = ({navigation}) => {

    const [image, setImage] = useState(null);
    const [imageWidth, setImageWidth] = useState(600);
    const [imageHeight, setImageHeight] = useState(600);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [1,1],
            quality: 1,
        });

        setImageWidth(result.width);
        setImageHeight(result.height);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
        pickImage();
    }, []);

    const handleBackButton = () => {
        pickImage();
    }

    const handleBackToHome = () => {
        navigation.navigate('Camera')
    }

    const renderResultScreen = () => {
        const picture = { uri: image };
        navigation.navigate('Result', { picture: picture })
    }

    const styles = StyleSheet.create({
        container: {
            // backgroundColor: 'pink',
            alignItems: 'center',
            height: height,
        },
        imageStyle: { 
            marginTop: 10,
            width: imageWidth/8, 
            height: imageHeight/8
        }
    });

    return (
        <SafeAreaView style={styles.container}>
            <Header handleBackButton={handleBackButton} headerTitle="이미지 크롭하기"/>
            {image && 
                <>
                    <Image 
                        source={{ uri: image }} 
                        style={styles.imageStyle} 
                    />
                    <TouchableOpacity onPress={renderResultScreen}>
                        <Text>결과 보기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleBackToHome}>
                        <Text>돌아가기</Text>
                    </TouchableOpacity>
                </>
            }
        </SafeAreaView>
    );

    
}



export default ImagePickerScreen;