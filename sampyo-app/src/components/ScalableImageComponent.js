import React, { Component } from 'react';
import { Image } from 'react-native';

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

        const widthCalculated = aspectRatio > 1 ? containerWidth: containerHeight*aspectRatio;
        const heightCalculated = aspectRatio > 1 ? containerWidth/aspectRatio: containerHeight;
        // const widthCalculated = containerHeight*aspectRatio;
        // const heightCalculated = containerHeight;

        console.log('contianer',containerHeight, 'aspect', aspectRatio)
        console.log('calculated',widthCalculated,heightCalculated)

        return (
            <Image
                source={source}
                style={[
                    style,
                    {
                        width: widthCalculated,
                        height: heightCalculated,
                        transform: aspectRatio > 1 ? [{ rotate: '90deg' }]: [{ rotate: '0deg' }]
                    }
                ]}
            />
        )
    }

}