import React, { useState } from 'react';
import { View, Image, TouchableOpacity, TouchableHighlight, Text, StyleSheet, Dimensions } from 'react-native';
import galleryIcon from 'assets/images/gallery-icon.png';
import cameraIcon from 'assets/images/camera-icon.png';
import archiveIcon from 'assets/images/archive-icon.png';
const { height, width } = Dimensions.get("window");

const NavBar = ({navigation, takePicture}) => {

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
                <Image source={cameraIcon} style={styles.cameraButton}></Image>
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
        // backgroundColor: '#1F1F24',
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
    cameraButton: {
        width: 20,
        height: 20,
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
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: '#58575B',
        // backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // opacity: 0.2,
    },
    archiveButton: {
        width: 23,
        height: 23,
        opacity: 0.5,
    }
});

export default NavBar;
