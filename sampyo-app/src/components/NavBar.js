import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get("window");

const NavBar = ({navigation}) => {

    const handleClick = () => {
        navigation.navigate('Home');
    }

    return (
        <View style={styles.footer}>
            <TouchableOpacity onPress={handleClick}>
                <Text>홈으로 가기</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        width: width,
        height: 50,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'red',
        position: 'absolute',
        bottom: 0
    },
    button: {

    }
});

export default NavBar;
