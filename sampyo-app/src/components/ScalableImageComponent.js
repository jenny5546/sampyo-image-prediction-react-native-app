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
            this.setState({
                aspectRatio: width/height
            })
        });
    }

    render() {
        const { source, containerHeight, style } = this.props;
        const { aspectRatio } = this.state;

        const widthCalculated = containerHeight*aspectRatio;
        const heightCalculated = containerHeight;

        return (
            <Image
                source={source}
                style={[
                    style,
                    {
                        width: widthCalculated,
                        height: heightCalculated,
                    }
                ]}
            />
        )
    }

}