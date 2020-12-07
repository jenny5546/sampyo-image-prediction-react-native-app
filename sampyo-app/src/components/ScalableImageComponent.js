import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
const { height, width } = Dimensions.get("window");
export default class ScalableImageComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            aspectRatio: 1, 
        }
    }

    componentDidMount() {
        const { source } = this.props;
        Image.getSize(source, (width, height) => {
            console.log('image', width, height)
            this.setState({
                aspectRatio: width/height
            })
        });

        
    }

    render() {
        const { source, containerWidth, containerHeight, style } = this.props;
        const { aspectRatio } = this.state;

        return (
            <Image
                source={source}
                style={[
                    style,
                    {
                        width: aspectRatio > 1 ? containerHeight: containerWidth,
                        height: containerHeight,
                        transform: aspectRatio > 1 ? [{ rotate: '90deg' }]: [{ rotate: '0deg' }],
                        // resizeMode: 'contain',
                        // flex: 1,
                    }
                ]}
            />
        )
    }

}