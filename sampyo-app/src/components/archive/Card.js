import React, { useState, useEffect, useRef } from 'react';
import { Share, SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image,  Dimensions } from 'react-native';

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
                        <View style={[styles.resultBox, { borderColor: '#64b2cd'}]}>
                            <Text style={[styles.resultText, { color: '#64b2cd'}]}>적합</Text>
                        </View>
                        :
                        classification === 1 ?
                        <View style={[styles.resultBox, { borderColor: '#ec9b3b'}]}>
                            <Text style={[styles.resultText, { color: '#ec9b3b'}]}>위험</Text>
                        </View>
                        :
                        <View style={[styles.resultBox, { borderColor: '#f35750'}]}>
                            <Text style={[styles.resultText, { color: '#f35750' }]}>부적합</Text>
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
        borderWidth:3,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    resultText: {
        fontFamily: 'NotoSansKR-Bold',
        fontSize: 14,
        letterSpacing: -0.45,
    }
});

export default Card;
