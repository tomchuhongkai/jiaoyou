import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { scaleSize } from './tools/util';
import AsyncStorage from '@react-native-community/async-storage';
import Swiper from 'react-native-swiper';
const { width, height } = Dimensions.get('window')
import * as tools from '../src/tools/tool'
import { TouchableOpacity } from 'react-native-gesture-handler';

class LandingPage extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#34495e'
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            counter: 3
        }
    }
    componentDidMount = () => {
        let that = this;
        // this.Interval = setInterval(() => {
        //     if (that.state.counter === 0) {
        //         clearInterval(that.Interval);
        //         that.Interval = null;
        //         //that.redirectToPage();
        //     } else {
        //         let _counter = that.state.counter;
        //         that.setState({
        //             counter: _counter - 1
        //         })
        //     }
        // }, 1000);
        this.NextPage = 'SignIn';
        AsyncStorage.getItem('AUTHTOKEN').then((v) => {
            var vNew = JSON.parse(v);
            if (vNew !== undefined && vNew !== null && vNew !== "") {
                tools.SetAuthorization(vNew.token);
                if (vNew.needConfirmEmail === 'True') {
                    that.NextPage = 'RegisterActive';
                }
                else if (vNew.needRegisterInfo === 'True') {
                    that.NextPage = "RegisterInfo";
                } else {
                    if (vNew.type === 'Customer') {
                        that.NextPage = "CustomerMain";
                    } else {
                        that.NextPage = "ManagerMain";
                    }
                }
            }
        })
    }
    redirectToPage = () => {
        switch (this.NextPage) {
            case 'SignIn':
                this.props.navigation.navigate('SignIn');
                break;
            case 'RegisterActive':
                this.props.navigation.navigate('RegisterActive', { email: '' });
                break;
            case 'RegisterInfo':
                this.props.navigation.navigate('RegisterInfo');
                break;
            case 'CustomerMain':
                this.props.navigation.navigate('CustomerMain');
                break;
            case 'ManagerMain':
                this.props.navigation.navigate('ManagerMain');
                break;
        }
    }
    componentWillUnmount = () => {
        // if (this.Interval !== null) {
        //     clearInterval(this.Interval);
        //     this.Interval = null;
        // }
    }
    render() {
        return (
            <View style={{ flex: 1, position: 'relative' }}>
                <Swiper style={styles.wrapper} showsButtons={false} loop={false} autoplay={true} autoplayTimeout={2.5}>
                    <View style={styles.container}>
                        <Image
                            style={styles.image}
                            source={require('../images/launch_screen.jpg')}
                            resizeMode='cover'
                        />
                    </View>
                    <View style={styles.container}>
                        <Image
                            style={styles.image}
                            source={require('../images/slide-2.jpg')}
                            resizeMode='cover'
                        />
                        <View style={styles.waiting}>
                            <TouchableOpacity style={styles.waiting_button} onPress={() => this.redirectToPage()}>
                                <Text style={{ color: '#1890ff', textAlignVertical: 'center', alignSelf: 'center', fontSize: scaleSize(26) }}>进入速贷</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Swiper>
            </View>
        );
    }
}
export default LandingPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    backgroundImage: {
        // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        width,
        height,
        backgroundColor: 'transparent',
        position: 'absolute'
    },
    waiting: {
        position: 'absolute',
        bottom: scaleSize(100),
        left: 0,
        right: 0,
        zIndex: 999,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    waiting_button: {
        height: scaleSize(60),
        width: scaleSize(200),
        borderWidth: scaleSize(1),
        borderColor: '#1890ff',
        borderRadius: scaleSize(10),
        flexDirection:'column',
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center'
    },
    image: {
        width,
        height,
    }
});