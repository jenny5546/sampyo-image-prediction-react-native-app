import React, { useState, useEffect, useRef } from 'react';
import EditLabelModal from 'components/modal/EditLabelModal';
import backIcon from 'assets/images/back-arrow-icon.png';
import dangerIcon from 'assets/images/danger-icon.png';
import checkIcon from 'assets/images/check-icon.png';
import editIcon from 'assets/images/edit-icon.png';
import xIcon from 'assets/images/x-icon.png';
import NavBar from 'components/common/NavBar';
import { savePredictionLabel, deletePrediction } from 'api/api';
import { Share, SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image,  Dimensions } from 'react-native';

const { height, width } = Dimensions.get("window");

const DetailScreen = ({route, navigation}) => {

    const { info } = route.params;

    const [label, setLabel] = useState(info.label);
    const [openLabelModal, setOpenLabelModal]= useState(false);

    const handleBackButton = () => {
        navigation.goBack();
    }


    const handleDelete = async () => {
        let form_data = new FormData();
        form_data.append("prediction_id", info.index);
        await deletePrediction(form_data);
        navigation.push('Archive');
    }

    const handleOpenLabelModal  = () => {
        setOpenLabelModal(true);
    }

    const handleCloseLabelModal = () => {
        setOpenLabelModal(false);
    }

    const handleSaveLabel = async (labelInput) => {
        let form_data = new FormData();
        form_data.append("prediction_id", info.index);
        form_data.append("label", labelInput);
        await savePredictionLabel(form_data);
        setLabel(labelInput);
        handleCloseLabelModal();
    }


    const onShare = async () => {
        const resultMessage = [
            `[${label}] 토분 분석 결과: 0 - 적합`,
            `[${label}] 토분 분석 결과: 0과 100 사이 - 위험`,
            `[${label}] 토분 분석 결과: 100 이상 - 부적합`
        ]
        try {
            const result = await Share.share({
                title: '[골재 품질 진단 결과]',
                message: resultMessage[info.classification], 
                url: info.source.uri
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                // shared with activity type of result.activityType
                } else {
                // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
            } catch (error) {
                alert(error.message);
            }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackButton}>
                    <Image source={backIcon} style={styles.backIconStyle}/>
                </TouchableOpacity>
            </View>
            <View>
                <Image source={info.source} style={styles.imageStyle} />
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.labelWrap}>
                    <Text style={styles.labelText}>
                        {label}
                    </Text>
                    <TouchableOpacity style={styles.editButton} onPress={handleOpenLabelModal}>
                        <Image source={editIcon} style={styles.editIconStyle}/>
                    </TouchableOpacity>
                </View>
                
                <Text style={styles.date}>
                    {info.created_at}
                </Text>
            </View>
            <View style={styles.resultContainer}>
                {info.classification === 0 ?
                    <View style={[styles.resultBox]}>
                        <Text style={[styles.resultText, { color: '#64b2cd'}]}>적합</Text>
                        <Image source={checkIcon} style={styles.iconStyle}/>
                    </View>
                    :
                    info.classification === 1 ?
                    <View style={[styles.resultBox]}>
                        <Text style={[styles.resultText, { color: '#ec9b3b'}]}>위험</Text>
                        <Image source={dangerIcon} style={styles.iconStyle}/>
                    </View>
                    :
                    <View style={[styles.resultBox]}>
                        <Text style={[styles.resultText, { color: '#f35750' }]}>부적합</Text>
                        <Image source={xIcon} style={styles.iconStyle}/>
                    </View>
                }
            </View>
            <View style={styles.explanationContainer}>
                <Text style={styles.explanationText}>
                    {info.classification === 0 ?
                    '골재 이미지 품질 진단 시스템의 예측 결과, 토분이 0 으로 적합한 골재입니다.'
                    :
                    info.classification === 1 ?
                    '골재 이미지 품질 진단 시스템의 예측 결과,토분이 0 초과 100 미만으로 적합하지 않을 가능성이 큰 골재입니다.'
                    :
                    '골재 이미지 품질 진단 시스템의 예측 결과, 토분이 100 이상으로 적합하지 않은 골재입니다.'
                    }
                </Text>
            </View>
            {/* <TouchableOpacity onPress={onShare}>
                <Text>공유하기</Text>
            </TouchableOpacity> */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                    <Text style={styles.deleteButtonText}>삭제</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.shareButton} onPress={onShare}>
                    <Text style={styles.shareButtonText}>공유하기</Text>
                </TouchableOpacity>
            </View>

            
            <NavBar navigation={navigation} active="archive"/>
            {openLabelModal &&
                <EditLabelModal labelProps={label} closeModal={handleCloseLabelModal} handleSaveLabel={handleSaveLabel}/>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#1C1A1B',
        alignItems: 'center',
        height: height,
        position: 'relative'
    },
    header: {
        position: 'absolute',
        width: width,
        zIndex: 5,
        top: 30,
        paddingLeft: 10,
        paddingRight: 10
    },
    backIconStyle:{
        width: 35,
        height: 35,
    },
    imageStyle: { 
        width: width,
        height: width-20,
    },
    contentContainer: {
        width: width,
        paddingLeft: 20,
        marginTop: 20
    },
    labelWrap: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    labelText: {
        fontFamily: 'NotoSansKR-Bold',
        fontSize: 28,
        letterSpacing: -0.45,
    },
    date: {
        fontFamily: 'NotoSansKR-Regular',
        fontSize: 16,
        letterSpacing: -0.45,
    },
    resultContainer: {
        width: width,
        paddingLeft: 20,
        marginTop: 10,
    },
    resultBox: {
        width: 60,
        height: 35,
        opacity: 0.8,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row'
    },
    resultText: {
        fontFamily: 'NotoSansKR-Bold',
        fontSize: 18,
        letterSpacing: -0.45,
    },
    explanationContainer: {
        width: width,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10
    },
    explanationText: {
        fontFamily: 'NotoSansKR-Regular',
        fontSize: 16,
        letterSpacing: -0.45,
    },
    iconStyle: {
        width: 15,
        height: 15,
        marginLeft: 5,
    },
    editIconStyle: {
        width: 20,
        height: 20,
    },
    editButton: {
        width: 30,
        height: 30,
        backgroundColor: '#dde1e7',
        opacity: 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        borderRadius: 30
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 20,
    },
    deleteButton: {
        width: (width-50)/4,
        height: 40,
        backgroundColor: '#dedede',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    shareButton: {
        width: 3*(width-50)/4,
        height: 40,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: '#8ac6d1'
    },
    deleteButtonText: {
        fontFamily: 'NotoSansKR-Regular',
        fontSize: 14,
        letterSpacing: -0.45,
    },
    shareButtonText: {
        fontFamily: 'NotoSansKR-Regular',
        fontSize: 14,
        letterSpacing: -0.45,
    }
});

export default DetailScreen;
