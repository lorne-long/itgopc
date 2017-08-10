/**
 * Created by Lorne on 2017/7/5.
 */
import ajax from 'api/index'
import axios from 'axios'


let $getNewAnnouncement="/index/getNewAnnouncement.php";// 获取公告获取公告 只获取最新15条，时间倒序排列
let $queryRecommandGamesList="/index/queryRecommandGamesList.php";//查询推荐的游戏
let $checkConfigSystem="/index/checkConfigSystem.php";//弹框配置 首页
let $queryBannerList="/index/queryBannerList.php";//弹框配置 首页


let $getCarouselListAll="/index/getCarouselListAll.php";// 首页中奖信息
let $makeCall = "/user/makeCall.php"; //电话回拨接口$


let  $saveOrUpdateGameStatus="/index/saveOrUpdateGameStatus.php";//收藏接口

let $getMessageByUser = "/index/getMessageByUser.php";//获取消息记录集合
let $readMsg = "/index/readMsg.php"; //获取单个消息
let $getGuestbookCountNew = "/index/getGuestbookCountNew.php"; //获取未读消息
let $getbackPwdByDx_dc = "/index/getbackPwdByDx_dc.php";//手机短信找回密码





let $loginDTInfo="/loginDTInfo.php";//DT进入游戏连接 PC端
let $loginNTInfo="/loginNTInfo.php";//NT进入游戏连接 PC端
let $loginTTGInfo="/loginTTGInfo.php";//TTG进入游戏连接 PC端
let version=(new Date()).getWeekNumber()
export function getAllGames(fun){
  return axios.all([
    axios.get('http://staticserverhost.com/games/slot/pt.json?v=q18'+version),//QT
    axios.get('http://staticserverhost.com/games/slot/mgs.json?v=q18'+version), //MGS:
    axios.get('http://staticserverhost.com/games/slot/qt.json?v=q18'+version), // QT:
    axios.get('http://staticserverhost.com/games/slot/dt.json?v=q18'+version),// DT:
    axios.get('http://staticserverhost.com/games/slot/nt.json?v=q18'+version),// NT:
    axios.get('http://staticserverhost.com/games/slot/png.json?v=q18'+version)//PNG:
  ]).then(axios.spread(function(){
    return Promise.resolve(Array.from(arguments))
  }));
}



export function getbackPwdByDx_dc(data) {
  $load.open("正在验证...")
  return ajax.post($getbackPwdByDx_dc, data)
}

export function getGuestbookCountNew(data) {
  return ajax.get($getGuestbookCountNew, data)
}
export function makeCall(data) {
  $load.open("处理中...")
  return ajax.get($makeCall, data)
}
export function getCarouselListAll(data){
  return ajax.get($getCarouselListAll,data);
}
export function checkConfigSystem(data){
  return ajax.post($checkConfigSystem,data);
}
export function queryBannerList(data){
  return ajax.get($queryBannerList,data);
}
export function getNewAnnouncement(){
  return ajax.get($getNewAnnouncement,{v:Math.random()});
}
export function queryRecommandGamesList(data){
  return ajax.get($queryRecommandGamesList,data);
}

export function saveOrUpdateGameStatus(data){
  return ajax.get($saveOrUpdateGameStatus,data);
}
export function getMessageByUser(data) {
  return ajax.get($getMessageByUser, data);
}
export function readMsg(data) {
  return ajax.get($readMsg, data);
}


export function loginNTInfo(data){
  return ajax.get($loginDTInfo,data);
}
export function loginDTInfo(data){
  return ajax.get($loginNTInfo,data);
}
export function loginTTGInfo(data){
  return ajax.get($loginTTGInfo,data);
}
