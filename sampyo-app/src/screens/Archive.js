import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import MainScreenHeader from 'components/common/MainScreenHeader';
import NavBar from 'components/common/NavBar';
import Card from 'components/archive/Card';
import AnimatedLoader from "react-native-animated-loader";
import { getResults } from "api/api";
import { ScrollView, SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image,  Dimensions } from 'react-native';
const { height, width } = Dimensions.get("window");

const ArchiveScreen = ({navigation}) => {
    
    const [loadDone, setLoadDone] = useState(false);
    const [dataList, setDataList] = useState([]);
    const [dataListCount, setDataListCount] = useState(0);

    const handleGetFeed = async () => {
        try {
            const res = await getResults();
            setDataList(res.data.predictions);
            setDataListCount(res.data.predictions.length);
            setLoadDone(true);
        } catch (error) {
            console.log('error');
        }
    };

    const handleRenderDetail = (info) => {
        navigation.navigate('Detail', { info: info} );
    }

    useEffect(()=>{
        handleGetFeed();
    },[]);

    var resultList = [];
    dataList.forEach((data)=>{
        resultList.push(
            <Card 
                key={data.id}
                index={data.id}
                label={data.label}
                classification={data.classification}
                created_at ={data.created_at}
                imageUri={data.input_img}
                handleRenderDetail={handleRenderDetail}
            />
        )
    })

    return (
        <SafeAreaView style={styles.container}>
            <MainScreenHeader title_1="분석 결과" title_2="히스토리 모아 보기" />
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>총  </Text>
                <Text style={styles.infoTextNumber}>{dataListCount}</Text>
                <Text style={styles.infoText}>  개의 분석 결과</Text>
            </View>
            {loadDone ?
                <ScrollView style={styles.listContainer}>
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
            <NavBar navigation={navigation} active="archive"/>
        </SafeAreaView>
        
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        height: height,
        flex: 1,
    },
    infoContainer: {
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 30,
        marginTop: 10,
    },
    infoText: {
        fontFamily: 'NotoSansKR-Regular',
        letterSpacing: -1.5,
        fontSize: 14,
    },
    infoTextNumber: {
        fontFamily: 'NotoSansKR-Bold',
        letterSpacing: -1.5,
        fontSize: 18,
        color: '#3498DB'
    },
    listContainer: {
        marginTop: 20,
        marginBottom: 80,
    },
    lottie: {
        width: 100,
        height: 100
    },

});

export default ArchiveScreen;
