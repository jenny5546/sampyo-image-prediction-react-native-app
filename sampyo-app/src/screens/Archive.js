import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import Header from 'components/Header';
import AnimatedLoader from "react-native-animated-loader";
import { getResults } from "api/api";
import { ScrollView, SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image,  Dimensions } from 'react-native';
const { height, width } = Dimensions.get("window");

const ArchiveScreen = ({navigation}) => {
    
    const [loadDone, setLoadDone] = useState(false);
    const [dataList, setDataList] = useState([]);

    const handleGetFeed = async () => {
        try {
            const res = await getResults();
            setDataList(res.data.predictions);
            setLoadDone(true);
        } catch (error) {
            console.log('error');
        }
    };

    const handleRenderDetail = (info) => {
        navigation.navigate('Detail', { info: info} );
    }

    useEffect(()=>{
        // Font.loadAsync({
        //     'NotoSansKR-Thin': require('assets/fonts/NotoSansKR-Thin.otf'),
        //     'Montserrat-SemiBold': require('assets/fonts/Montserrat-SemiBold.ttf'),
        // });
        handleGetFeed();
    },[]);

    const card = (index, label, classification, created_at, imageUri) => {
        
        const source = {uri: `data:image/jpeg;base64,${imageUri}`};

        const info = {
            index: index,
            label: label,
            classification: classification,
            created_at: created_at,
            source: source
        }
        
        return (
            <TouchableOpacity key={index} style={styles.cardWrapper} onPress={()=>handleRenderDetail(info)}>
                <View>
                    <Image source={source} style={styles.imageStyle} />
                </View>
                <Text>
                    {label}
                </Text>
                <Text>
                    {created_at}
                </Text>
                <Text>
                    {classification}
                </Text>
            </TouchableOpacity>
        )
    }

    const resultList = dataList.map((data,index)=>{
            return card(index, data.label, data.classification, data.created_at, data.input_img);
    });


    const handleBackButton = () => {
        navigation.navigate('Camera')
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <Header handleBackButton={handleBackButton} headerTitle="모아보기"/>
            {loadDone ?
                <ScrollView>
                    {resultList}
                </ScrollView>
                :
                <AnimatedLoader
                    visible={!loadDone}
                    overlayColor="rgba(255,255,255,0.75)"
                    source={require("components/animation/loader.json")}
                    animationStyle={styles.lottie}
                    speed={1}
                />
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
        width: 30,
        height: 30
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
