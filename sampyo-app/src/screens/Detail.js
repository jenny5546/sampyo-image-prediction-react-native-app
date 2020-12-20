import React, { useState } from 'react';
import EditLabelModal from 'components/modal/EditLabelModal';
import DeleteModal from 'components/modal/DeleteModal';
import ErrorModal from 'components/modal/ErrorModal';
import backIcon from 'assets/images/back-arrow-icon.png';
import greatIcon from 'assets/images/great-icon.png';
import checkIcon from 'assets/images/check-icon.png';
import editIcon from 'assets/images/edit-icon.png';
import xIcon from 'assets/images/x-icon.png';
import NavBar from 'components/common/NavBar';
import { savePredictionLabel, deletePrediction } from 'api/api';
import { Share, SafeAreaView, StatusBar, Platform, View, Text, TouchableOpacity, StyleSheet, Image,  Dimensions } from 'react-native';

const { height, width } = Dimensions.get("window");

const DetailScreen = ({route, navigation}) => {

    const { info } = route.params;

    const [label, setLabel] = useState(info.label);
    const [error, setError] = useState(false);
    const [openLabelModal, setOpenLabelModal]= useState(false);
    const [openDeleteModal, setOpenDeleteModal]= useState(false);

    const handleBackButton = () => {
        navigation.replace('Archive');
    }

    const handleDelete = async () => {
        try {
            handleCloseDeleteModal();
            let form_data = new FormData();
            form_data.append("prediction_id", info.index);
            await deletePrediction(form_data);
            navigation.replace('Archive');
        }
        catch(e) {
            setError(true);
        }
    }

    const handleOpenDeleteModal = () => {
        setOpenDeleteModal(true);
    }

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    }

    const handleOpenLabelModal  = () => {
        setOpenLabelModal(true);
    }

    const handleCloseLabelModal = () => {
        setOpenLabelModal(false);
    }

    const handleSaveLabel = async (labelInput) => {
        try {
            let form_data = new FormData();
            form_data.append("prediction_id", info.index);
            form_data.append("label", labelInput);
            setLabel(labelInput);
            handleCloseLabelModal();
            await savePredictionLabel(form_data);
        }
        catch(e) {
            setError(true);
        }
    }


    const onShare = async () => {
        const resultMessage = [
            `[${label}] 골재 이미지 품질 진단 시스템의 분석 결과, 토분이 0으로 사용하기 적합한 골재입니다.`,
            `[${label}] 골재 이미지 품질 진단 시스템의 분석 결과, 토분이 0 초과 100 미만으로 사용하기 적합한 골재입니다.`,
            `[${label}] 골재 이미지 품질 진단 시스템의 분석 결과, 토분이 100 이상으로 사용하기 적합하지 않은 골재입니다.`
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
                setError(true);
            }
    };

    const handleCloseErrorModal = () => {
        setError(false);
    }



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
                        <Text style={[styles.resultText, { color: '#64b2cd'}]}>우수</Text>
                        <Image source={greatIcon} style={styles.iconStyle}/>
                    </View>
                    :
                    info.classification === 1 ?
                    <View style={[styles.resultBox]}>
                        <Text style={[styles.resultText, { color: '#6b8c42'}]}>보통</Text>
                        <Image source={checkIcon} style={styles.iconStyle}/>
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
                    '골재 이미지 품질 진단 시스템의 분석 결과, 토분이 0으로 사용하기 적합한 골재입니다.'
                    :
                    info.classification === 1 ?
                    '골재 이미지 품질 진단 시스템의 분석 결과, 토분이 0 초과 100 미만으로 사용하기 적합한 골재입니다.'
                    :
                    '골재 이미지 품질 진단 시스템의 분석 결과, 토분이 100 이상으로 사용하기 적합하지 않은 골재입니다.'
                    }
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.deleteButton} onPress={handleOpenDeleteModal}>
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
            {openDeleteModal &&
                <DeleteModal handleClose={handleCloseDeleteModal}  handleDelete={handleDelete}/>
            }
            {error &&
                <ErrorModal handleClose={handleCloseErrorModal} />
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: height,
        position: 'relative',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        position: 'absolute',
        width: width,
        zIndex: 5,
        top: 30,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    backIconStyle:{
        width: 35,
        height: 35,
    },
    imageStyle: { 
        width: width,
        height: width-20,
        maxHeight: height/2-20
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
        lineHeight: 36,
    },
    date: {
        fontFamily: 'NotoSansKR-Regular',
        fontSize: 16,
        letterSpacing: -0.45,
        lineHeight: 24,
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
        lineHeight: 24,
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
        lineHeight: 24,
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
        opacity: 0.4,
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
        position: 'absolute',
        bottom: 80
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
        backgroundColor: '#8ac6d1',
        opacity: 0.7,
    },
    deleteButtonText: {
        fontFamily: 'NotoSansKR-Regular',
        fontSize: 14,
        letterSpacing: -0.45,
        lineHeight: 20,
    },
    shareButtonText: {
        fontFamily: 'NotoSansKR-Bold',
        fontSize: 14,
        letterSpacing: -0.45,
        lineHeight: 20,
    }
});

export default DetailScreen;
