import React, { useState, useEffect, useRef } from 'react';
import StepIndicator from 'components/onboarding/StepIndicator';
import nextIcon from 'assets/images/next-icon.png';
import LottieView from 'lottie-react-native';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { height, width } = Dimensions.get("window");

const Page = (props) => {

    const lottieRef = useRef(null);

    useEffect(() => {
        if (lottieRef) {
            lottieRef.current.play();
        }
    }, []);

    return (
        <View style={styles.container}>

            <View style={styles.headerButtonContainer}>
                {props.id !== 3 && 
                    <TouchableOpacity style={styles.flexButtonContainer} onPress={props.handleClickStart}>
                        <Text style={styles.skipButtonText}>Skip</Text>
                        <LottieView
                            ref={lottieRef} 
                            style={{
                                width: 100,
                                height: 100,
                                position: 'absolute',
                                marginLeft: -3,
                            }}
                            source={require('components/animation/skip-arrow.json')}
                        />
                    </TouchableOpacity>
                }
            </View>
            
            <View>
                <Image source={props.imgSrc} style={styles.imgStyle} />
            </View>

            <StepIndicator step={props.id}/>

            <View style={styles.textContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleTextStyle}>{props.title_1}</Text>
                    <Text style={styles.titleTextStyle}>{props.title_2}</Text>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.contentTextStyle}>{props.content_1}</Text>
                    <Text style={styles.contentTextStyle}>{props.content_2}</Text>
                </View>
            </View>
            
            <View style={styles.footerButtonContainer}>
                {props.id === 3 ?
                    <TouchableOpacity style={styles.flexButtonContainer} onPress={props.handleClickStart}>
                        <Text style={styles.nextButtonText}>시작하기</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.flexButtonContainer} onPress={props.handleClickNext}>
                        <Text style={styles.nextButtonText}>다음</Text>
                        <Image source={nextIcon} style={styles.skipButtonIcon}/>
                    </TouchableOpacity>
                }
            </View>
            

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerButtonContainer: {
        width: width,
        height: 30,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    flexButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    skipButtonText: {
        fontFamily: 'NotoSansKR-Light',
        fontSize: 14,
        marginRight: 20,
        color: 'grey',
        opacity: 1
    },

    imgStyle: {
        width: width,
        maxHeight: 400,
        resizeMode: 'contain',
        
    },
    textContainer: {
        width: width,
        padding: 20,
        marginTop: 10,
    },
    contentContainer: {
        marginTop: 10,
    },
    titleTextStyle: {
        fontFamily: 'NotoSansKR-Bold',
        letterSpacing: -1.5,
        fontSize: 24,
    },
    contentTextStyle: {
        fontFamily: 'NotoSansKR-Regular',
        fontSize: 16,
        letterSpacing: -1,
    },
    footerButtonContainer: {
        height: 30,
        width: width,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    nextButtonText: {
        fontFamily: 'NotoSansKR-Bold',
        fontSize: 16,
        marginRight: 5,
        color: '#4C6A91',
    },
});


export default Page;
