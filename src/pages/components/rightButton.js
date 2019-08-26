import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import { scaleSize } from '../../tools/util';

class RightButton extends Component {
    render() {
        if (this.props.children === undefined || this.props.children === null || this.props.children.length === 0) {
            return <View style={{ marginRight: scaleSize(40), width: scaleSize(130) }}></View>;
        }
        return (<View style={{ marginRight: scaleSize(40), width: scaleSize(130),flex:1,justifyContent:'flex-end',flexDirection:'row' }}>
            {this.props.children}
        </View>);
    }
}

export default RightButton;