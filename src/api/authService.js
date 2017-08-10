import ajax from './index'; //引入vue
import store from '@/store';	//加载状态管理器

let checkLogin = "/user/ajaxGetSessionPersonalData.php";/*** 检查登录*/

let $login = "/index/login.php";/*** 登录*/

let $logout = '/index/logout.php';/*** 登出*/

let $register = '/index/register.php';/***注册*/

let $registerAgent = '/mobi/registerAgent.php';

/**
 * 用户认证所用到的 API
 */
export function checkLogin() {
  return ajax.get(checkLogin);
}
export function login(userData){
  $load.open("登录中...");
  return ajax.post($login, userData);
}
export function logOut() {
  $load.open("正在退出...");
  return ajax.get($logout);
}
export function getAuthImg() {
  return  "/mobi/mobileValidateCode.php?random=" + Math.random();
}
export function register(data) {
  $load.open("正在注册...");
  return ajax.post($register,data)
}
export function registerAgent(data) {
  $load.open("正在注册...");
  return ajax.post($registerAgent,data)
}

