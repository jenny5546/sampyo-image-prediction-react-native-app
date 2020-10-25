import React from 'react';
import NavBar from '../components/navbar/NavBar';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get("window");

const ImagePickerScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View>
                <Text>
                    ImagePickerScreen
                </Text>
            </View>
            <NavBar navigation={navigation} />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'pink',
        alignItems: 'center',
        height: height,
    }
});

export default ImagePickerScreen;
