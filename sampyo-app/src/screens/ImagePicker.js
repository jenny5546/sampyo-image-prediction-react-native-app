import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
const { height, width } = Dimensions.get("window");

export default function ImagePickerScreen() {
    const [image, setImage] = useState(null);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 9],
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

    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* <Button title="Pick an image from camera roll" onPress={pickImage} /> */}
        {image && <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />}
    </View>
    );
}