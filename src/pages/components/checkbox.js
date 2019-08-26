import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, TouchableHighlight } from 'react-native'
import { observer, inject } from 'mobx-react'
import { scaleSize } from '../../tools/util';

class CheckBox extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let checked = require('../../../images/checked.png');
        let unChecked = require('../../../images/check.png');
        if (this.props.mode != 'single') {
            return (<TouchableHighlight underlayColor='#fff' onPress={() => { this.props.onChange(!this.props.isChecked) }}><View style={styles.checkboxContainer}>
                {this.props.isChecked ? <Image source={checked} style={styles.imageSize} /> :
                    <Image source={unChecked} style={styles.imageSize} />}
                <Text style={{ color: '#000', fontSize: scaleSize(30) }}>{this.props.label}</Text>
            </View></TouchableHighlight>);
        } else {
            var items = this.props.data.map((item, index) => {
                return <View style={this.props.bodyStyle} key={index}>
                    <TouchableHighlight onPress={() => { this.props.onChange(item.key) }}>
                        <View style={styles.checkboxContainer}>
                            {this.props.value === item.key ? <Image source={checked} style={styles.imageSize} /> :
                                <Image source={unChecked} style={styles.imageSize} />}
                            <Text style={{ color: '#000', fontSize: scaleSize(30) }}>{item.value}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            })
            return <View style={styles.checkboxContainer}>{items}</View>
        }
    }
}

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        marginRight: 10
    },
    imageSize: {
        marginRight: 5,
        marginTop: 3
    }
})

export default CheckBox
