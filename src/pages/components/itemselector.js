import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity,Image } from 'react-native'
import { observer, inject } from 'mobx-react'
import { scaleSize } from '../../tools/util'
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');

class ItemSelector extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let itemSelectedStyle = [styles.item, styles.selectedItem];
        let itemSelectedTextStyle = [styles.item_text, styles.selectedItem_text];
        let itemStyle = [styles.item];
        let itemTextStyle = [styles.item_text];
        let itemStyleLogin=[styles.item2];
        switch (this.props.theme) {
            default:
                break;
            case 'square':
                itemSelectedStyle = [styles.square_item, styles.square_selectedItem];
                itemSelectedTextStyle = [styles.square_item_text, styles.square_selectedItem_text];
                itemStyle = [styles.square_item];
                itemTextStyle = [styles.square_item_text];
                break;
        }
        if (this.props.buttonStyle !== undefined) {
            itemSelectedStyle.push(this.props.buttonStyle);
            itemStyle.push(this.props.buttonStyle);
        }
        if (this.props.mode !== undefined && this.props.mode === 'multiSelector') {
            return <TouchableOpacity onPress={() => { this.props.onChange(!this.props.value) }}>
                {this.props.value ? <View style={[itemSelectedStyle,this.props.width!==undefined?{width:scaleSize(this.props.width)}:null]}><Text style={itemSelectedTextStyle} numberOfLines={1}>{this.props.title}</Text></View> :
                    <View style={[itemStyle,this.props.width!==undefined?{width:scaleSize(this.props.width)}:null]}><Text style={itemTextStyle} numberOfLines={1}>{this.props.title}</Text></View>}
            </TouchableOpacity>
        } else {
            if(this.props.typepage==='login'){
                var items = this.props.data.map((item, index) => {
                        return <TouchableOpacity onPress={() => { this.props.onChange(item.key) }} key={index}>
                        {this.props.value === item.key ?
                        <View style={itemStyleLogin}>
                            {item.key==="Customer"?<Image style={styles.img} source={require('../../../images/Customer-selected.png')}/>:<Image style={styles.img} source={require('../../../images/Manager-selected.png')}/>}
                            <Text style={itemSelectedTextStyle}>{item.value}</Text></View> :
                            <View style={itemStyleLogin}>
                                {item.key==="Customer"?<Image style={styles.img} source={require('../../../images/Customer-unselected.png')}/>:<Image style={styles.img} source={require('../../../images/Manager-unselected.png')}/>}
                                <Text style={itemTextStyle}>{item.value}</Text></View>}
                    </TouchableOpacity>
                })
                return <View style={styles.checkboxContainer2}>{items}<View style={styles.line}></View></View>
            }else {
                var items = this.props.data.map((item, index) => {
                    return <TouchableOpacity onPress={() => { this.props.onChange(item.key) }} key={index}>
                        {this.props.value === item.key ? <View style={[itemSelectedStyle,item.width!==undefined?{width:scaleSize(item.width)}:null]}><Text style={itemSelectedTextStyle} numberOfLines={1}>{item.value}</Text></View> :
                            <View style={[itemStyle,item.width!==undefined?{width:scaleSize(item.width)}:null]}><Text style={itemTextStyle} numberOfLines={1}>{item.value}</Text></View>}
                    </TouchableOpacity>
                })
                return <View style={[styles.checkboxContainer]}>{items}</View>
            }
        }
    }
}

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        marginRight: 10,
        flexWrap:'wrap'
    },
    item: {
        width: scaleSize(180),
        height: scaleSize(70),
        borderWidth: 1,
        borderColor: '#cccccc',
        backgroundColor: '#f6f6f6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scaleSize(35),
        marginRight: scaleSize(20),
        marginBottom:scaleSize(20)
    },
    item_text: {
        color: '#666666',
        fontSize: scaleSize(30),
    },
    selectedItem: {
        borderColor: '#339ff4',
        backgroundColor: '#f4f8ff'
    },
    selectedItem_text: {
        color: '#2196f3',
    },
    square_item: {
        width: scaleSize(196),
        height: scaleSize(60),
        borderWidth: scaleSize(1),
        borderColor: '#f4f4f4',
        backgroundColor: '#f4f4f4',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scaleSize(10),
        marginRight: scaleSize(20),
        marginBottom:scaleSize(20)
    },
    square_item_text: {
        color: '#666666',
        fontSize: scaleSize(28),
    },
    square_selectedItem: {
        borderColor: '#2196f3',
        backgroundColor: '#2196f3'
    },
    square_selectedItem_text: {
        color: '#fff',
    },
    checkboxContainer2: {
        flexDirection: 'row',
        justifyContent: "space-around",
    },
    item2: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: scaleSize(70),
        height: scaleSize(86),
        marginBottom: scaleSize(24)
    },
    line: {
        width: 1, height: scaleSize(80), backgroundColor: "#ccc",
        position: "absolute", left: (width - scaleSize(80)) / 2, top: scaleSize(16)
    }
})

export default ItemSelector
