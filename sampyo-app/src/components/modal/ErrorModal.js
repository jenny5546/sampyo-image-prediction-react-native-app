import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image,  Dimensions, Button, ImagePropTypes } from 'react-native';
import Modal from 'react-native-modal';

const { height, width } = Dimensions.get("window");

const ErrorModal = ({handleClose}) => {

    const handleClickOkBtn = () => {
        handleClose();
    }

    return (
        <View>
            <Modal
                isVisible={true}
            >
                <View style={styles.container}>
                    <View>
                        <Text style={styles.modalTitle}>문제가 발생하였습니다.</Text>
                        <Text style={styles.modalSubtitle}>잠시 후에 다시 시도하세요.</Text>
                    </View>
                    <View style={styles.buttonWrap}>
                        <TouchableOpacity 
                            style={[styles.buttonStyle]} 
                            onPress={handleClickOkBtn}
                        >
                            <Text style={styles.saveText}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        width: width-40,
        height: 180,
        backgroundColor: 'white',
        zIndex: 120,
        borderRadius: 24,
        position: 'relative',
        padding: 20,
    },
    buttonWrap: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 30,
        width: width-40,
        justifyContent: 'flex-end',
        right: 10,
        
    },
    buttonStyle: {
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    saveText: {
        fontFamily: 'NotoSansKR-Bold',
        fontSize: 18,
        color: '#3C75AA',
    },
    modalTitle: {
        fontFamily: 'NotoSansKR-Bold',
        fontSize: 20,
    },
    modalSubtitle: {
        fontFamily: 'NotoSansKR-Light',
        fontSize: 16,
        marginTop: 15,
    }

});

export default ErrorModal;
