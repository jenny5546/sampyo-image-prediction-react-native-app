import React, { useState, useEffect } from 'react';
import Header from 'components/Header';
import AnimatedLoader from "react-native-animated-loader";
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image,  Dimensions } from 'react-native';

const { height, width } = Dimensions.get("window");

const ResultScreen = ({ route, navigation}) => {

    const { picture } = route.params;
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false);
        },3000)
    },[]);

    const handleBackButton = () => {
        navigation.navigate('Camera');
    }

    return (
        <SafeAreaView style={styles.container}>
            <AnimatedLoader
                visible={loading}
                overlayColor="rgba(255,255,255,0.75)"
                source={require("./loader.json")}
                animationStyle={styles.lottie}
                speed={1}
            />
            <Header handleBackButton={handleBackButton} headerTitle="분석 결과"/>
            <Image source={picture} style={styles.imageStyle} />
            {!loading &&
                <View>
                    <Text>조립율 : 93%</Text>
                    <Text>조립율 : 93%</Text>
                    <Text>조립율 : 93%</Text>
                    <Text>조립율 : 93%</Text>
                    <Text>조립율 : 93%</Text>
                </View>
            }
            
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'pink',
        alignItems: 'center',
        height: height,
    },
    imageStyle: { 
        marginTop: 10,
        width: width/2 + 100,
        height: height/2 + 100
    },
    lottie: {
        width: 100,
        height: 100
    }
});

export default ResultScreen;
