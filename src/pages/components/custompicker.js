import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, Button } from 'react-native'
import { scaleSize } from '../../tools/util';
import Modal from 'react-native-modal'

class CustomPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Visible: false,
        }
    }
    render() {
        let firstItem = this.props.Items.length > 0 ? this.props.Items[0] : "";
        if (this.props.Items.length > 0) {

            let selectedItems = typeof (firstItem) === 'object' ? this.props.Items.filter(i => i.Value === this.props.SelectedValue)
                : this.props.Items.filter(i => i === this.props.SelectedValue);
            if (selectedItems.length > 0) {
                firstItem = selectedItems[0];
            }
        }
        let length = this.props.Items.length;
        let _height = 62 * length + 100;
        if (_height > 600) {
            _height = 600
        }
        return (
            <View>
                <TouchableOpacity onPress={() => { this.setState({ Visible: true }) }}>
                    <View style={[styles.item_line, styles.select_style, this.props.style === undefined ? null : this.props.style]}>
                        <Text style={[styles.item_text, { alignSelf: 'flex-start', color: '#9b9b9b' }, this.props.textStyle === undefined ? null : this.props.textStyle]}>{typeof (firstItem) === 'object' ? firstItem.Text : firstItem}</Text>
                        <Image source={require('../../../images/dropdown.png')} style={[styles.dropIcon, this.props.iconStyle === undefined ? null : this.props.iconStyle]} />
                    </View>
                </TouchableOpacity>
                <Modal isVisible={this.state.Visible} onBackdropPress={() => { this.setState({ Visible: false }) }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <View style={[styles.dialog, { height: scaleSize(_height) }]}>
                            <FlatList
                                contentContainerStyle={{ flexGrow: 1 }}
                                data={this.props.Items}
                                extraData={this.props}
                                keyExtractor={this._keyExtractor}
                                renderItem={this._renderItem}>
                            </FlatList>
                            <View style={styles.dialog_title}>
                                <TouchableOpacity style={styles.dialog_closeBtn} onPress={() => this.setState({ Visible: false })} >
                                    <Text style={{ color: '#fff', fontSize: scaleSize(30), alignSelf: 'center' }}>关闭</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>)
    }
    _keyExtractor = (item, index) => {
        return index.toString();
    }
    _renderItem = ({ item }) => {
        let v = typeof (item) === 'object' ? item.Value : item;
        return (<View style={styles.item_line}>
            <TouchableOpacity onPress={() => { this.setState({ Visible: false }); this.props.onChange(v); }} >
                <Text style={styles.item_text}>{typeof (item) === 'object' ? item.Text : item}</Text>
            </TouchableOpacity>
        </View>)
    }
}

export default CustomPicker;

const styles = StyleSheet.create({
    dialog: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: scaleSize(10),
        padding: scaleSize(15),
        position: 'relative',
        paddingBottom: scaleSize(90)
    },
    dialog_title: {
        height: scaleSize(100),
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dialog_closeBtn: {
        width: '80%',
        backgroundColor: '#2196f3',
        borderWidth: scaleSize(1),
        borderColor: '#339ff4',
        borderRadius: scaleSize(30),
        height: scaleSize(60),
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    item_line: {
        height: scaleSize(60),
        lineHeight: scaleSize(60),
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    item_text: {
        fontSize: scaleSize(28),
        color: '#000',
    },
    select_style: {
        alignItems: 'flex-start',
        borderColor: '#2196f3',
        borderWidth: scaleSize(1),
        borderRadius: scaleSize(10),
        paddingLeft: scaleSize(20),
        paddingRight: scaleSize(50),
        height: scaleSize(70),
        position: 'relative'
    },
    dropIcon: {
        width: scaleSize(32),
        height: scaleSize(32),
        position: 'absolute',
        right: scaleSize(10),
        top: scaleSize(15)
    }
})