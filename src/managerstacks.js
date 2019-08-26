import React from 'react'
import { createStackNavigator } from 'react-navigation'
import ManagerProfile from './pages/manager/home'
import Message from './pages/manager/message'
import MessageDetail from './pages/manager/msgitem'
import Setting from './pages/manager/setting'
import CustomerPage from './pages/manager/customerpage'
import SearchCustomerPage from './pages/manager/searchcustomers'
import Reason from './pages/manager/reason'
import CustomerDetail from './pages/manager/customerdetail'
import LoanAdded from './pages/manager/loanaddedcustomers'
import LoanCompletedManage from './pages/manager/loancompletedmanage'
import LoanDetail from './pages/manager/loandetail'
import ResetPassword from './pages/manager/resetpassword'
import MessageWebView from './pages/messageWebView'
import MessageReply from './pages/manager/messagereply'
import AdminMessage from './pages/adminmessage'
import SaveSetting from './pages/manager/savesetting'
import SearchFilterPageNew from './pages/manager/searchfilterpagenew'
import FilterItem from './pages/manager/filterItem'

const homeStack = createStackNavigator({
    Home: ManagerProfile,
    SaveSetting: SaveSetting
})

const customerStack = createStackNavigator({
    Customers: CustomerPage,
    Reason: Reason,
    CustomerDetail: CustomerDetail,
    LoanAdded: LoanAdded,
    SearchCustomers: SearchCustomerPage,
    SearchCustomerFilter:SearchFilterPageNew,
    FilterItem:FilterItem
})

const messageStack = createStackNavigator({
    Messages: Message,
    MessageDetail: MessageDetail,
    MessageWebView: MessageWebView,
    MessageReply: MessageReply,
    AdminMessage: AdminMessage
})

const settingStack = createStackNavigator({
    Settings: Setting, ResetPassword: ResetPassword
})
const loanStack = createStackNavigator({
    Loan: LoanCompletedManage,
    LoanDetail: LoanDetail
})
homeStack.navigationOptions = ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index];
    let tabBarVisible = true;
    switch (routeName) {
        default:
            break;
        case 'SaveSetting':
            tabBarVisible = false;
            break;

    }
    return {
        tabBarVisible
    }
}
customerStack.navigationOptions = ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index];
    // You can do whatever you like here to pick the title based on the route name
    let headerTitle = '';
    let tabBarVisible = true;
    switch (routeName) {
        default:
            break;
        case 'LoanAdded':
        case 'SearchCustomers':
        case 'Reason':
        case 'CustomerDetail':
        case 'SearchCustomerFilter':
            tabBarVisible = false;
            break;

    }
    return {
        tabBarVisible
    }
}
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
        case 'MessageReply':
        case 'AdminMessage':
            tabBarVisible = false;
            break;
    }
    return {
        tabBarVisible
    }
}
loanStack.navigationOptions = ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index];
    let headerTitle = '';
    let tabBarVisible = true;
    switch (routeName) {
        default:
            break;
        case 'LoanDetail':
            tabBarVisible = false;
            break;
    }
    return {
        tabBarVisible
    }
}
settingStack.navigationOptions = ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index];
    let headerTitle = '';
    let tabBarVisible = true;
    switch (routeName) {
        default:
            break;
        case 'ResetPassword':
            tabBarVisible = false;
            break;
    }
    return {
        tabBarVisible
    }
}
const ManagerStacks = {
    Home: homeStack,
    Customers: customerStack,
    Messages: messageStack,
    Loan: loanStack,
    Settings: settingStack
}
export default ManagerStacks