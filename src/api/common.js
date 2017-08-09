import ajax from 'api/index'


let $getMessageByUser = "/asp/getMessageByUser.php";//获取消息记录集合
let $readMsg = "/asp/readMsg.php"; //获取单个消息
let $getGuestbookCountNew = "/asp/getGuestbookCountNew.php"; //获取未读消息
let $makeCall = "/mobi/makeCall.php"; //电话回拨接口$
let $getbackPwdByDx_dc = "/getPwd/getbackPwdByDx_dc.php";//手机短信找回密码

export function makeCall(data) {
  $load.open("处理中...")
  return ajax.get($makeCall, data)
}
export function getbackPwdByDx_dc(data) {
  $load.open("正在验证...")
  return ajax.post($getbackPwdByDx_dc, data)
}
export function getGuestbookCountNew(data) {
  return ajax.get($getGuestbookCountNew, data)
}
export function getMessageByUser(data) {
  return ajax.get($getMessageByUser, data);
}
export function readMsg(data) {
  return ajax.get($readMsg, data);
}


