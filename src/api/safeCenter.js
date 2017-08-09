/**
 * Created by Lorne on 2017/6/9.
 */
import ajax from 'api/index'

let $checkWithdrawPwd="/asp/checkWithdrawPwd.php"; //确认用户是否设置支付密码

let $change_pws="/asp/change_pws.php"; //修改登录密码
let $modifyWithdrawPwd="/asp/modifyWithdrawPwd.php"; //修改支付密码
let $bindWithdrawPwd="/asp/bindWithdrawPwd.php";//设置支付密码

let $updateGameMoney="/asp/updateGameMoney.php";//转账
let $getPaymentConfigInfo="/onlinepayment/getPaymentConfigInfo.php";//充值方式  0 1 2 分别是PC/WAP/APP
let $createDepositeOrder="/asp/createDepositeOrder.php";//创建秒存订单


let $findUserBankList="/asp/findUserBankList.php";//银行卡列表
let $validateBankNo="/asp/validateBankNo.php";//校验银行卡列表
let $bindBankNo="/mobi/bindBankNo.php";//绑定银行卡
let $withdraw_new="/asp/withdraw_new.php";//取款提交


export function createDepositeOrder(data){
  $load.open("正在创建...");
  return  ajax.post($createDepositeOrder,data);
}
export function getPaymentConfigInfo(){
  return  ajax.post($getPaymentConfigInfo);
}

export function updateGameMoney(data){
  $load.open("正在处理...");
  return  ajax.post($updateGameMoney,data);
}
export function checkWithdrawPwd(data){
  return  ajax.get($checkWithdrawPwd,data);
}
export function changepws(data){
  $load.open("正在处理...");
  return  ajax.post($change_pws,data);
}
export function modifyWithdrawPwd(data){
  $load.open("正在处理...");
  return  ajax.post($modifyWithdrawPwd,data);
}
export function bindWithdrawPwd(data){
  $load.open("正在处理...");
  return  ajax.post($bindWithdrawPwd,data);
}
export function findUserBankList(data){
  return  ajax.get($findUserBankList,data);
}
export function withdraw_new(data){
  return  ajax.post($withdraw_new,data);
}
export function validateBankNo(data){
  return  ajax.get($validateBankNo,data);
}
export function bindBankNo(data){
  return  ajax.get($bindBankNo,data);
}


