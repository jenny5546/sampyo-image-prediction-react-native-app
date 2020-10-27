import React from 'react';
import ScreenContainer from '../components/ScreenContainer';
import { Platform, TouchableOpacity, StatusBar, SafeAreaView, View, Text, StyleSheet, Dimensions } from 'react-native';

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
        <View>
            <TouchableOpacity onPress={()=>handleClick('Camera')}>
                <Text>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleClick('ImagePicker')}>
                <Text>ImagePicker</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleClick('Archive')}>
                <Text>Archive</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleClick('About')}>
                <Text>About this app</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    
});



export default Home;
