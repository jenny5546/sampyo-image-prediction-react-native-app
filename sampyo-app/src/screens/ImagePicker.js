import React, { useState, useEffect } from 'react';
import { SafeAreaView,TouchableOpacity, Text, Image, View, Platform, Dimensions, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Header from '../components/Header';
const { height, width } = Dimensions.get("window");

const ImagePickerScreen = ({navigation}) => {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [9,16],
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
        // navigation.navigate('Camera')
        pickImage();
    }

    const renderResultScreen = () => {
        const picture = { uri: image };
        navigation.navigate('Result', { picture: picture })
    }

    return (
        <SafeAreaView style={styles.container}>
            {image && 
                <>
                    <Header handleBackButton={handleBackButton} headerTitle="선택한 이미지"/>
                    <Image 
                        source={{ uri: image }} 
                        style={styles.imageStyle} 
                    />
                    <TouchableOpacity onPress={renderResultScreen}>
                        <Text>결과 보기</Text>
                    </TouchableOpacity>
                </>
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
        width: width-20, 
        height: height-200 
    }
});

export default ImagePickerScreen;