/**
 * Created by lorne on 2017/6/19.
 */

import ajax from './index'; //引入vue

let $agentReport = "/agent/agentReport.php";//数据汇总（代理首屏页）

let $searchagprofitData = "/agent/searchagprofitData.php";//会员输赢查询
let $getAgentQueryType = "/agent/getAgentQueryType.php";//提案类型值
let $queryAgentSubUserInfoData = "/agent/queryAgentSubUserInfoData.php";//查询代理下子用户信
let $getXimaSelectItems = "/agent/getXimaSelectItems.php";//洗码选项
let $searchPtCommissionsData = "/agent/searchPtCommissionsData.php";//老虎机日结佣金记录
let $searchsubuserProposalData = "/agent/searchsubuserProposalData.php";//查询下线账务
let $getProposalYouHuiTypeSelectionData = "/agent/getProposalYouHuiTypeSelectionData.php";//获取优惠类型下拉数据

export function agentReport(data) {
  return ajax.get($agentReport, data);
}export function searchagprofitData(data) {
  return ajax.get($searchagprofitData, data);
}
export function getAgentQueryType(data) {
  return ajax.get($getAgentQueryType, data);
}
export function queryAgentSubUserInfoData(data) {
  return ajax.get($queryAgentSubUserInfoData, data);
}
export function getXimaSelectItems(data) {
  return ajax.get($getXimaSelectItems, data);
}
export function searchPtCommissionsData(data) {
  return ajax.get($searchPtCommissionsData, data);
}
export function searchsubuserProposalData(data) {
  return ajax.get($searchsubuserProposalData, data);
}
export function getProposalYouHuiTypeSelectionData(data) {
  return ajax.get($getProposalYouHuiTypeSelectionData, data);
}
