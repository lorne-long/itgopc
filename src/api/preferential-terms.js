
import ajax from 'api/index'

let $youhui="/rest/youhui.php"; //存送优惠接口 提交接口
let $getSelfYouHuiObject="/asp/getSelfYouHuiObject.php";//存送优惠提交
let $getXimaData="/mobi/getXimaData.php" //洗码查询
let $doXima="/mobi/doXima.php" //确认洗码

let $execSelfXima="/asp/execSelfXima.php" //确认洗码 PC？
let $getAllAutoXimaObject="/asp/getAllAutoXimaObject.php";//洗码

let $transferInforCoupon="/asp/transferInforCoupon.php"; //优惠券
let $queryPTLosePromo="/mobi/queryPTLosePromo.php" //查询pt老虎机救援金记录
let $getBetUpgrateVO="/asp/getBetUpgrateVO.php"; //助晋级查询
let $checkUpgrade="/asp/checkUpgrade.php"; //申请礼金
let $canClaimBirthdayCoupon="/canClaimBirthdayCoupon.php"; //查询生日礼金
let $claimBirthdayCoupon="/claimBirthdayCoupon.php"; //领取生日礼金
let $queryFriendBonue="/mobi/queryFriendBonue.php";//推荐好久
let $claimLosePromo="/mobi/claimLosePromo.php ";//处理救援金
let $commitPTSelf='/asp/commitPT8Self.php'; //体验金
let $canGetPt8CouponCheck ='/asp/canGetPt8CouponCheck.php'; //查询体验金
let $transferInforFriend='/asp/transferInforFriend.php';//推荐好友奖金
export function getAllAutoXimaObject(data){
  return ajax.get($getAllAutoXimaObject,data);
}
export function canGetPt8CouponCheck(data){
  return ajax.get($canGetPt8CouponCheck,data);
}
export function execSelfXima(data){
  $load.open("正在洗码...")
  return  ajax.post($execSelfXima,data);
}
export function transferInforFriend(data){
  $load.open("正在领取...")
  return  ajax.post($transferInforFriend,data);
}
export function commitPTSelf(data){
  $load.open("正在领取...")
  return  ajax.post($commitPTSelf,data);
}
export function claimLosePromo(data){
  $load.open("处理中...")
  return  ajax.post($claimLosePromo,data);
}
export function youhui(){
  return  ajax.get($youhui);
}
export function getSelfYouHuiObject(data){
  $load.open("处理中...")
  return  ajax.post($getSelfYouHuiObject,data);
}
export function getXimaData(data){
  return  ajax.post($getXimaData,data);
}
export function doXima(data){
  $load.open("正在洗码...")
  return  ajax.post($doXima,data);
}

export function transferInforCoupon(data){
  $load.open("处理中...")
  return  ajax.post($transferInforCoupon,data);
}

export function queryPTLosePromo(data){
  return  ajax.post($queryPTLosePromo,data);
}
export function getBetUpgrateVO(data){
  return  ajax.post($getBetUpgrateVO,data);
}
export function checkUpgrade(data){
  return  ajax.post($checkUpgrade,data);
}
export function canClaimBirthdayCoupon(data){
  return  ajax.post($canClaimBirthdayCoupon,data);
}
export function claimBirthdayCoupon(data){
  return  ajax.post($claimBirthdayCoupon,data);
}
export function queryFriendBonue(data){
  return  ajax.post($queryFriendBonue,data);
}




