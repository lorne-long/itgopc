import ajax from 'api/index'



let getGameMoney_url="/asp/getNewAnnouncement.php";//获取公告

let $getMessageByUser="/asp/getMessageByUser.php";//获取消息记录集合
let _readMsg="/asp/readMsg.php"; //获取单个消息


let _getGuestbookCountNew="/asp/getGuestbookCountNew.php"; //获取未读消息

let _makeCall="/mobi/makeCall.php"; //电话回拨接口

let _getbackPwdByDx_dc ="/getPwd/getbackPwdByDx_dc.php";




export function makeCall(data){
  $load.open("处理中...")
  return  ajax.get(_makeCall,data)
}
export function getbackPwdByDx_dc(data){
  $load.open("正在验证...")
  return  ajax.post(_getbackPwdByDx_dc,data)
}
export function getGuestbookCountNew(data){
  return  ajax.get(_getGuestbookCountNew,data)
}
export function getNewAnnouncement(data){
  return  ajax.get(getGameMoney_url,data)
}
export function getMessageByUser(data){
  return  ajax.get($getMessageByUser,data);
}
export function readMsg(data){
  return  ajax.post(_readMsg,data);
}


