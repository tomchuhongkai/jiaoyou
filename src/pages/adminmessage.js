import React, { Component } from 'react'
import { View, Button, Text, Image, FlatList, RefreshControl, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { observer, inject } from 'mobx-react'
import * as api from '../mocks/api'
import * as tools from '../tools/tool'
import commonStyle from '../tools/commonstyles'
import { scaleSize, config } from '../tools/util'
import Loading from '../pages/components/loading'
import ErrorInfo from '../pages/components/error'
import BackButton from '../pages/components/backButton'
import RightButton from '../pages/components/rightButton'
import HeaderTitle from '../pages/components/headerTitle'
import ItemSelector from '../pages/components/itemselector'

const CustomerAsk = 10;
const ManageToCustomer = 8;
const MessageStatus = {
    New: 0,
    Read: 1,
    Replied: 2,
    ReadReplied: 3
}

@inject('store')
@observer
class AdminMessage extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <HeaderTitle Title="管理员" />,
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
            showIndex: -1,
            refreshing: false,
            messageType: CustomerAsk
        }
        this.loadData();
    }

    loadData() {
        let type = this.props.navigation.getParam('type');
        api.AdminMessage(type)
            .then(res => {
                this.props.store.m_message.setAdminMessage(res.data);
            })
    }

    refresh = () => {
        this.loadData();
    }

    _keyExtractor = (item, index) => item.Id.toString();

    showCurrent = (item) => {
        if (item.Id === this.state.showIndex) {
            this.setState({
                showIndex: -1
            })
        } else {
            this.setState({
                showIndex: item.Id
            })
        }
    }
    
    componentWillUnmount=()=>{
        tools.CancelAxios();
    }

    render() {
        let { messageadmin } = this.props.store.m_message;
        return (<SafeAreaView style={[commonStyle.safeView, { backgroundColor: '#f8f8f8' }]}>
            <FlatList
                data={messageadmin.slice()}
                extraData={this.props.store.m_message}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.refresh}
                    />
                }
            />
            <Loading />
            <ErrorInfo />
        </SafeAreaView>);
    }

    _renderItem = ({ item }) => {
        let _style = styles.msgitem;
        if (this.state.showIndex === item.Id) {
            _style = [styles.msgitem, styles.msgactive];
        }
        return (
            <View>
                <View style={styles.message_item}>
                    {item.Status===MessageStatus.New?<View style={styles.new_item}></View>:null}
                    <View style={styles.item_line}>
                        <Text style={styles.item_line_text}>管理员</Text>
                        <Text style={styles.item_line_text}>{item.CreatedAt}</Text>
                    </View>
                    <View style={{ marginTop: scaleSize(20), justifyContent: 'flex-end', flex: 1, flexDirection: 'row' }}>
                        <View style={styles.item_button}>
                            <TouchableOpacity onPress={() => this.showCurrent(item)}>
                                <Text style={styles.item_button_text}>点击查看详情</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {this.state.showIndex === item.Id ? this.showDetail(item) : null}
            </View>)
    }

    showDetail = (item) => {
        let questions = item.Question !== null && item.Question !== '' ? item.Question.split('<br/>') : [];
        return (
            <View style={styles.detail_container}>
                <View style={styles.detail}>
                    <View style={{ marginRight: scaleSize(20) }}>
                        <Image style={styles.avatar} source={{ uri: `${tools.GetRootUrl()}${item.AdminAvatar}` }} />
                    </View>
                    <View style={styles.question_detail}>
                        <Text style={styles.text_color}>管理员</Text>
                        <View style={styles.question_detail_desc}>
                            {questions.map((txt, index) => {
                                return txt === '' ? null : <Text key={index} style={styles.text_color}>{txt}</Text>
                            })}
                        </View>
                    </View>
                </View>
                <View style={styles.timeContainer}>
                    <View style={styles.createTime}>
                        <Text style={styles.createTime_text}>{item.CreatedAt}</Text>
                    </View>
                </View>
            </View>
        )
    }

}

export default AdminMessage;

const styles = StyleSheet.create({
    new_item:{
        backgroundColor:'#ff5040',
        borderRadius:5,
        width:scaleSize(10),
        height:scaleSize(10),
        position:'absolute',
        left:scaleSize(20),
        top:scaleSize(20)
    },
    headerButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: scaleSize(20),
    },
    message_item: {
        backgroundColor: '#fff',
        marginLeft: scaleSize(20),
        marginRight: scaleSize(20),
        marginTop: scaleSize(20),
        borderRadius: scaleSize(10),
        paddingLeft: scaleSize(45),
        paddingRight: scaleSize(45),
        paddingTop: scaleSize(35),
        paddingBottom: scaleSize(20),
        position:'relative'
    },
    item_line: {
        paddingBottom: scaleSize(30),
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    item_line_text: {
        fontSize: scaleSize(24),
        color: '#0d0d0d'
    },
    item_button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: scaleSize(225),
        height: scaleSize(60),
        borderColor: '#2196f3',
        borderWidth: 1,
        borderRadius: scaleSize(10)
    },
    item_button_text: {
        fontSize: scaleSize(24),
        color: '#2196f3',
    },
    detail_container: {
        backgroundColor: '#f8f8f8',
        paddingTop: scaleSize(70),
        paddingLeft: scaleSize(20),
        paddingRight: scaleSize(20),
    },
    detail: {
        flexDirection: 'row'
    },
    question_detail: {
        flexDirection: 'column',
    },
    question_detail_desc: {
        backgroundColor: '#fff',
        marginTop: scaleSize(15),
        paddingBottom: scaleSize(30),
        paddingLeft: scaleSize(30),
        paddingRight: scaleSize(30),
        paddingTop: scaleSize(30),
        borderRadius: scaleSize(30),
        maxWidth: scaleSize(510),
    },
    reply_detail: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    reply_detail_container: {
        flexDirection: 'column',
    },
    reply_detail_desc: {
        backgroundColor: '#ffca7f',
        paddingBottom: scaleSize(30),
        paddingLeft: scaleSize(30),
        paddingRight: scaleSize(30),
        paddingTop: scaleSize(30),
        borderRadius: scaleSize(30),
        maxWidth: scaleSize(510)
    },
    text_color: {
        color: '#0d0d0d',
        fontSize: scaleSize(24)
    },
    avatar: {
        width: scaleSize(80),
        height: scaleSize(80),
        borderRadius: scaleSize(20)
    },
    timeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: scaleSize(30),
        marginBottom: scaleSize(55)
    },
    createTime: {
        backgroundColor: '#c9c9c9',
        height: scaleSize(45),
        width: scaleSize(260),
        borderRadius: scaleSize(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    createTime_text: {
        color: '#fff',
        fontSize: scaleSize(24)
    },
    replyBox:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        height:scaleSize(30),
        marginBottom:scaleSize(30)
    },
    replyBox_text:{
        color:'#2196f3',
        fontSize:scaleSize(26)
    }
})