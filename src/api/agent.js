/**
 * Created by lorne on 2017/6/19.
 */

import ajax from './index'; //引入vue

let _agentReport = "/mobi/agentReport.php";//额度记录查询
let _queryCreditlogs = "/mobi/queryCreditlogs.php";//额度记录查询
let _querySubProposal = "/asp/querySubProposal.php";//查询下线提案
let _searchCreditlogsData = "/asp/searchCreditlogsData.php";//报表数据汇总
let _searchagprofitData = "/asp/searchagprofitData.php";//会员输赢查询
let _getAgentQueryType = "/mobi/getAgentQueryType.php";//代理查询类型
let _queryAgentSubUserInfoData = "/asp/queryAgentSubUserInfoData.php";//查询代理下线信息
let _getXimaSelectItems = "/asp/getXimaSelectItems.php";//洗码选项
let _searchPtCommissionsData = "/asp/searchPtCommissionsData.php";//老虎机日结佣金记录
let _searchsubuserProposalData = "/asp/searchsubuserProposalData.php";//查询下线账务
let _searchSubUserXimaRecordData = "/asp/searchSubUserXimaRecordData.php";//查询下线洗码记录
let _getProposalYouHuiTypeSelectionData = "/asp/getProposalYouHuiTypeSelectionData.php";//获取优惠类型下拉数据
let _queryPlatformDetails="/asp/queryPlatformDetails.php";/***平台输赢*/

export function agentReport(data) {
  return ajax.post(_agentReport, data);
}
export function queryPlatformDetails(data) {
  return ajax.post(_queryPlatformDetails, data);
}
export function queryCreditlogs(data) {
  return ajax.post(_queryCreditlogs, data);
}
export function querySubProposal(data) {
  return ajax.post(_querySubProposal, data);
}
export function searchCreditlogsData(data) {
  return ajax.post(_searchCreditlogsData, data);
}
export function searchagprofitData(data) {
  return ajax.post(_searchagprofitData, data);
}
export function getAgentQueryType(data) {
  return ajax.post(_getAgentQueryType, data);
}
export function queryAgentSubUserInfoData(data) {
  return ajax.post(_queryAgentSubUserInfoData, data);
}
export function getXimaSelectItems(data) {
  return ajax.post(_getXimaSelectItems, data);
}
export function searchPtCommissionsData(data) {
  return ajax.post(_searchPtCommissionsData, data);
}
export function searchsubuserProposalData(data) {
  return ajax.post(_searchsubuserProposalData, data);
}
export function searchSubUserXimaRecordData(data) {
  return ajax.post(_searchSubUserXimaRecordData, data);
}
export function getProposalYouHuiTypeSelectionData(data) {
  return ajax.post(_getProposalYouHuiTypeSelectionData, data);
}
