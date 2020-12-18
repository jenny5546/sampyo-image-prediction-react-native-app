import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView,TouchableOpacity, Image, StatusBar, Text, View, Platform, Dimensions, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import NavBar from 'components/common/NavBar';
import MainScreenHeader from 'components/common/MainScreenHeader';
import * as Permissions from 'expo-permissions';
const { height, width } = Dimensions.get("window");

const GalleryScreen = ({navigation}) => {
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
            if (Platform.OS === 'ios') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                if (status !== 'granted') {
                    alert('사진첩 접근 권한 허용을 하지 않으면 어플리케이션을 사용할 수 없습니다.');
                }

                else if (status === 'granted') {
                    // setTimeout(()=>{
                    //     pickImage();
                    // },1000)
                    pickImage();
                }
            }
            else if (Platform.OS === 'android') {
                pickImage();
            }
        })();
    }, []);

    const handleBackButton = () => {
        navigation.navigate('Camera');
    }


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
                <Image 
                    source={require('components/animation/gallery.gif')}
                    style={styles.lottieAnimation}
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
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    lottieContainer: {
        marginTop: 60,
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
        textAlign: 'center',
        lineHeight:20,
    },
    subInfoTextStyle: {
        fontFamily: 'NotoSansKR-Regular',
        letterSpacing: -1.5,
        fontSize: 14,
        textAlign: 'center',
        color: 'rgba(0, 0, 0, 0.42)',
        lineHeight:20,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: height/5,
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
        lineHeight: 25,
    },
    backButtonText: {
        fontFamily: 'NotoSansKR-Regular',
        letterSpacing: -1.5,
        fontSize: 17,
        textAlign: 'center',
        color: '#858C93',
        lineHeight: 25,
    }
});


export default GalleryScreen;