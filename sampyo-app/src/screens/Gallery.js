import React, { useState, useEffect } from 'react';
import { SafeAreaView,TouchableOpacity, Text, Image, View, Platform, Dimensions, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Header from 'components/Header';
const { height, width } = Dimensions.get("window");

const GalleryScreen = ({navigation}) => {

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
        navigation.navigate('Camera');
    }

    // const handleBackToHome = () => {
    //     navigation.navigate('Camera')
    // }

    useEffect(()=>{
        if (image!==null) {
            goToImageValidatorScreen();
        }
    },[image])

    const goToImageValidatorScreen = () => {
        const picture = { uri: image };
        navigation.navigate('ImageValidator', { picture: picture })
    }

    const styles = StyleSheet.create({
        container: {
            // backgroundColor: 'pink',
            alignItems: 'center',
            height: height,
        }
    });

    return (
        <SafeAreaView style={styles.container}>
            <Header handleBackButton={handleBackButton} headerTitle="이미지 선택하기"/>
        </SafeAreaView>
    );

    
}



export default GalleryScreen;