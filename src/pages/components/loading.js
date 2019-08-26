import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { observer, inject } from 'mobx-react'

@inject('store')
@observer
class Loading extends Component {
    render() {
        if (this.props.store.config.loading.length === 0)
            return null;
        return <View style={{
            position: 'absolute', top: 10, height: '100%', left: 0, width: '100%',
            flex: 1, flexDirection: 'column',
            justifyContent: 'center',alignItems:'center'
        }}>
            <Image source={require('../../../images/loading.gif')} style={{ width: 40, height: 40 }} />
            {this.props.showText===undefined?null:<Text style={{ textAlignVertical: 'center', textAlign: 'center', color: '#000' }}>正在加载</Text>}
        </View>
    }
}

export default Loading;