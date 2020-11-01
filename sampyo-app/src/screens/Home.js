import React from 'react';
import ScreenContainer from '../components/ScreenContainer';
import clickIcon from '../assets/images/click-icon.png';
import { Image, TouchableOpacity, SafeAreaView, View, Text, StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get("window");

const Home = ({navigation}) => {

    const handleClick = (type) => {
        navigation.navigate(type);
    }

    return (
        <ScreenContainer 
            mainScreen = {<HomeScreen handleClick={handleClick} />}
            navigation = {navigation}
        />
    )
}

const HomeScreen = ({handleClick}) => {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    단 한 번의 클릭만으로,
                </Text>
                <Text style={styles.title}>
                    골재 품질을 측정해보세요
                </Text>
                <Image source={clickIcon} style={styles.clickIcon}/>
            </View>
            
            <TouchableOpacity style={styles.archiveButton} onPress={()=>handleClick('Archive')}>
                <Text>Archive</Text>
            </TouchableOpacity>
            <View style={styles.flexContainer}>
                <TouchableOpacity style={styles.cameraButton} onPress={()=>handleClick('Camera')}>
                    <Text>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.galleryButton} onPress={()=>handleClick('ImagePicker')}>
                    <Text>ImagePicker</Text>
                </TouchableOpacity>
            </View>
            
            
            {/* <TouchableOpacity onPress={()=>handleClick('About')}>
                <Text>About this app</Text>
            </TouchableOpacity> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        padding: 20,
    },
    titleContainer: {
        marginBottom: 40,
        position: 'relative',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    clickIcon: {
        width: 50,
        height: 50,
        position: 'absolute',
        right: 100,
        top: -10,
    },
    archiveButton: {
        width: width-40,
        height: 110,
        backgroundColor: 'blue',
        borderRadius: 20,
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width-40,
        marginTop: 20
    },
    cameraButton: {
        width: width/2-30,
        height: 110,
        backgroundColor: 'yellow',
        borderRadius: 20,
    },
    galleryButton: {
        width: width/2-30,
        height: 110,
        backgroundColor: 'pink',
        borderRadius: 20,

    }
});



export default Home;
