/**
 * Created by Lorne on 2017/7/5.
 */
import ajax from 'api/index'
import axios from 'axios'
import $store from '@/store'
let $getNewAnnouncement="/asp/getNewAnnouncement.php?v=0.941433513213153";// 获取公告
let $queryRecommandGamesList="/asp/queryRecommandGamesList.php";//查询推荐的游戏
let $checkConfigSystem="/asp/checkConfigSystem.php";//弹框配置 首页
let $queryBannerList="/asp/queryBannerList.php";//弹框配置 首页

let $getCarouselListAll="/asp/getCarouselListAll.php";// 首页中奖信息


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
let version=(new Date()).getWeekNumber()
let  $saveOrUpdateGameStatus="/mobi/saveOrUpdateGameStatus.php";//收藏/首先收藏
let  $queryGameStatus="/mobi/queryGameStatus.php";//查询用户收藏



let $loginDTInfo="/loginDTInfo.php";//DT PC端
let $loginNTInfo="/loginNTInfo.php";//NT PC端
let $loginTTGInfo="/loginTTGInfo.php";//TTG PC端
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
export function loginNTInfo(data){
  return ajax.get($loginDTInfo,data);
}
export function loginDTInfo(data){
  return ajax.get($loginNTInfo,data);
}
export function loginTTGInfo(data){
  return ajax.get($loginTTGInfo,data);
}

export function queryGameStatus(data){
  return ajax.get($queryGameStatus,data);
}
export function saveOrUpdateGameStatus(data){
  return ajax.get($saveOrUpdateGameStatus,data);
}
