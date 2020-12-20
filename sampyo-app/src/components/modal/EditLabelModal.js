import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image,  Dimensions, Button } from 'react-native';
import Modal from 'react-native-modal';
import { Keyboard, KeyboardEvent } from 'react-native';

const { height, width } = Dimensions.get("window");

const EditLabelModal = ({labelProps, closeModal, handleSaveLabel}) => {

    const [labelInput, setLabelInput] = useState(labelProps);
    const [openedKeyboard, setOpenedKeyboard]= useState(false);

    const onKeyboardDidShow = (e) => {
        setOpenedKeyboard(true);
    }

    const onKeyboardDidHide = () => {
        setOpenedKeyboard(false);
    }

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
        Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
        ()=>{
            Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
            Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
        };
    }, []);

    const handleLabelInput = (text) => {
        setLabelInput(text);
    }

    const handleClickCancelBtn = () => {
        closeModal();
    }

    const handleClickSaveBtn = () => {
        handleSaveLabel(labelInput);
    }

    return (
        
        <View>
            <Modal
                isVisible={true}
                onSwipeComplete={closeModal}
                swipeDirection="down"
                style={{
                    marginBottom: openedKeyboard? -150:0
                }}
                avoidKeyboard={false}
            >
                <View style={styles.container}>
                    <View style={styles.modalDrag}/>
                    <View style={styles.inputWrap}>
                        <TextInput
                            style={styles.inputStyle}
                            value={labelInput}
                            underlineColorAndroid="transparent"
                            placeholder={"이미지에 라벨을 달아보세요"}
                            placeholderTextColor="#52565d"
                            autoCapitalize="none"
                            onChangeText={handleLabelInput}
                            autoFocus={true}
                        />
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
                            onPress={handleClickSaveBtn}
                        >
                            <Text style={styles.saveText}>저장</Text>
                        </TouchableOpacity>
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
        zIndex: 120,
        position: 'absolute',
        bottom:-20,
        left: -20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalDrag: {
        width: width/5,
        backgroundColor: '#999999',
        height: 5,
        borderRadius: 2,
        marginTop: 10,
    },
    inputWrap: {
        width: width,
        padding:20,
    },
    inputStyle: {
        width: width-40,
        height:50,
        marginTop: 30,
        borderRadius: 8,
        backgroundColor: '#f6f8fa',
        padding: 10,
    },
    buttonWrap: {
        flexDirection: 'row',
        width: width,
        justifyContent: 'flex-end',
        marginRight: 10,
        
    },
    buttonStyle: {
        width: 40,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    cancelText: {
        fontFamily: 'NotoSansKR-Regular',
        fontSize: 14,
        color: '#52565d',
    },
    saveText: {
        fontFamily: 'NotoSansKR-Bold',
        fontSize: 14,
        color: '#3282b8',
    },

});

export default EditLabelModal;
