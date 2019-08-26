import React, { Component } from 'react'
import { View,Text,TouchableOpacity,Image } from 'react-native'
import { scaleSize } from '../../tools/util';

class BackButton extends Component {
    render() {
        return (<View style={{marginLeft:scaleSize(40),width:scaleSize(130)}}><TouchableOpacity onPress={()=>this.props.goBack()}><Image style={{width:scaleSize(24),height:scaleSize(42)}} source={require('../../../images/back_icon.png')} /></TouchableOpacity></View>);
    }
}

export default BackButton;