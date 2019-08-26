import * as tools from '../tools/tool'
export function Token(data, params) {
    return tools.Post(`/Token?${params}`, data);
}

export function SearchInit(){
    return tools.Get('/api/customer/searchinit');
}

export function SaveSearch(data){
    return tools.Post('/api/customer/searchsave',data);
}

export function MatchList(filter) {
    let params=createParams(filter);
    return tools.Get(`/api/customer/search?${params}`);
}

export function ManagerDetail(id){
    return tools.Get(`/api/customer/detail/${id}`);
}

export function AddManager(id){
    return tools.Get(`/api/customer/select/${id}`);
}

export function Managers(filter) {
    let params=createParams(filter);
    return tools.Get(`/api/customer/managers?${params}`);
}
export function RemoveManager(id) {
    return tools.Get(`/api/customer/managerremove/${id}`);
}

export function Messages(filter){
    let params=createParams(filter);
    return tools.Get(`/api/customer/messages?${params}`);
}

export function Inquery(data){
    return tools.Post(`/api/customer/inquery`,data);
}

export function MessageDetail(id){
    return tools.Get(`/api/customer/message/${id}`);
}

export function CompletedLoans(filter){
    let params=createParams(filter);
    return tools.Get(`/api/customer/completedloan?${params}`);
}

export function LoanDetail(id){
    return tools.Get(`/api/customer/loandetai/${id}`);
}

export function RateLoan(data){
    return tools.Post(`/api/customer/savereward`,data);
}

export function CustomerProfile(){
    return tools.Get(`/api/customer/profile`);
}

export function ChangePassword(data){
    return tools.Post(`/api/customer/changepassword`,data);
}

export function ForgotPassword(email){
    return tools.Get(`/api/home/forgot?email=${email}`);
}

export function CodeResetPassword(data){
    return tools.Post(`/api/home/resetpassword`,data);
}

export function Register(data){
    return tools.Post(`/api/home/register`,data);
}

export function RegisterComplete(data){
    return tools.Post(`/api/home/completeregister`,data);
}

export function RegisterInfo(data){
    return tools.Post(`/api/home/customerprofile`,data);
}

export function InitRegisterInfo(){
    return tools.Get(`/api/home/profileinit`);
}

export function ChangeMatchMe(matchMe){
    return tools.Get(`/api/customer/matchme/${matchMe}`);
}
//经理人信息
export function Manager_Profile() {
    return tools.Get('/api/manager/profile');
}


// 修改经理人密码
export function Manager_ResetPassword(data) {
    return tools.Post(`/api/manager/changepassword`, data);
}

//匹配的会员 loanType page pageSize
export function Manager_Search(filter) {
    const params = Object.keys(filter).map((key, index) => {
        return `${key}=${filter[key]}`;
    })
    const strParams = params.join('&')
    return tools.Get(`/api/manager/search?${strParams}`);
}


//选择客户
export function Manager_SelectCustomer(id) {
    return tools.Get(`/api/manager/select?customerId=${id}`);
}
//我的客户 whoAdded,pageIndex,pageSize
export function Manager_Customers(filter) {
    const params = Object.keys(filter).map((key, index) => {
        return `${key}=${filter[key]}`;
    })
    const strParams = params.join('&')
    return tools.Get(`/api/manager/customers?${strParams}`);
}
// 客户详情
export function Manager_CustomerDetail(id) {
    return tools.Get(`/api/manager/customerdetail/${id}`);
}
//是否能删除移除客户池
export function Manager_CanRemoveCustomer(id,whoAdded) {
    return tools.Get(`/api/manager/canremovecustomer?id=${id}&whoAdded=${whoAdded}`);
}
//将客户移除数据池
export function Manager_RemoveCustomer(data) {
    return tools.Post(`/api/manager/removecustomermanage`, data);
}


//贷款记录name,pageIndex,pageSize
export function Manager_Loans(filter) {
    const params = Object.keys(filter).map((key, index) => {
        return `${key}=${filter[key]}`;
    })
    const strParams = params.join('&')
    return tools.Get(`/api/manager/loans?${strParams}`);
}
//贷款明细
export function Manager_LoanDetail(id) {
    return tools.Get(`/api/manager/loan/${id}`);
}
//支付Report Fee
export function Manager_LoanRemove(reportId) {
    return tools.Get(`/api/manager/loanremove/${reportId}`);
}

//添加loan信息
export function Manager_Loadaddinit(id) {
    return tools.Get(`/api/manager/loadaddinit?customer_id=${id}`);
}

export function Manager_LoanSave(data) {
    return tools.Post(`/api/manager/loansave`, data);
}

//我的消息pageIndex,pageSize
export function Manager_MyMessage(filter) {
    const params = Object.keys(filter).map((key, index) => {
        return `${key}=${filter[key]}`;
    })
    const strParams = params.join('&')
    return tools.Get(`/api/manager/messages?${strParams}`);
}

//信息明细 
export function Manager_MessageDetail(id) {
    return tools.Get(`/api/manager/message/${id}`);
}
function createParams(data){
    const params = Object.keys(data).map((key, index) => {
        return `${key}=${data[key]}`;
    })
    const strParams = params.join('&');
    return strParams;
}

//保存设备号
export function SaveRegistrationId(device, registrationId) {
    return tools.Get(`/api/home/saveregistrationid?device=${device}&registrationId=${registrationId}`);
}

//经理人回复消息
export function ReplyMessage(data) {
    return tools.Post(`/api/manager/messagereply`, data);
}

//站点对经理人信息
export function AdminMessage(type) {
    if (type === "Manager") {
        return tools.Get('/api/manager/adminmessage');
    }else{
        return tools.Get('/api/customer/adminmessage');  
    }
}

//客户查看消息
export function CustomerReadMessage(id){
    return tools.Get(`api/customer/messageview/${id}`)
}