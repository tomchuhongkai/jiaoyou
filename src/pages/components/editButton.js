import React, { Component } from 'react'
import { View,Text,TouchableOpacity } from 'react-native'
import { scaleSize } from '../../tools/util';

class EditButton extends Component {
    render() {
        return (<View style={{marginLeft:scaleSize(40),width:scaleSize(100)}}><TouchableOpacity onPress={()=>this.props.action()}><Text style={{color:'#2196f3',fontSize:scaleSize(26)}}>{this.props.ButtonName}</Text></TouchableOpacity></View>);
    }
}

export default EditButton;