import React from 'react';
import ScreenContainer from '../components/ScreenContainer';
import { ScrollView, View, Text, StyleSheet } from 'react-native';


const About = ({navigation}) => {
    return (
        <ScreenContainer 
            mainScreen = {<AboutScreen />}
            navigation = {navigation}
        />
    )
}

const AboutScreen = () => {
    return (
        <ScrollView>
            <Text>
                About
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    
});


export default About;
