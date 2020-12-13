import React, { useState, useEffect, useRef } from 'react';
import StepIndicator from 'components/onboarding/StepIndicator';
import nextIcon from 'assets/images/next-icon.png';
import LottieView from 'lottie-react-native';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';

const { height, width } = Dimensions.get("window");

const Page = (props) => {


    return (
        <View style={styles.container}>

            <View style={styles.headerButtonContainer}>
                {props.id !== 3 && 
                    <TouchableOpacity style={styles.flexButtonContainer} onPress={props.handleClickStart}>
                        <Text style={styles.skipButtonText}>Skip</Text>
                        <Image 
                            style={{
                                width: 100,
                                height: 50,
                                position: 'absolute',
                                marginLeft: -3,
                            }}
                            source={require('components/animation/skip-arrow.gif')}
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
        // justifyContent: 'center',
        alignItems: 'center',
        height: height,
    },
    headerButtonContainer: {
        width: width,
        height: 30,
        alignItems: 'flex-end',
        marginRight: 30,
        marginTop: 10,
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
        zIndex: 99,
        marginTop: 0,
    },
    imgStyle: {
        width: width,
        maxHeight: height/2,
        resizeMode: 'contain',
    },
    textContainer: {
        width: width,
        padding: 20,
        marginTop: 10,
    },
    contentContainer: {
        marginTop: 20,
    },
    titleTextStyle: {
        fontFamily: 'NotoSansKR-Bold',
        letterSpacing: -1.5,
        fontSize: 24,
        lineHeight: 36
    },
    contentTextStyle: {
        fontFamily: 'NotoSansKR-Regular',
        fontSize: 16,
        letterSpacing: -1,
        lineHeight: 30
    },
    footerButtonContainer: {
        height: 30,
        width: width,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        position: 'absolute',
        bottom: 40
    },
    nextButtonText: {
        fontFamily: 'NotoSansKR-Bold',
        fontSize: 16,
        marginRight: 5,
        color: '#4C6A91',
    },
});


export default Page;
