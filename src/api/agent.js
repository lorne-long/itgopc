/**
 * Created by lorne on 2017/6/19.
 */

import ajax from './index'; //引入vue

let $agentReport = "/mobi/agentReport.php";//数据汇总（代理首屏页）
let $queryCreditlogs = "/mobi/queryCreditlogs.php";//额度记录查询

let $searchCreditlogsData = "/asp/searchCreditlogsData.php";//报表数据汇总
let $searchagprofitData = "/asp/searchagprofitData.php";//会员输赢查询
let $getAgentQueryType = "/mobi/getAgentQueryType.php";//代理查询类型
let $queryAgentSubUserInfoData = "/asp/queryAgentSubUserInfoData.php";//查询代理下线信息
let $getXimaSelectItems = "/asp/getXimaSelectItems.php";//洗码选项
let $searchPtCommissionsData = "/asp/searchPtCommissionsData.php";//老虎机日结佣金记录
let $searchsubuserProposalData = "/asp/searchsubuserProposalData.php";//查询下线账务
let $getProposalYouHuiTypeSelectionData = "/asp/getProposalYouHuiTypeSelectionData.php";//获取优惠类型下拉数据
let $queryPlatformDetails="/asp/queryPlatformDetails.php";/***平台输赢*/

export function agentReport(data) {
  return ajax.get($agentReport, data);
}
export function queryPlatformDetails(data) {
  return ajax.get($queryPlatformDetails, data);
}
export function queryCreditlogs(data) {
  return ajax.get($queryCreditlogs, data);
}
export function searchCreditlogsData(data) {
  return ajax.get($searchCreditlogsData, data);
}
export function searchagprofitData(data) {
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
