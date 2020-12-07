import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';


const StepIndicator = ({step}) => {
    return (
        <View style={styles.container}>
            <View style={ step===1 ? styles.activeCircle : styles.regularCircle }/>
            <View style={ step===2 ? styles.activeCircle : styles.regularCircle }/>
            <View style={ step===3 ? styles.activeCircle : styles.regularCircle }/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: 60,
        justifyContent: 'space-between',
        marginTop: 20,
    },
    activeCircle: {
        width: 8,
        height: 8,
        backgroundColor: '#65B4E0',
        borderRadius: 100,
    },
    regularCircle: {
        width: 8,
        height: 8,
        borderColor: '#65B4E0',
        borderRadius: 100,
        borderWidth: 2,
    }
});


export default StepIndicator;
