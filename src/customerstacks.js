import React from 'react'
import {Alert} from 'react-native'
import { createStackNavigator } from 'react-navigation'
import Home from './pages/customer/home'
import Match from './pages/customer/match'
import MyManagers from './pages/customer/mymanagers'
import Manager from './pages/customer/manager'
import Messages from './pages/customer/messages'
import MatchList from './pages/customer/matchlist'
import Caculate from './pages/customer/caculate'
import Inquery from './pages/customer/inquery'
import MsgItem from './pages/customer/msgitem'
import LoanDone from './pages/customer/loandone'
import LoanDetail from './pages/customer/loandetail'
import LoanRating from './pages/customer/loanrating'
import ResetPassword from './pages/customer/resetpassword'
import SaveSetting from './pages/customer/savesetting'
import { scaleSize } from './tools/util';
import MessageWebView from './pages/messageWebView'
import AdminMessage from './pages/adminmessage'
import NewsDetail from './pages/customer/newsdetail'
import CustomerFilterItem from './pages/customer/customerfilteritem'



const homeStack = createStackNavigator({
    Home: NewsDetail,
})

const searchStack = createStackNavigator({
    Search: Match,
    ManagerMatchList: MatchList,
    ManagerDetail: Manager,
    CustomerFilterItem:CustomerFilterItem
})


const managerStack = createStackNavigator({
    Managers: MyManagers,
    ManagerDetail_Tab3: Manager,
    InQuery: Inquery,
    Loans: LoanDone,
    LoanDetail: LoanDetail,
    LoanRate: LoanRating
})

searchStack.navigationOptions = ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index];
    // You can do whatever you like here to pick the title based on the route name
    let headerTitle = '';
    let tabBarVisible = true;
    switch (routeName) {
        default:
            break;
        case 'ManagerMatchList':
        case 'ManagerDetail':
        case 'CustomerFilterItem':
            tabBarVisible = false;
            break;
    }
    return {
        tabBarVisible
    }
}

managerStack.navigationOptions = ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index];
    // You can do whatever you like here to pick the title based on the route name
    let headerTitle = '';
    let tabBarVisible = true;
    switch (routeName) {
        default:
            break;
        case 'ManagerDetail_Tab3':
        case 'InQuery':
        case 'Loans':
        case 'LoanDetail':
        case 'LoanRate':
            tabBarVisible = false;
            break;
    }
    return {
        tabBarVisible
    }
}

const messageStack = createStackNavigator({
    Messages: Messages,
    MessageDetail: MsgItem,
    MessageWebView: MessageWebView,
    AdminMessage:AdminMessage
})

messageStack.navigationOptions = ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index];
    // You can do whatever you like here to pick the title based on the route name
    let headerTitle = '';
    let tabBarVisible = true;
    switch (routeName) {
        default:
            break;
        case 'MessageDetail':
        case 'MessageWebView':
        case 'AdminMessage':
            tabBarVisible = false;
            break;
    }
    return {
        tabBarVisible
    }
}

const settingStack = createStackNavigator({
    Settings: Home,
    ResetPassword: ResetPassword,
    Caculate:Caculate,
    ChangeSetting:SaveSetting
})

settingStack.navigationOptions = ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index];
    // You can do whatever you like here to pick the title based on the route name
    let headerTitle = '';
    let tabBarVisible = true;
    switch (routeName) {
        default:
            break;
        case 'ResetPassword':
        case 'Caculate':
        case 'ChangeSetting':
            tabBarVisible = false;
            break;
        }
        return {
            tabBarVisible
        }
    }

const CustomerStacks = {
    Home: homeStack,
    Search: searchStack,
    Managers: managerStack,
    Messages: messageStack,
    Settings: settingStack
}

export default CustomerStacks