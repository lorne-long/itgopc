import ajax from './index'; //引入vue
import store from '@/store';	//加载状态管理器

let checkLogin = "/asp/ajaxGetSessionPersonalData.php";
/*** 检查登录*/
let _login = "/mobi/login.php";
/*** 登录*/
let _logout = '/mobi/logout.php';
/*** 登出*/
let _register = '/mobi/register.php';
/***注册*/
let _registerAgent = '/mobi/registerAgent.php';

/**
 * 用户认证所用到的 API
 */
export function checkLogin() {
  return ajax.get(checkLogin);
}
export function login(userData){
  $load.open("登录中...");
  return ajax.post(_login, userData);
}
export function logOut() {
  $load.open("正在退出...");
  return ajax.get(_logout);
}
export function getAuthImg() {
  return  "/mobi/mobileValidateCode.php?random=" + Math.random();
}
export function register(data) {
  $load.open("正在注册...");
  return ajax.post(_register,data)
}
export function registerAgent(data) {
  $load.open("正在注册...");
  return ajax.post(_registerAgent,data)
}

