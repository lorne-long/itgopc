
import ajax from 'api/index'

let $youhui="/youhui/youhui.php"; //存送优惠
let $getSelfYouHuiObject="/youhui/getSelfYouHuiObject.php";//自助优惠

let $getAllAutoXimaObject="/xima/getAllAutoXimaObject.php";//取得用户全部平台的洗码资料
let $getXimaData="/xima/getXimaData.php" //查询洗码记录 来确认是否能洗码
let $doXima="/xima/doXima.php" //确认洗码




let $transferInforCoupon="/youhui/transferInforCoupon.php"; //优惠券 使用优惠代码转入金额

let $queryPTLosePromo="/youhui/queryPTLosePromo.php" //查询pt老虎机救援金记录
let $claimLosePromo="/youhui/claimLosePromo.php ";//处理救援金


let $getBetUpgrateVO="/youhui/getBetUpgrateVO.php"; //自助晋级查询
let $checkUpgrade="/youhui/checkUpgrade.php"; //自助晋级


let $canClaimBirthdayCoupon="/youhui/canClaimBirthdayCoupon.php"; //是否可以领取生日礼金
let $claimBirthdayCoupon="/youhui/claimBirthdayCoupon.php"; //领取生日礼金

let $queryFriendBonue="/youhui/queryFriendBonue.php";//查询推荐好友奖金余额
let $transferInforFriend='/youhui/transferInforFriend.php';//推荐好友奖金  转入平台

let $commitPT8Self='/youhui/commitPT8Self.php'; //体验金 领取
let $canGetPt8CouponCheck ='/youhui/canGetPt8CouponCheck.php'; //查询体验金


export function commitPT8Self(data){
  $load.open("正在领取...")
  return  ajax.get($commitPT8Self,data);
}
export function canGetPt8CouponCheck(data){
  return ajax.get($canGetPt8CouponCheck,data);
}
export function getAllAutoXimaObject(data){
  return ajax.get($getAllAutoXimaObject,data);
}
export function transferInforFriend(data){
  $load.open("正在领取...")
  return  ajax.post($transferInforFriend,data);
}

export function claimLosePromo(data){
  $load.open("处理中...")
  return  ajax.post($claimLosePromo,data);
}
export function youhui(){return  ajax.get($youhui);}

export function getSelfYouHuiObject(data){
  $load.open("处理中...")
  return  ajax.post($getSelfYouHuiObject,data);
}
export function getXimaData(data){return  ajax.get($getXimaData,data);}
export function doXima(data){
  $load.open("正在洗码...")
  return  ajax.post($doXima,data);
}

export function transferInforCoupon(data){
  $load.open("处理中...")
  return  ajax.post($transferInforCoupon,data);
}

export function queryPTLosePromo(data){
  return  ajax.get($queryPTLosePromo,data);
}
export function getBetUpgrateVO(data){
  return  ajax.get($getBetUpgrateVO,data);
}
export function checkUpgrade(data){
  return  ajax.get($checkUpgrade,data);
}
export function canClaimBirthdayCoupon(data){
  return  ajax.get($canClaimBirthdayCoupon,data);
}
export function claimBirthdayCoupon(data){
  return  ajax.get($claimBirthdayCoupon,data);
}
export function queryFriendBonue(data){
  return  ajax.get($queryFriendBonue,data);
}




