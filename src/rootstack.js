import React from 'react'
import { createBottomTabNavigator, createSwitchNavigator, createStackNavigator, createDrawerNavigator, DrawerActions, DrawerItems } from 'react-navigation'
import { Image, Text, View, ScrollView } from 'react-native'
import SignIn from './signin'
import ForgotPassword from './forgotpassword'
import Register from './register'
import AuthResetPassword from './authresetpassword'
import RegisterActive from './registeractive'
import LandingPage from './landingpage'
import CustomerStacks from './customerstacks'
import ManagerStacks from './managerstacks'
import Manager from './pages/customer/manager'
import RegisterInfo from './pages/customer/registerinfo'
import { scaleSize } from './tools/util';

const customerMainStack = createBottomTabNavigator(CustomerStacks, {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarLabel: ({focused}) => {
            const { routeName } = navigation.state;
            switch (routeName) {
                default:
                case 'Home':
                    return <Text style={{ textAlign: 'center',fontSize:scaleSize(24),color:focused?'#2196f3':'#cbd4d4' }}>首页</Text>;
                case 'Search':
                    return <Text style={{ textAlign: 'center',fontSize:scaleSize(24),color:focused?'#2196f3':'#cbd4d4' }}>搜索</Text>;
                case 'Managers':
                    return <Text style={{ textAlign: 'center',fontSize:scaleSize(24),color:focused?'#2196f3':'#cbd4d4' }}>贷款经理</Text>;
                case 'Messages':
                    return <Text style={{ textAlign: 'center',fontSize:scaleSize(24),color:focused?'#2196f3':'#cbd4d4' }}>消息</Text>;
                case 'Settings':
                    return <Text style={{ textAlign: 'center',fontSize:scaleSize(24),color:focused?'#2196f3':'#cbd4d4' }}>设置</Text>;
            }
        },
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let focusedImg = imageList[routeName];
            let unFocusedImg = imageList[routeName + "2"];
            if (focused) {
                return (<Image source={focusedImg} style={{ width:  scaleSize(44), height: scaleSize(44) }} />)
            }
            return (<Image source={unFocusedImg} style={{ width:  scaleSize(44), height:  scaleSize(44) }} />)
        }
    }),
    tabBarOptions:{
        style:{
            height:scaleSize(150),
            borderTopColor:'#e5e5e5'
        },
        tabStyle:{
            marginTop:scaleSize(20),
            height:scaleSize(100),
        }
    }
})

const imageList = {
    "Home": require('../images/home1.png'),
    "Home2": require('../images/home2.png'),
    "Customers": require('../images/customer1.png'),
    "Customers2": require('../images/customer2.png'),
    "Managers": require('../images/my1.png'),
    "Managers2": require('../images/my2.png'),
    "Messages": require('../images/messages1.png'),
    "Messages2": require('../images/messages2.png'),
    "Settings": require('../images/settings1.png'),
    "Settings2": require('../images/settings2.png'),
    "Search": require('../images/search1.png'),
    "Search2": require('../images/search2.png'),
    "Loan": require('../images/loan1.png'),
    "Loan2": require('../images/loan2.png')
}
const managerMainStack = createBottomTabNavigator(ManagerStacks, {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarLabel: ({focused}) => {
            const { routeName } = navigation.state;
            switch (routeName) {
                default:
                case 'Home':
                    return <Text style={{ textAlign: 'center',fontSize:scaleSize(24),color:focused?'#2196f3':'#cbd4d4' }}>首页</Text>;
                case 'Customers':
                    return <Text style={{ textAlign: 'center',fontSize:scaleSize(24),color:focused?'#2196f3':'#cbd4d4' }}>客户</Text>;
                case 'Messages':
                    return <Text style={{ textAlign: 'center',fontSize:scaleSize(24),color:focused?'#2196f3':'#cbd4d4' }}>消息</Text>;
                case 'Loan':
                    return <Text style={{ textAlign: 'center',fontSize:scaleSize(24),color:focused?'#2196f3':'#cbd4d4'}}>贷款</Text>;
                case 'Settings':
                    return <Text style={{ textAlign: 'center',fontSize:scaleSize(24),color:focused?'#2196f3':'#cbd4d4' }}>设置</Text>;
            }
        },
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let focusedImg = imageList[routeName];
            let unFocusedImg = imageList[routeName + "2"];
            if (focused) {
                return (<Image source={focusedImg} style={{ width: scaleSize(44), height: scaleSize(44) }} />)
            }
            return (<Image source={unFocusedImg} style={{ width: scaleSize(44), height: scaleSize(44) }} />)
        }
    })
})
const authStack = createStackNavigator({
    SignIn: SignIn,
    ForgotPassword: ForgotPassword,
    AuthResetPassword: AuthResetPassword,
    Register: Register,
    RegisterActive:RegisterActive,
    RegisterInfo:RegisterInfo
}, {
        initialRouteName: 'SignIn'
    })

const AllNavigations = createSwitchNavigator({
    Loading: LandingPage,
    CustomerMain: customerMainStack,
    ManagerMain: managerMainStack,
    AuthLogin: authStack
}, {
        initialRouteName: 'Loading'
    })


export default AllNavigations
