import React, { Component } from 'react'
import { WebView } from 'react-native-webview'
import { SafeAreaView } from 'react-navigation'
import { observer, inject } from 'mobx-react'
import * as api from '../mocks/api'
import * as tools from '../tools/tool'
import Loading from '../pages/components/loading'
import ErrorInfo from '../pages/components/error'
import BackButton from '../pages/components/backButton'
import RightButton from '../pages/components/rightButton'
import commonStyle from '../tools/commonstyles'
import HeaderTitle from '../pages/components/headerTitle'
import { scaleSize, config } from '../tools/util';

const ManageToCustomer = 8;
const MessageStatus = {
    New: 0,
    Read: 1,
    Replied: 2,
    ReadReplied: 3
}

@inject('store')
@observer
class MessageWebView extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <HeaderTitle Title="消息" />,
            headerLeft: <BackButton goBack={navigation.goBack} />,
            headerRight: <RightButton />,
            headerStyle: {
                height: config.headerHeight
            }
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            Data: null
        }
    }
    componentDidMount = () => {
        var item = this.props.navigation.getParam("data");
        var type = this.props.navigation.getParam("type");
        if (type == "Customer") {
            this.doViewed(item);
        }
        this.setState({
            Data: item
        })
    }

    componentWillUnmount=()=>{
        tools.CancelAxios();
    }
    doViewed = (item) => {
        if (item.Status === MessageStatus.New && item.MessageType === ManageToCustomer) {
            api.CustomerReadMessage(item.Id)
                .then(res => {
                    if (res.data.result === 1) {
                        this.props.store.message.updateMessage(res.data.model);
                    }
                })
        }
    }
    render() {
        if (this.state.Data === null)
            return null;
        return (<SafeAreaView style={[commonStyle.safeView, { backgroundColor: '#f8f8f8' }]}>
            <WebView style={{ flex: 1 }}
                source={{ html: this.state.Data.Reply, baseUrl: "" }} />
        </SafeAreaView>)
    }
}

export default MessageWebView