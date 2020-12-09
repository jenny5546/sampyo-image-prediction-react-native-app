import React, { useState, useEffect, useRef } from 'react';
import Header from 'components/common/Header';
import { Share, SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image,  Dimensions } from 'react-native';

const { height, width } = Dimensions.get("window");

const DetailScreen = ({route, navigation}) => {

    const { info } = route.params;

    const handleBackButton = () => {
        navigation.goBack();
    }

    const handleHomeButton = () => {
        navigation.navigate('Camera');
    }

    const onShare = async () => {
        try {
            const result = await Share.share({
                title: '공유하기되냐',
                message: '바봉', 
                url: info.source.uri
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                // shared with activity type of result.activityType
                } else {
                // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
            } catch (error) {
                alert(error.message);
            }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header handleBackButton={handleBackButton} handleHomeButton={handleHomeButton} headerTitle="디테일"/>
            <TouchableOpacity onPress={onShare}>
                <Text>공유하기</Text>
            </TouchableOpacity>
            <View>
                <Image source={info.source} style={styles.imageStyle} />
            </View>
            <Text>
                {info.label}
            </Text>
            <Text>
                {info.created_at}
            </Text>
            <Text>
                {info.classification}
            </Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#1C1A1B',
        alignItems: 'center',
        height: height,
    },
    imageStyle: { 
        marginTop: 20,
        width: 300,
        height:300
    },
    buttonStyle: {
        marginTop: 30,
        borderRadius: 10,
        width: width-150,
        height: 50,
        backgroundColor: '#404040',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.6,
    },
    textStyle: {
        color: 'white',
        fontSize: 16,
    }
});

export default DetailScreen;
