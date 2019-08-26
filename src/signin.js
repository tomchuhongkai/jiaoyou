import React, { Component } from 'react'
import { View, Text, Button, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { observer, inject } from 'mobx-react'
import { SafeAreaView } from 'react-navigation'
import LogoImage from '../src/pages/components/logo'
import Loading from "../src/pages/components/loading"
import ErrorInfo from '../src/pages/components/error'
import * as api from '../src/mocks/api'
import * as tools from '../src/tools/tool'
import AsyncStorage from '@react-native-community/async-storage';
import { scaleSize } from './tools/util'
import ItemSelector from '../src/pages/components/itemselector';
import commonStyle from './tools/commonstyles'

@inject('store')
@observer
class SignIn extends Component {
    static navigationOptions = {
        headerTitle: <LogoImage Title='登录账号' />,
    }
    componentDidMount = () => {
        AsyncStorage.getItem('AUTHTOKEN').then((v) => {
            var vNew = JSON.parse(v);
            if (vNew !== undefined && vNew !== null && vNew !== "") {
                tools.SetAuthorization(vNew.token);
                if (vNew.needConfirmEmail === 'True') {
                    this.props.navigation.push('RegisterActive', { email: '' });
                }
                else if (vNew.needRegisterInfo === 'True') {
                    this.props.navigation.navigate('RegisterInfo');
                } else {
                    if (vNew.type === 'Customer') {
                        this.props.navigation.navigate('CustomerMain');
                    } else {
                        this.props.navigation.navigate('ManagerMain')
                    }
                }
            }
        })
    }
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'Customer',
            email: '',
            password: '',
            Disabled: false
        }
    }
    changeTab = (tabName) => {
        this.setState({
            selectedTab: tabName
        })
    }
    clearForm = (fieldName) => {
        switch (fieldName) {
            case 'UserName':
                this.setState({
                    email: ''
                })
                break;
            case 'Password':
                this.setState({
                    password: ''
                })
                break;
            default:
                break;
        }
    }
    Submit = () => {
        if (this.state.email === '') {
            Alert.alert('消息提示', '请输入您的邮箱');
            return;
        }
        if (this.state.password === '') {
            Alert.alert('请输入您的密码');
            return;
        }

        this.setState({
            Disabled: true
        })
        api.Token(`username=${this.state.email}&password=${this.state.password}&grant_type=password`,`registractionId=${this.props.store.config.registrationId}&device=ios&type=${this.state.selectedTab}`)
            .then(res => {
                this.setState({
                    Disabled: false
                })
                tools.SetSiteToken(res.data.access_token, res.data.roleName, res.data.addCustomerFirst, res.data.needConfirmEmail);
                if (res.data.needConfirmEmail === 'True') {
                    //go to confirm email page
                    this.props.navigation.push('RegisterActive', { email: this.state.email });
                } else if (res.data.addCustomerFirst === 'True') {
                    this.props.navigation.push('RegisterInfo');
                } else {
                    this.props.store.customer.changeProfile({
                        name: res.data.name
                    })
                    switch (res.data.roleName) {
                        default:
                            break;
                        case 'Customer':
                            this.props.navigation.navigate('CustomerMain');
                            break;
                        case 'Manage':
                            this.props.navigation.navigate('ManagerMain');
                            break;
                    }
                }
            }, (err) => {
                this.setState({
                    Disabled: false
                })
            })
    }
    render() {
        let _classOne = [styles.tabItem];
        let _classTwo = [styles.tabItem, styles.tabItemTwo];
        if (this.state.selectedTab === 1) {
            _classOne.push(styles.tabItemActive);
        } else {
            _classTwo.push(styles.tabItemActive)
        }
        return (<SafeAreaView style={commonStyle.safeView}>
            <ScrollView style={{ width: '100%', height: '100%' }} contentContainerStyle={commonStyle.scrollViewContainer}>
                <View style={[commonStyle.fields_line,{marginTop:scaleSize(80),paddingBottom:scaleSize(40)}]}>
                    <ItemSelector typepage="login" value={this.state.selectedTab} data={[{ key: 'Manager', value: '经理人' }, { key: 'Customer', value: '客户' }]} onChange={(v) => { this.changeTab(v) }} />
                </View>
                <View style={commonStyle.fields_line}>
                    <Text style={commonStyle.fields_label}>您的账号</Text>
                    <TextInput placeholder='请输入您的账号' returnKeyType="next" onChangeText={(v) => { this.setState({ email: v }) }} value={this.state.email} style={commonStyle.fields_textbox} />
                    <View style={commonStyle.clearBox}>
                        <TouchableOpacity onPress={() => this.clearForm('UserName')}>
                            <Image source={require('../images/clearbox.png')} style={{ width: scaleSize(40), height: scaleSize(40) }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={commonStyle.fields_line}>
                    <Text style={commonStyle.fields_label}>您的密码</Text>
                    <TextInput placeholder='请输入您的密码' returnKeyType="next" type="password" secureTextEntry={true} onChangeText={(v) => { this.setState({ password: v }) }} value={this.state.password} style={commonStyle.fields_textbox} />
                    <View style={commonStyle.clearBox}>
                        <TouchableOpacity onPress={() => this.clearForm('Password')}>
                            <Image source={require('../images/clearbox.png')} style={{ width: scaleSize(40), height: scaleSize(40) }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={commonStyle.fields_line}>
                    <TouchableOpacity onPress={() => { this.props.navigation.push('ForgotPassword') }}>
                        <Text style={{ fontSize: scaleSize(24), color: '#2196f3', alignSelf: 'flex-end' }}>忘记密码？</Text>
                    </TouchableOpacity>
                </View>
                <View style={[commonStyle.fields_line, { marginTop: scaleSize(20) }]}>
                    <TouchableOpacity onPress={() => this.Submit()} style={[commonStyle.fullWidthButton, this.state.Disabled ? commonStyle.fullWidthButton_Disabled : null]}>
                        <Text style={commonStyle.fullWidthButton_text}>登录</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Loading />
            <ErrorInfo />
            <View style={styles.register}>
                <TouchableOpacity style={styles.register_item} onPress={() => { this.props.navigation.push('Register') }}>
                    <Text style={styles.register_text}>没有账号？去注册</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    register: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    register_item: {
        position: 'absolute',
        bottom: scaleSize(50),
    },
    register_text: {
        color: '#ff9500',
        fontSize: scaleSize(24)
    }
})

export default SignIn;