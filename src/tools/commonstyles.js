import {StyleSheet,PixelRatio,Platform} from 'react-native';
import {scaleSize} from '../tools/util'

var commonStyle = StyleSheet.create({
    safeView:{
        flex:1,
        position:'relative'
    },
    scrollViewContainer:{
        paddingLeft: scaleSize(40), 
        paddingRight: scaleSize(40),
        paddingTop:scaleSize(25)
    },
    formTitle:{
        marginBottom:scaleSize(95),
    },
    formTitle_text:{
        color:'#000',
        fontSize:scaleSize(48)
    },
    fields_line:{
        marginBottom:scaleSize(40),
        position:'relative'
    },
    fields_label:{
        color:'#666666',
        fontSize:scaleSize(24),
        marginBottom:scaleSize(30)
    },
    fields_textbox:{
        height:scaleSize(60),
        borderBottomWidth:scaleSize(1),
        borderBottomColor:'#cccccc',
        paddingBottom:scaleSize(10),
        paddingTop:0,
        paddingLeft:0,
        paddingRight:scaleSize(60),
        fontSize:scaleSize(30),
        color:'#0d0d0d'
    },
    clearBox:{
        width:scaleSize(50),
        position:'absolute',
        right:0,
        bottom:scaleSize(14),
        zIndex:1
    },
    fullWidthButton:{
        backgroundColor:'#2196f3',
        justifyContent:'center',
        alignItems:'center',
        height:scaleSize(80),
        borderRadius:scaleSize(40),
    },
    fullWidthButton_Disabled:{
        backgroundColor:'#cccccc',
    },
    fullWidthButton_text:{
        fontSize:scaleSize(30),
        color:'#fff',
        fontWeight:'normal'
    },
    rowItem:{
        height:scaleSize(100),
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:scaleSize(50),
        paddingRight:scaleSize(30),
        backgroundColor:'#fff',
        marginTop:scaleSize(25)
    },
    rowItem_left_text:{
        fontSize:scaleSize(30),
        color:'#000'
    },
    rowItem_right_text:{
        fontSize:scaleSize(30),
        color:'#cccccc'
    },
    formRowItem:{
        paddingLeft:scaleSize(50),
        paddingRight:scaleSize(30),
        backgroundColor:'#fff',
        marginTop:scaleSize(25)
    },
    formRowItem_row:{
        height:scaleSize(99),
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomColor:'#e5e5e5',
        borderBottomWidth:scaleSize(1)
    },
    avatar:{
        width:scaleSize(90),
        height:scaleSize(90),
        borderRadius:scaleSize(45)
    },
    notification:{
        width:scaleSize(32),
        height:scaleSize(32),
        borderRadius:scaleSize(16),
        backgroundColor:'#ff5040',
        justifyContent:'center',
        alignItems:'center'
    },
    notification_text:{
        color:'#fff',
        fontSize:scaleSize(24)
    },
    block:{
        marginTop:scaleSize(20),
        paddingTop:scaleSize(45),
        paddingLeft:scaleSize(45),
        paddingRight:scaleSize(45),
        paddingBottom:scaleSize(60),
        backgroundColor:'#fff',
        flexDirection:'column',
    },
    block_line:{
        fontSize:scaleSize(30),
        color:'#000',
        marginBottom:scaleSize(30)
    },
    commonflex:{
        flexWrap:'wrap',
        flexDirection:'row',
        justifyContent:'center'
    },
    list_item:{
        height:scaleSize(180),
        borderBottomColor:'#e5e5e5',
        borderBottomWidth:scaleSize(1),
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        paddingLeft:scaleSize(30),
        paddingRight:scaleSize(30),
        position:'relative'
    }, message_common:{
        position: 'absolute', 
        opacity: 0.7, 
        top: 10, 
        left: scaleSize(100), 
        right: scaleSize(100),
        minHeight: scaleSize(60), 
        flexDirection: 'row', 
        borderRadius: scaleSize(10),
        alignItems: 'center', 
        justifyContent: 'center',
    },
    message_warning:{
        backgroundColor: '#000', 
    },
    message_warning_text:{
        color: '#fff', 
        fontSize: scaleSize(26), 
        zIndex: 100
    },
    message_error:{
        backgroundColor: 'red', 
    },
    message_error_text:{
        color: '#fff', 
        fontSize: scaleSize(26), 
        zIndex: 100
    },
    message_success:{
        backgroundColor: 'green', 
    },
    message_success_text:{
        color: '#fff', 
        fontSize: scaleSize(26), 
        zIndex: 100
    }
})
export default commonStyle;