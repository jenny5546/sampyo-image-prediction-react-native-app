import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image,  Dimensions } from 'react-native';
import greatIcon from 'assets/images/great-icon.png';
import checkIcon from 'assets/images/check-icon.png';
import xIcon from 'assets/images/x-icon.png';
const { height, width } = Dimensions.get("window");

const Card = ({index, label, classification, created_at, imageUri, handleRenderDetail}) => {

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
            <Image source={source} style={styles.imageStyle} />
            <View style={styles.infoContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.labelText}>
                        {label}
                    </Text>
                    <Text style={styles.dateText}>
                        {created_at}
                    </Text>
                </View>
                
                <View style={styles.resultContainer}>
                    {classification === 0 ?
                        <View style={[styles.resultBox]}>
                            <Text style={[styles.resultText, { color: '#64b2cd'}]}>우수</Text>
                            <Image source={greatIcon} style={styles.iconStyle}/>
                        </View>
                        :
                        classification === 1 ?
                        <View style={[styles.resultBox]}>
                            <Text style={[styles.resultText, { color: '#6b8c42'}]}>보통</Text>
                            <Image source={checkIcon} style={styles.iconStyle}/>
                        </View>
                        :
                        <View style={[styles.resultBox]}>
                            <Text style={[styles.resultText, { color: '#f35750' }]}>부적합</Text>
                            <Image source={xIcon} style={styles.iconStyle}/>
                        </View>
                    }
                </View>
            </View>
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardWrapper: {
        width: width-20,
        marginBottom: 20,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#eef1f4',
        
    },
    imageStyle: { 
        width: width-20,
        height: 120
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textContainer: {
        marginLeft: 5,
        marginTop: 5,
    },
    labelText: {
        fontFamily: 'NotoSansKR-Bold',
        fontSize: 16,
        letterSpacing: -0.45,
        
    },
    dateText: {
        fontFamily: 'NotoSansKR-Regular',
        fontSize: 14,
        letterSpacing: -0.45,
    },
    resultContainer: {
    },
    resultBox: {
        width: 60,
        height: 35,
        opacity: 0.8,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    resultText: {
        fontFamily: 'NotoSansKR-Bold',
        fontSize: 14,
        letterSpacing: -0.45,
        color: 'white'
    },
    iconStyle: {
        width: 15,
        height: 15,
        marginLeft: 5,
    }
});

export default Card;
