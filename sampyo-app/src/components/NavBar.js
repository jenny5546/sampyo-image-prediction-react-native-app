import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import galleryIcon from '../assets/images/gallery-icon.png';
import cameraIcon from '../assets/images/camera-icon.png';
import resultIcon from '../assets/images/result-icon.png';
const { height, width } = Dimensions.get("window");

const NavBar = ({navigation, takePicture}) => {

    const handleClickHome = () => {
        navigation.navigate('Gallery');
    }
    const handleClickCamera = () => {
        takePicture();
    }
    const handleClickResult = () => {
        navigation.navigate('Archive');
    }

    return (
        <View style={styles.footer}>
            <TouchableOpacity style={styles.buttonContainer} onPress={handleClickHome}>
                <Image source={galleryIcon} style={styles.galleryButton}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraButtonContainer} onPress={handleClickCamera}>
                <Image source={cameraIcon} style={styles.cameraButton}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={handleClickResult}>
                <Image source={resultIcon} style={styles.resultButton}></Image>
            </TouchableOpacity>
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
        backgroundColor: '#1F1F24',
        borderRadius: 18,
        opacity: 0.8,
        position: 'absolute',
        bottom: 15,
        left: 10
    },
    galleryButton: {
        width: 23,
        height: 23,
        opacity: 0.8,
    }, 
    cameraButton: {
        width: 20,
        height: 20,
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    buttonLabel: {
        fontSize: 12,
        color: 'white',
        marginTop: 5,
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
    resultButton: {
        width: 23,
        height: 23
    }
});

export default NavBar;
