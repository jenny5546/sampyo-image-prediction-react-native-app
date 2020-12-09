import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image,  Dimensions, Button, Modal } from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';

const { height, width } = Dimensions.get("window");

const EditLabelModal = ({closeModal}) => {

    const handleBackButton = () => {
        navigation.goBack();
    }

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={true}
                // presentationStyle={'pageSheet'}
            >
                <View style={styles.container}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Hello World!</Text>
                    <TouchableOpacity onPress={closeModal}>
                        <Text>Close</Text>
                    </TouchableOpacity>

                    {/* <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }}> */}
                    {/* <Text style={styles.textStyle}>Hide Modal</Text> */}
                    {/* </TouchableHighlight> */}
                </View>
                </View>
            </Modal>

        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: 4*height/6,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 120,
        position: 'absolute',
        bottom:0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    }
});

export default EditLabelModal;
