import React, { useState } from 'react';
import { View, Image, TouchableOpacity, TouchableHighlight, Text, StyleSheet, Dimensions } from 'react-native';
import galleryIcon from 'assets/images/gallery-icon.png';
import cameraIcon from 'assets/images/camera-icon.png';
import archiveIcon from 'assets/images/archive-icon.png';
const { height, width } = Dimensions.get("window");

const CameraController = ({navigation, takePicture}) => {

    const [clickedGalleryButton, setClickedGalleryButton] = useState(false);
    const [clickedArchiveButton, setClickedArchiveButton] = useState(false);

    const handleClickGallery = () => {
        setClickedGalleryButton(true);
        navigation.navigate('Gallery');
    }
    const handleClickCamera = () => {
        takePicture();
    }
    const handleClickArchive = () => {
        setClickedArchiveButton(true);
        navigation.navigate('Archive');
    }

    return (
        <View style={styles.footer}>
            <TouchableHighlight 
                style={[styles.buttonContainer, clickedGalleryButton ? { backgroundColor: '#f6f8fa'}:{ backgroundColor: 'white' }]} 
                onPress={handleClickGallery}
                underlayColor='#f6f8fa'
                onHideUnderlay={() => {
                    setClickedGalleryButton(false);
                }}
                onShowUnderlay={() => {
                    setClickedGalleryButton(true);
                }}
            >
                <Image source={galleryIcon} style={styles.galleryButton}></Image>
            </TouchableHighlight>

            <TouchableOpacity style={styles.cameraButtonContainer} onPress={handleClickCamera}>
                <View style={styles.innerCircle}/>
                <View style={styles.innermostCircle}/>
            </TouchableOpacity>

            <TouchableHighlight 
                style={[styles.buttonContainer, clickedArchiveButton ? { backgroundColor: '#f6f8fa'}:{ backgroundColor: 'white' }]} 
                onPress={handleClickArchive}
                underlayColor='#f6f8fa'
                onHideUnderlay={() => {
                    setClickedArchiveButton(false);
                }}
                onShowUnderlay={() => {
                    setClickedArchiveButton(true);
                }}
            >
                <Image source={archiveIcon} style={styles.archiveButton}></Image>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        width: width-20,
        height: 80,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 18,
        opacity: 0.8,
        position: 'absolute',
        bottom: 15,
        left: 10
    },
    galleryButton: {
        width: 23,
        height: 23,
        opacity: 0.5,
    },
    archiveButton: {
        width: 23,
        height: 23,
        opacity: 0.5,
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    cameraButtonContainer: {
        width: 80,
        height: 80,
        borderRadius: 80,
        borderWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.04)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerCircle: {
        position: 'absolute',
        width: 55,
        height: 55,
        borderRadius: 80,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    innermostCircle: {
        position: 'absolute',
        width: 45,
        height: 45,
        borderRadius: 80,
        borderWidth: 3,
        borderColor: 'rgba(0, 0, 0, 0.46)',
    }
});

export default CameraController;
