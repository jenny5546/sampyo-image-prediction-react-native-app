import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image'
const { height, width } = Dimensions.get("window");
export default class ScalableImageComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            aspectRatio: 1, 
            originalHeight: 1,
        }
    }

    componentDidMount() {
        const { source } = this.props;
        Image.getSize(source, (width, height) => {
            this.setState({
                aspectRatio: width/height,
                originalHeight: height
            })
        });

        
    }

    render() {
        const { source, containerWidth, containerHeight, style } = this.props;
        const { aspectRatio, originalHeight } = this.state;

        return (
            <Image
                source={source}
                style={[
                    style,
                    {
                        width: aspectRatio > 1 ? containerHeight: containerWidth,
                        height: containerHeight,
                        transform: aspectRatio > 1 ? [{ rotate: '90deg' }]: [{ rotate: '0deg' }],
                    }
                ]}
            />
        )
    }

}