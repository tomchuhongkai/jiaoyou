import React, { Component } from 'react'
import { View, Button, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert,ScrollView } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { observer, inject } from 'mobx-react'
import * as api from './mocks/api'
import * as tools from './tools/tool'
import commonStyle from './tools/commonstyles'
import {config,scaleSize,clearBoxPng} from './tools/util'
import Loading from "./pages/components/loading"
import ErrorInfo from './pages/components/error'
import BackButton from './pages/components/backButton'
import HeaderTitle from './pages/components/headerTitle'
import RightButton from './pages/components/rightButton'

@inject('store')
@observer
class ForgotPassword extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <HeaderTitle Title="修改密码" />,
            headerLeft: <BackButton goBack={navigation.goBack} />,
            headerRight: <RightButton />,
            headerStyle: {
                height: config.headerHeight,
                shadowOpacity: 0
            }
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            Email: '',
            Disabled: false
        }
    }

    clearForm = (fieldName) => {
        switch (fieldName) {
            case 'Email':
                this.setState({
                    Email: ''
                })
                break;
            default:
                break;
        }
    }
    Save = () => {
        if (this.state.Email === '') {
            Alert.alert('提示', "请输入您的电子邮箱");
            return;
        }
        this.setState({
            Disabled: true
        })
        api.ForgotPassword(this.state.Email)
            .then(res => {
                this.setState({
                    Disabled: false
                })
                if (res.data.result === 1) {
                    this.props.navigation.push('AuthResetPassword', { email: this.state.Email });
                } else {
                    Alert.alert('提示', res.data.message);
                }
            }, (err) => {
                this.setState({
                    Disabled: false
                })
            })
    }
    render() {
        return (<SafeAreaView style={commonStyle.safeView}>
        <ScrollView  style={{ width: '100%', height: '100%' }} contentContainerStyle={commonStyle.scrollViewContainer}> 
            <View style={commonStyle.fields_line}>
                <Text style={commonStyle.fields_label}>电子邮箱</Text>
                <TextInput placeholder='请输入您的电子邮箱' onChangeText={(v) => { this.setState({ Email: v }) }} value={this.state.Email} style={commonStyle.fields_textbox} />
                <View style={commonStyle.clearBox}>
                    <TouchableOpacity onPress={() => this.clearForm('Email')}>
                        <Image source={clearBoxPng} style={{ width: scaleSize(40), height: scaleSize(40) }} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[commonStyle.fields_line]}>
                <TouchableOpacity onPress={() => this.Save()} style={[commonStyle.fullWidthButton, this.state.Disabled ? commonStyle.fullWidthButton_Disabled : null]}>
                    <Text style={commonStyle.fullWidthButton_text}>找回密码</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
            <Loading />
            <ErrorInfo />
        </SafeAreaView>);
    }
}

export default ForgotPassword;
