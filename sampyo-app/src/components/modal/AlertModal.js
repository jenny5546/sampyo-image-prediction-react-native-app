import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image,  Dimensions, Button, ImagePropTypes } from 'react-native';
import Modal from 'react-native-modal';

const { height, width } = Dimensions.get("window");

const AlertModal = ({handleClose, handleDelete}) => {

    const handleClickCancelBtn = () => {
        handleClose();
    }

    const handleClickOkBtn = () => {
        handleDelete();
    }

    return (
        <View>
            <Modal
                isVisible={true}
            >
                <View style={styles.container}>
                    <View>
                        <Text style={styles.modalTitle}>정말 삭제하시겠습니까?</Text>
                        <Text style={styles.modalSubtitle}>삭제 시, 다시 본 결과를 확인할 수 없습니다.</Text>
                    </View>
                    <View style={styles.buttonWrap}>
                        <TouchableOpacity 
                            style={[styles.buttonStyle]} 
                            onPress={handleClickCancelBtn}
                        >
                            <Text style={styles.cancelText}>취소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.buttonStyle]} 
                            onPress={handleClickOkBtn}
                        >
                            <Text style={styles.saveText}>삭제</Text>
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
    cancelText: {
        fontFamily: 'NotoSansKR-Regular',
        fontSize: 18,
        color: '#52565d',
    },
    saveText: {
        fontFamily: 'NotoSansKR-Bold',
        fontSize: 18,
        color: '#f35750',
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

export default AlertModal;
