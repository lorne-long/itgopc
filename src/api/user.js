import ajax from 'api/index'
import axios from 'axios'

let $getGameMoney = "/asp/getGameMoney.php"; //获取金钱接口
let $change_info = "/asp/change_info.php";  //修改用户信息

let $modifyCustomerSocialInfo = "/asp/modifyCustomerSocialInfo.php";  //修改用户qq，微信，邮箱
let $completeUserInfo = "/asp/completeUserInfo.php";  //完善用户信息
let $ajaxGetSessionPersonalData = "/asp/ajaxGetSessionPersonalData.php";/***获取用户资料*/

let $queryHistory = "/mobi/queryHistory.php";//记录查询
let $sendSms4TYJ = "/asp/sendSms4TYJ.php";//体验金：发送短信到玩家的注册手机号
let $checkPhoneCode = "/asp/checkPhoneCode.php";//校验短信校验码

export function checkPhoneCode(data) {
  $load.open("正在验证...");
  return ajax.get($checkPhoneCode, data);
}

export function sendSms4TYJ(data) {
  $load.open("正在发送短信...");
  return ajax.get($sendSms4TYJ, data);
}

export function queryHistory(data) {
  return ajax.post($queryHistory, data);
}

export function ajaxGetSessionPersonalData(data) {
  return ajax.get($ajaxGetSessionPersonalData, data);
}

export function change_info(data) {
  $load.open("正在处理...");
  return ajax.post($change_info, data);
}

export function modifyCustomerSocialInfo(data) {
  $load.open("正在处理...");
  return ajax.post($modifyCustomerSocialInfo, data);
}

export function completeUserInfo(data) {
  $load.open("正在处理...");
  return ajax.post($completeUserInfo, data);
}

//获取单个直接传入 "PT"
export function getGameMoney(data) {
  return ajax.get($getGameMoney, data);
};

//获取多个  getMoneyAll([pT,NT....]) 返回数组 ［ＰＴ数据，ＮＴ数据］
export function getMoneyAll(opticons) {
  if (opticons instanceof Array) {
    return axios.all(
      opticons.map(item => {
        return getGameMoney({gameCode: item});
      })
    ).then(axios.spread(function () {
      return Promise.resolve(Array.from(arguments));
    }));
  }
}
