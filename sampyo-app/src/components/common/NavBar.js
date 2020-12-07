import React, { useState } from 'react';
import { View, Image, TouchableOpacity, TouchableHighlight, Text, StyleSheet, Dimensions } from 'react-native';
import cameraIcon from 'assets/images/camera-icon.png';
import cameraIconFilled from 'assets/images/camera-icon-filled.png';
import galleryIcon from 'assets/images/gallery-icon.png';
import galleryIconFilled from 'assets/images/gallery-icon-filled.png';
import archiveIcon from 'assets/images/archive-icon.png';
import archiveIconFilled from 'assets/images/archive-icon-filled.png';
const { height, width } = Dimensions.get("window");

const NavBar = ({navigation, active}) => {

    const [clickedCameraButton, setClickedCameraButton] = useState(false);
    const [clickedGalleryButton, setClickedGalleryButton] = useState(false);
    const [clickedArchiveButton, setClickedArchiveButton] = useState(false);

    const handleClickCamera = () => {
        setClickedCameraButton(true);
        navigation.navigate('Camera');
    }
    
    const handleClickGallery = () => {
        setClickedGalleryButton(true);
        navigation.navigate('Gallery');
    }
    
    const handleClickArchive = () => {
        setClickedArchiveButton(true);
        navigation.navigate('Archive');
    }

    return (
        <View style={styles.footer}>

            <TouchableHighlight 
                style={[styles.buttonContainer, clickedCameraButton ? { backgroundColor: '#f6f8fa'}:{ backgroundColor: 'white' }]} 
                onPress={handleClickCamera}
                underlayColor='#f6f8fa'
                onHideUnderlay={() => {
                    setClickedCameraButton(false);
                }}
                onShowUnderlay={() => {
                    setClickedCameraButton(true);
                }}
            >
                {active==='camera' ? 
                    <Image source={cameraIconFilled} style={[styles.cameraButton, { opacity: 1 }]}></Image>
                    :
                    <Image source={cameraIcon} style={styles.cameraButton}></Image>
                }
            </TouchableHighlight>


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
                {active==='gallery' ?
                    <Image source={galleryIconFilled} style={[styles.galleryButton, { opacity: 1 }]}></Image>
                    :
                    <Image source={galleryIcon} style={styles.galleryButton}></Image>
                }
            </TouchableHighlight>

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
                {active === 'archive' ?
                    <Image source={archiveIconFilled} style={[styles.archiveButton, { opacity: 1 }]}></Image>
                    :
                    <Image source={archiveIcon} style={styles.archiveButton}></Image>
                }
                
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        width: width,
        height: 60,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        opacity: 0.8,
        position: 'absolute',
        bottom: 0,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white'

    },
    cameraButton: {
        width: 25,
        height: 25,
        opacity: 0.5,
    },
    galleryButton: {
        width: 26,
        height: 26,
        opacity: 0.5,
    },
    archiveButton: {
        width: 24,
        height: 24,
        opacity: 0.5,
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 50,
    }

});

export default NavBar;
