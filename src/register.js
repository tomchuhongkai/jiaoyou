import React, { Component } from 'react'
import { View, Button, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { observer, inject } from 'mobx-react'
import * as api from './mocks/api'
import * as tools from './tools/tool'
import { scaleSize, config, clearBoxPng } from './tools/util'
import commonStyle from './tools/commonstyles'
import Loading from "./pages/components/loading"
import ErrorInfo from './pages/components/error'
import BackButton from './pages/components/backButton'
import HeaderTitle from './pages/components/headerTitle'
import RightButton from './pages/components/rightButton'


@inject('store')
@observer
class Register extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <HeaderTitle Title="注册会员" />,
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
            NewPassword: '',
            ConfirmPassword: '',
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
            case 'NewPassword':
                this.setState({
                    NewPassword: ''
                })
                break;
            case 'ConfirmPassword':
                this.setState({
                    ConfirmPassword: ''
                })
                break;
            default:
                break;
        }
    }
    Save = () => {
        if (this.state.Email === '') {
            Alert.alert('提示', "请输入您的电子邮箱", [{
                text: '确认', onPress: () => {

                }
            }]);
            return;
        }
        if (this.state.NewPassword === '') {
            Alert.alert('提示', "请输入您的新密码", [{
                text: '确认', onPress: () => {

                }
            }]);
            return;
        }
        if (this.state.ConfirmPassword === '') {
            Alert.alert('提示', "请输入确认密码", [{
                text: '确认', onPress: () => {

                }
            }]);
            return;
        }

        if (this.state.ConfirmPassword !== this.state.NewPassword) {
            Alert.alert('提示', "对不起，两次输入的密码不一致", [{
                text: '确认', onPress: () => {

                }
            }]);
            return;
        }

        this.setState({
            Disabled: true
        })
        api.Register({
            Email: this.state.Email,
            Password: this.state.NewPassword,
            RePassword: this.state.ConfirmPassword
        })
            .then(res => {
                this.setState({
                    Disabled: false
                })
                if (res.data.result === 1) {
                    this.props.navigation.replace('RegisterActive', { email: this.state.Email });
                } else {
                    Alert.alert('提示', res.data.message, [{
                        text: '确认', onPress: () => {

                        }
                    }]);
                }
            }, (err) => {
                this.setState({
                    Disabled: false
                })
            })
    }
    render() {
        return (<SafeAreaView style={commonStyle.safeView}>
            <ScrollView style={{ width: '100%', height: '100%' }} contentContainerStyle={commonStyle.scrollViewContainer}>
                <View style={commonStyle.fields_line}>
                    <Text style={commonStyle.fields_label}>电子邮箱</Text>
                    <TextInput placeholder='请输入您的电子邮箱' onChangeText={(v) => { this.setState({ Email: v }) }} value={this.state.Email} style={commonStyle.fields_textbox} />
                    <View style={commonStyle.clearBox}>
                        <TouchableOpacity onPress={() => this.clearForm('Email')}>
                            <Image source={clearBoxPng} style={{ width: scaleSize(40), height: scaleSize(40) }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={commonStyle.fields_line}>
                    <Text style={commonStyle.fields_label}>您的新密码</Text>
                    <TextInput placeholder='请输入您的新密码' secureTextEntry={true} type="password" onChangeText={(v) => { this.setState({ NewPassword: v }) }} value={this.state.NewPassword} style={commonStyle.fields_textbox} />
                    <View style={commonStyle.clearBox}>
                        <TouchableOpacity onPress={() => this.clearForm('NewPassword')}>
                            <Image source={clearBoxPng} style={{ width: scaleSize(40), height: scaleSize(40) }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={commonStyle.fields_line}>
                    <Text style={commonStyle.fields_label}>确认新密码</Text>
                    <TextInput placeholder='请确认您的新密码' secureTextEntry={true} type="password" onChangeText={(v) => { this.setState({ ConfirmPassword: v }) }} value={this.state.ConfirmPassword} style={commonStyle.fields_textbox} />
                    <View style={commonStyle.clearBox}>
                        <TouchableOpacity onPress={() => this.clearForm('ConfirmPassword')}>
                            <Image source={clearBoxPng} style={{ width: scaleSize(40), height: scaleSize(40) }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[commonStyle.fields_line]}>
                    <TouchableOpacity onPress={() => this.Save()} style={[commonStyle.fullWidthButton, this.state.Disabled ? commonStyle.fullWidthButton_Disabled : null]}>
                        <Text style={commonStyle.fullWidthButton_text}>保存</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Loading />
            <ErrorInfo />
        </SafeAreaView>);
    }
}

export default Register;