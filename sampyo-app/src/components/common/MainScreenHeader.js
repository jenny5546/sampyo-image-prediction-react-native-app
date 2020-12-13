import React, { useState, useEffect } from 'react';
import { SafeAreaView,TouchableOpacity, Text, Image, View, Platform, Dimensions, StyleSheet } from 'react-native';
const { height, width } = Dimensions.get("window");

const MainScreenHeader = ({title_1, title_2}) => {

    const styles = StyleSheet.create({
        header: {
            backgroundColor: 'white',
            height: 80,
            width: width,
            paddingLeft: 20,
            marginTop: 30,
        },
        textStyle: {
            fontFamily: 'NotoSansKR-Bold',
            letterSpacing: -1.5,
            fontSize: 26,
            lineHeight: 38,
        }
    });

    return (
        <View style={styles.header}>
            <Text style={styles.textStyle}>
                {title_1}
            </Text>
            <Text style={styles.textStyle}>
                {title_2}
            </Text>
        </View>
    );

    
}



export default MainScreenHeader;