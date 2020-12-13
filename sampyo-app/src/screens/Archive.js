import React, { useState, useEffect } from 'react';
import MainScreenHeader from 'components/common/MainScreenHeader';
import ErrorModal from 'components/modal/ErrorModal';
import NavBar from 'components/common/NavBar';
import Card from 'components/archive/Card';
import { getResults } from "api/api";
import { ScrollView, SafeAreaView, View, Text, StatusBar, Platform, StyleSheet, Image, Dimensions } from 'react-native';
const { height, width } = Dimensions.get("window");

const ArchiveScreen = ({navigation}) => {
    
    const [loadDone, setLoadDone] = useState(false);
    const [error, setError] = useState(false);
    const [dataList, setDataList] = useState([]);
    const [dataListCount, setDataListCount] = useState(0);

    const handleGetFeed = async () => {
        try {
            const res = await getResults();
            setDataList(res.data.predictions);
            setDataListCount(res.data.predictions.length);
            setLoadDone(true);
        } catch (error) {
            setError(true);
        }
    };

    const handleRenderDetail = (info) => {
        navigation.navigate('Detail', { info: info} );
    }

    const handleCloseErrorModal = () => {
        setError(false);
        navigation.goBack();
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
                <>
                <View 
                    style={styles.overlay}
                />
                <Image 
                    source={require("components/animation/loader.gif")}
                    style={styles.lottie}
                />
                </>
            }
            <NavBar navigation={navigation} active="archive"/>
            
            {error &&
                <ErrorModal handleClose={handleCloseErrorModal} />
            }
        </SafeAreaView>
        
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        height: height,
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    infoContainer: {
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 40,
        marginTop: 5,
    },
    infoText: {
        fontFamily: 'NotoSansKR-Regular',
        letterSpacing: -1.5,
        fontSize: 14,
        lineHeight: 24,
    },
    infoTextNumber: {
        fontFamily: 'NotoSansKR-Bold',
        letterSpacing: -1.5,
        fontSize: 18,
        color: '#3498DB',
        lineHeight: 25,
    },
    listContainer: {
        marginTop: 10,
        marginBottom: 80,
    },
    lottie: {
        width: 80,
        height: 80,
        zIndex: 100,
        marginTop: 80,
    },
    overlay: {
        width: width,
        height: height,
        position: 'absolute',
        backgroundColor: 'white',
        zIndex: 99,
        opacity: 0.7,
    }

});

export default ArchiveScreen;
