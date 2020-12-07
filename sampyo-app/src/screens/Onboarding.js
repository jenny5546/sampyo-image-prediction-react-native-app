import React, { useState, useEffect } from 'react';
import Page from 'components/onboarding/Page';
import onboardingImg1 from 'assets/images/onboarding-img1.png';
import onboardingImg2 from 'assets/images/onboarding-img2.png';
import onboardingImg3 from 'assets/images/onboarding-img3.png';
import { ScrollView, SafeAreaView, Image, View, Text, StyleSheet } from 'react-native';


const OnboardingScreen = ({navigation}) => {

    const [currentPage, setCurrentPage] = useState(0);

    const onboardingContents = [
        {
            id: 1,
            title_1: '골재 이미지를 직접 촬영하거나,',
            title_2: '분석할 이미지를 선택하세요',
            content_1: '분석에 적합한 이미지의 명도 기준을 통과하면,',
            content_2: '적절한 크기의 이미지로 자동 크롭을 지원합니다.',
            imgSrc: onboardingImg1,
        },
        {
            id: 2,
            title_1: '이미지의 토분 예측 결과를',
            title_2: '바로 확인하세요',
            content_1: '단 몇 초 안에 높은 정확도를 가진 예측 결과를',
            content_2: '바로 받아보고 골재의 품질을 확인할 수 있습니다.',
            imgSrc: onboardingImg2,
        },
        {
            id: 3,
            title_1: '분석한 이미지들을 전부',
            title_2: '모아보고, 활용하고, 공유하세요',
            content_1: '분석했던 결과물들을 저장하고 있어',
            content_2: '데이터를 재활용하고, 외부에 공유할 수 있습니다.',
            imgSrc: onboardingImg3,
        }
    ];

    const handleClickNext = () => {
        setCurrentPage((prevPage) => prevPage+1);
    };

    const handleClickStart = () => {
        navigation.navigate('Camera');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Page 
                id = {onboardingContents[currentPage].id}
                title_1 = {onboardingContents[currentPage].title_1}
                title_2 = {onboardingContents[currentPage].title_2}
                content_1 = {onboardingContents[currentPage].content_1}
                content_2 = {onboardingContents[currentPage].content_2}
                imgSrc = {onboardingContents[currentPage].imgSrc}
                handleClickNext = {handleClickNext}
                handleClickStart = {handleClickStart}
            />
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1,
        backgroundColor: 'white',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    imgStyle: {
        width: 400,
        resizeMode: 'contain',
    }
});


export default OnboardingScreen;
