import React, { useEffect, useRef, useState } from 'react'
import { Animated, View, PanResponder, Dimensions, StyleSheet } from 'react-native'

const ImageCropOverlay = (props) => {

    const cropOverlayRatio = 17/30;
    const containerHeight = props.containerHeight;

    const pan = useRef(new Animated.ValueXY()).current;
    
    // useEffect(()=>{
    //     console.log(pan.x)
    // },[pan.x, pan.y])
    


    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.setOffset({
                    x: pan.x._value,
                    y: pan.y._value
                });
                console.log(pan.x,pan.y)
            },
            onPanResponderMove: Animated.event(
            [
                null,
                { dx: pan.x, dy: pan.y }
                
            ],
            { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                pan.flattenOffset();
            }
        })
    ).current;

    const styles = StyleSheet.create({
        cropper: {
            width: containerHeight*cropOverlayRatio,
            height: containerHeight,
        },
        cropperWrap: {
            borderWidth: 155,
            borderColor: 'rgba(242, 242, 242, .7)',
        }
    });

    return (
        <Animated.View
                style={{
                    transform: [
                    {
                        translateX: pan.x.interpolate({
                            inputRange: [-177, 0],
                            outputRange: [-177,0],
                            extrapolate: 'clamp'
                        })
                    }, 
                    {
                        // translateY: pan.y
                        translateY: pan.y.interpolate({
                            inputRange: [-190, 0],
                            outputRange: [-190,0],
                            extrapolate: 'clamp'
                        })
                    }],
                    position: 'absolute',
                    zIndex: 2,
                }}
            {...panResponder.panHandlers}
        >
            <View style={styles.cropperWrap}>
                <View style={styles.cropper} />
            </View>
        </Animated.View>
    )
    
}


export default ImageCropOverlay;