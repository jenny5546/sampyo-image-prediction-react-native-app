import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import homeIcon from '../assets/images/home-icon.png';
import cameraIcon from '../assets/images/camera-icon.png';
import resultIcon from '../assets/images/result-icon.png';
const { height, width } = Dimensions.get("window");

const NavBar = ({navigation}) => {

    const handleClickHome = () => {
        navigation.navigate('Home');
    }
    const handleClickCamera = () => {
        navigation.navigate('Camera');
    }
    const handleClickResult = () => {
        navigation.navigate('Archive');
    }

    return (
        <View style={styles.footer}>
            <TouchableOpacity style={styles.buttonContainer} onPress={handleClickHome}>
                <Image source={homeIcon} style={styles.homeButton}></Image>
                <Text style={styles.buttonLabel}>홈</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraButton} onPress={handleClickCamera}>
                <Image source={cameraIcon} style={styles.homeButton}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={handleClickResult}>
                <Image source={resultIcon} style={styles.resultButton}></Image>
                <Text style={styles.buttonLabel}>분석 결과</Text>
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
        position: 'absolute',
        bottom: 15
    },
    homeButton: {
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
    cameraButton: {
        width: 60,
        height: 60,
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
