/**
 * Created by zhuoy on 2017/6/27.
 * 屏幕工具类
 * ui设计基准,iphone 6
 * width:750
 * height:1334
 */

/*
 设备的像素密度，例如：
 PixelRatio.get() === 1          mdpi Android 设备 (160 dpi)
 PixelRatio.get() === 1.5        hdpi Android 设备 (240 dpi)
 PixelRatio.get() === 2          iPhone 4, 4S,iPhone 5, 5c, 5s,iPhone 6,xhdpi Android 设备 (320 dpi)
 PixelRatio.get() === 3          iPhone 6 plus , xxhdpi Android 设备 (480 dpi)
 PixelRatio.get() === 3.5        Nexus 6       */

import {
    Dimensions,
    PixelRatio,
} from 'react-native';


export const deviceWidth = Dimensions.get('window').width;      //设备的宽度
export const deviceHeight = Dimensions.get('window').height;    //设备的高度
let fontScale = PixelRatio.getFontScale();                      //返回字体大小缩放比例

let pixelRatio = PixelRatio.get();      //当前设备的像素密度
const defaultPixel = 2;                           //iphone6的像素密度
//px转换成dp
const w2 = 750 / defaultPixel;
const h2 = 1334 / defaultPixel;
const scale = Math.min(deviceHeight / h2, deviceWidth / w2);   //获取缩放比例
/**
 * 设置text为sp
 * @param size sp
 * return number dp
 */
export function setSpText(size: number) {
    size = Math.round((size * scale + 0.5) * pixelRatio / fontScale);
    return size / defaultPixel;
}

export function scaleSize(size: number) {
    size = Math.round(size * scale + 0.5);
    return size / defaultPixel;
}

export const clearBoxPng = require("../../images/clearbox.png")
export const config = {
    headerHeight: scaleSize(120)
}

export const LoanTypeList = [
    { key: 20, value: '房屋贷款' },
    { key: 30, value: '汽车贷款' },
    { key: 40, value: '商业贷款' }]

export const SalaryFromList = [
    { key: 0, value: '澳洲本地收入' },
    { key: 10, value: '海外和本地混合收入', width: 280 },
    { key: 20, value: '纯海外收入' }]

export const LoanAmountList = [
    { key: 0, value: '低于100万' },
    { key: 10, value: '100万到200万', width: 280 },
    { key: 20, value: '大于200万' }]


export const AreaList = [
    { key: 10, value: '新南威尔士州' },
    { key: 15, value: '昆士兰州' },
    { key: 20, value: '南澳大利亚州' },
    { key: 25, value: '塔斯马尼亚州' },
    { key: 30, value: '维多利亚州' },
    { key: 35, value: '西澳大利亚州' },
    { key: 40, value: '澳大利亚首都特区',width:270 },
    { key: 45, value: '北领地' },
]

export const LoanCategoryList=[{ key: 0, value: '初次贷款' }, { key: 10, value: '转贷' }];

export function IsInItemSelector(array, value) {
    if (array.findIndex(x => x === value) !== -1) {
        return true;
    }
    return false;
}
export function AddToItemSelector(array, value) {
    let newArray = array.slice();
    let _index = array.findIndex(x => x === value);
    if (_index === -1) {
        newArray.push(value);
    }
    else {
        newArray.splice(_index, 1);
    }
    return newArray;
}
export function GetSelectorValues(array,value){
    let newArray = array.slice();
    let _v=[];
    if(value!==undefined && value.length>0){
        array.forEach(element => {
            if(value.findIndex(x=>x===element.key)!==-1){
                _v.push(element.value)
            }
        });
    }
    return _v.join('，')
}

export function GetListValue(list,key){
    let newArray = list.slice();
    let items=newArray.filter(x=>x.key===key);
    if(items.length>0){
        return items[0].value;
    }
    return "";
}