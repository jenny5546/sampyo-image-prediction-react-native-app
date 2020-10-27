import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get("window");

const Header = () => {
    return (
        <View style={styles.header}>
            <Text>Header</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: width,
        height: 30,
        // flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'space-around',
        backgroundColor: 'blue',
    },
    button: {

    }
});

export default Header;
