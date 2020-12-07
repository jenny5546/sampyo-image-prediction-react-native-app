import React, { useState, useEffect } from 'react';
import Page from 'components/onboarding/Page';
import onboardingImg1 from 'assets/images/onboarding-img1.png';
import { ScrollView, SafeAreaView, Image, View, Text, StyleSheet } from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';


const OnboardingScreen = () => {

    const [currentPage, setCurrentPage] = useState(1);

    return (
        <SafeAreaView style={styles.container}>
            <Text>Hi</Text>
            <Page />
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgStyle: {
        width: 400,
        resizeMode: 'contain',
        // marginTop: -300,
    }
});


export default OnboardingScreen;
