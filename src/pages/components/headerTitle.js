import React, { Component } from 'react'
import { View,Text } from 'react-native'
import { scaleSize } from '../../tools/util';

class HeaderTitle extends Component {
    render() {
        return ( <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text style={[{ color: '#000000', fontSize: scaleSize(36) },this.props.textStyle]}>{this.props.Title}</Text></View>);
    }
}

export default HeaderTitle;