import React from 'react';
import ScreenContainer from '../components/ScreenContainer';
import { ScrollView, View, Text, StyleSheet } from 'react-native';


const Archive = ({navigation}) => {
    return (
        <ScreenContainer 
            mainScreen = {<ArchiveScreen />}
            navigation = {navigation}
        />
    )
}

const ArchiveScreen = () => {
    return (
        <ScrollView>
            <Text>
                Archive
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    
});


export default Archive;
