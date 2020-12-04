import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import Header from 'components/Header';
import AnimatedLoader from "react-native-animated-loader";
import { getResults } from "api/api";
import { ScrollView, SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image,  Dimensions } from 'react-native';
const { height, width } = Dimensions.get("window");

const ArchiveScreen = ({navigation}) => {
    
    const [loading, setLoading] = useState(true);

    const handleGetFeed = async () => {
        try {
            const res = await getResults();
            // console.log(res.data)
        } catch (error) {
            console.log('error');
        }
    }

    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false);
        },3000);

        Font.loadAsync({
            'NotoSansKR-Thin': require('assets/fonts/NotoSansKR-Thin.otf')
            // 'Montserrat-SemiBold': require('assets/fonts/Montserrat-SemiBold.ttf'),
        });
        
        handleGetFeed();
    },[]);


    const handleBackButton = () => {
        navigation.navigate('Camera')
    }
    
    const resultList = [];

    const card = (
        <View style={styles.cardWrapper}>
            <View>
                <Image/>
            </View>
            <Text style={{ fontFamily: 'NotoSansKR-Thin' }}>
                수원 리포트
            </Text>
            <Text>
                Date
            </Text>
        </View>
    )



    return (
        <SafeAreaView style={styles.container}>
            <AnimatedLoader
                visible={loading}
                overlayColor="rgba(255,255,255,0.75)"
                source={require("./loader.json")}
                animationStyle={styles.lottie}
                speed={1}
            />
            <Header handleBackButton={handleBackButton} headerTitle="모아보기"/>
            {!loading &&
                <ScrollView>
                    {card}
                </ScrollView>
            }
            
        </SafeAreaView>
        
    );
}


const styles = StyleSheet.create({
    container: {
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
    },
    cardWrapper: {
        width: width-20,
        borderRadius: 10, 
        height: 80,
        borderWidth: 1,
        // backgroundColor: 'pink',
        marginBottom: 20,
    }
});

export default ArchiveScreen;
