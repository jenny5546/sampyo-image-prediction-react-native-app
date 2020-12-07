import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView,TouchableOpacity, Text, Image, View, Platform, Dimensions, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import LottieView from 'lottie-react-native';
import NavBar from 'components/common/NavBar';
import MainScreenHeader from 'components/common/MainScreenHeader';
const { height, width } = Dimensions.get("window");

const GalleryScreen = ({navigation}) => {

    const lottieRef = useRef(null);
    const [image, setImage] = useState(null);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            quality: 1,
        });

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

    useEffect(() => {
        if (lottieRef) {
            lottieRef.current.play();
        }
    }, []);

    useEffect(()=>{
        if (image!==null) {
            goToImageValidatorScreen();
        }
    },[image])

    const goToImageValidatorScreen = () => {
        const picture = { uri: image };
        navigation.navigate('ImageValidator', { picture: picture })
    }



    return (
        <SafeAreaView style={styles.container}>
            <MainScreenHeader title_1="갤러리에서" title_2="골재 이미지 선택" />
            <View style={styles.lottieContainer}>
                <LottieView
                    ref={lottieRef} 
                    style={styles.lottieAnimation}
                    source={require('components/animation/gallery.json')}
                />
            </View>
            
            <View style={styles.textContainer}>
                <Text style={styles.infoTextStyle}> 분석할 이미지를 갤러리에서 선택해주세요 </Text>
                <Text style={styles.subInfoTextStyle}>(jpg ,  png 형식 지원)</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonWrapper} onPress={pickImage}>
                    <Text style={styles.galleryButtonText}>갤러리로 이동</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonWrapper} onPress={handleBackButton}>
                    <Text style={styles.backButtonText}>카메라로 돌아가기</Text>
                </TouchableOpacity>
            </View>
            <NavBar navigation={navigation} active="gallery"/>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        height: height,
        flex: 1,
    },
    lottieContainer: {
        marginTop: 90,
    },
    lottieAnimation: {
        width: 150,
        height: 150,
    },
    textContainer: {
        marginTop: 20,
    },
    infoTextStyle: {
        fontFamily: 'NotoSansKR-Regular',
        letterSpacing: -1.5,
        fontSize: 16,
        textAlign: 'center'
    },
    subInfoTextStyle: {
        fontFamily: 'NotoSansKR-Regular',
        letterSpacing: -1.5,
        fontSize: 14,
        textAlign: 'center',
        color: 'rgba(0, 0, 0, 0.42)',
    },
    buttonContainer: {
        marginTop: 80,
    },
    buttonWrapper: {
        marginBottom: 10,
    },
    galleryButtonText: {
        fontFamily: 'NotoSansKR-Medium',
        letterSpacing: -1.5,
        fontSize: 17,
        textAlign: 'center',
        color: '#3C75AA',
    },
    backButtonText: {
        fontFamily: 'NotoSansKR-Regular',
        letterSpacing: -1.5,
        fontSize: 17,
        textAlign: 'center',
        color: '#858C93'
    }
});


export default GalleryScreen;