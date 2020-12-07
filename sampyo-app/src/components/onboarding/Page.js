import React from 'react';

import { View, Text, Image, StyleSheet } from 'react-native';


const Page = () => {
    return (
        <View>
            <Text>Page</Text>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1,
    },
});


export default Page;
