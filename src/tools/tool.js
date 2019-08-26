import axios from 'axios'
// import DeviceStorage from '../tools/devicestorage'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

var CancelToken = axios.CancelToken;
var cancel;
var siteStore = {};

const AUTH_TOKEN = 'AUTHTOKEN';
export function SetSiteToken(token, loginType, needRegisterInfo, needConfirmEmail) {
    AsyncStorage.setItem(AUTH_TOKEN, JSON.stringify({ type: loginType, token: token, needRegisterInfo: needRegisterInfo, needConfirmEmail: needConfirmEmail }));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export function SetAuthorization(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export function SetToLocal(key, value) {
    AsyncStorage.setItem(key, JSON.stringify(value));
}
export function LogOut() {
    axios.defaults.headers.common['Authorization'] = '';
    AsyncStorage.removeItem(AUTH_TOKEN);
}

export function InitStore(_store) {
    siteStore = _store;
}

export function showError(info) {
    siteStore.config.setMessage(info);
}

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    siteStore.config.changeLoading(true);
    return config;
}, function (error) {
    // 对请求错误做些什么
    siteStore.config.changeLoading(false);
    siteStore.config.setMessage(JSON.stringify(error));
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    siteStore.config.changeLoading(false);
    return response;
}, (error) => {
    siteStore.config.changeLoading(false);
    
    // 对响应错误做点什么
    if (error.response !== undefined) {
        switch (error.response.status) {
            case 401:
                LogOut();
                //DeviceStorage.delete(AUTH_TOKEN);
                break;
            case 403:
                siteStore.config.setMessage(error.response.data.error_description,'error')
                break;
            case 400:
                siteStore.config.setMessage(error.response.data.error_description,'error')
                break;
            default:
                siteStore.config.setMessage(JSON.stringify(error.response),'error')
                break;
        }
    }
    return Promise.reject(error);
});


export function GetRootUrl() {
    return 'http://www.instalend.com.au/';
}

axios.defaults.baseURL = GetRootUrl();
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export function Get(url) {
    return axios.get(url, {
        cancelToken: new CancelToken(function executor(c) {
            // executor 函数接收一个 cancel 函数作为参数
            cancel = c;
        })
    })
        .catch(function (thrown) {
            if (axios.isCancel(thrown)) {
                return Promise.reject(thrown);
            } else {
                return Promise.reject(thrown);
            }
        });
}

export function Post(url, data) {
    return axios.post(url, data, {
        cancelToken: new CancelToken(function executor(c) {
            // executor 函数接收一个 cancel 函数作为参数
            cancel = c;
        })
    }).catch(function (thrown) {
        if (axios.isCancel(thrown)) {
            return Promise.reject(thrown);
        } else {
            return Promise.reject(thrown);
        }
    });
}

export function doRedirect(navigation) {
    if (siteStore.config.redirectPage !== null) {
        navigation.push(siteStore.config.redirectPage.routeName, siteStore.config.redirectPage.params);
        siteStore.config.setRedirect(null);
    }
}

export function CancelAxios(){
    if(cancel)
        cancel();
}

// export function Common_GetSearchParams(search) {
//     let params = {};
//     if (search !== undefined && search !== '') {
//         search = search.substring(1);
//         let ps = search.split('&');
//         for (var i = 0; i < ps.length; i++) {
//             let m = ps[i].split('=');
//             if (m.length > 2) {
//                 //value中含有=的情况
//                 let z = ps[i].substring(0, ps[i].indexOf('='));
//                 let v = ps[i].substring(ps[i].indexOf('=') + 1);
//                 m = [z, v];
//             }
//             let hasKey = false;
//             for (var key in params) {
//                 if (key === m[0].trim()) {
//                     hasKey = true;
//                 }
//             }

//             if (hasKey) {
//                 var old = params[m[0].trim()];
//                 if (typeof old === 'object') {
//                     params[m[0].trim()].push(m[1].trim());
//                 } else {
//                     let newVs = [];
//                     newVs.push(params[m[0]].trim());
//                     newVs.push(m[1].trim());
//                     params[m[0].trim()] = newVs;
//                 }
//             } else {
//                 params[m[0].trim()] = m[1].trim();
//             }
//         }
//     }
//     return params;
// }
// export function isWeiXin() {
//     //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
//     var ua = window.navigator.userAgent.toLowerCase();
//     //通过正则表达式匹配ua中是否含有MicroMessenger字符串
//     if (ua.match(/MicroMessenger/i) == 'micromessenger') {
//         return true;
//     } else {
//         return false;
//     }
// }

// export function CategoryBreadcrumnb(data, overrideDefualt) {
//     let defaultCategory = [{ key: 0, value: 0, title: 'No Parent', children: [] }];
//     if (overrideDefualt !== undefined) {
//         defaultCategory = overrideDefualt;
//     }
//     if (data === null || data.length === 0) {
//         return [{ key: 0, value: 0, title: 'No Parent', children: [] }];
//     }
//     var parents = data.filter(p => p.parentId === 0);
//     let newData = parents.map((item, index) => {
//         let newItem = { key: item.id, value: item.id, title: item.name, children: [] };
//         return iterationCategory(newItem, data);
//     });
//     return defaultCategory.concat(newData);
// }

// function iterationCategory(parent, allData) {
//     var subs = allData.filter(p => p.parentId === parent.key);
//     if (subs !== null && subs.length > 0) {
//         let childrens = subs.map((item, index) => {
//             let newItem = { key: item.id, value: item.id, title: item.name, children: [] };
//             return iterationCategory(newItem, allData);
//         });
//         parent.children = childrens;
//     }
//     return parent;
// }
