import React from 'react';
import { tutorialImage1 } from '../../assets/images/Image';
import {StyleSheet,Dimensions,Text, Image, View, TouchableOpacity} from 'react-native';
import { black, yellow } from 'color-name';
const { height, width } = Dimensions.get("window");

const OnBoardingScreen = () => {
    
    return(
        <View style={styles.pageContainer}>

            <View>
                {TutorialPage(
                    1,
                    "버거운 당신의 일정,자주 잊어버리시나요?",
                    "개인 비서 Gabby로 손쉽게 관리하세요\n한 눈에 보고 관리하는 나의 일정 플래너", 
                    tutorialImage1
                )}
            </View>
            
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonFont}>시작하러 가기</Text>
            </TouchableOpacity>

        </View>
        
    )
}

const TutorialPage = (pagenum: number, title: string, content: string, imgUrl: any) => {
    
    return(
        <View>
            <View style={styles.imageContainer}>
                <Image source={imgUrl} style={styles.image} resizeMode="contain"/>
            </View>
            <View style={styles.textContainer}>
                <View>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View>
                    <Text style={styles.content}>{content}</Text>
                </View>
            </View>
            <View>
                {/* <Text>{pagenum}</Text> */}
            </View>
            
        </View>
    )
}

export default OnBoardingScreen;

const styles = StyleSheet.create({
    pageContainer: {
        flexDirection: 'column',
        // height: height*0.8,
        justifyContent: "center",
        alignContent: "center",
        // backgroundColor: 'red'
    },
    imageContainer: {
        
    },
    image: {
        // backgroundColor: 'black',
        width: width*0.9,
        height: height*0.5,
        alignSelf: "center"
    },
    textContainer: {
        // backgroundColor: 'grey',
        height: height*0.2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: '900',
        color: "#3D7B77"
    },
    content: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: '100',
    },
    button: {
        width: width*0.7,
        height: 50,
        backgroundColor: '#FFE277',
        alignSelf: "center",
        borderRadius: 25
    },
    buttonFont: {
        fontSize: 18,
        fontWeight: '100',
        textAlign: 'center',
        marginTop: 'auto',
        marginBottom: 'auto'
    }

})