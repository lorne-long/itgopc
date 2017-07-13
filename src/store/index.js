import Vue from 'vue'; //引入vue
import Vuex from 'vuex'; //引入vue
import router from '@/router'; //引入vue
// import types from '@/util/types'; //mutations
import {ajaxGetSessionPersonalData} from 'api/user'; //mutations
import {checkWithdrawPwd} from 'api/safeCenter'; //mutations
import {logOut} from 'api/authService'; //mutations
import * as types from './types'; //引入vue
import {$localStorage,$sessionStorage} from '@/util/storage';
Vue.use(Vuex);
export default new Vuex.Store({
  state:{ //不要直接访问state
    authList:[], //权限列表
    isSetPayPwd:null, //是否设置支付密码
    showLogin:false, //登录弹窗
    userData:{
      qq:"",//true string
      loginname:"",// true string
      accountName:"",//t true string 姓名，通过该字段是否有值可判断是否已设置过用户信息
      phone:"",//true string
      level:0,//true string 用户等级
      email:"",// false string
      accountMoney:0,// true string
      role:"",//true string 角色
      birthday:"",//false string 生日
      levelNumber:"",//true number 等级（数字）
      deputyCredit:"",//true number 副账户余额
      phoneValidStatus:"",//true string 手机号是否验证
      mobileNum:"",//true string 手机号
      referWebsite:"",//
    }
  },
  getters:{
    showLogin(state,getters){
      return state.showLogin;
    },
    isSetPayPwd(state,getters){
      if(state.isSetPayPwd==null){ //异步的一种获取
        checkWithdrawPwd().then(res=>{
          if(res.success){
            state.isSetPayPwd=res.data=='1';
          }
        })
      }
      return state.isSetPayPwd;
    },
    userData(state,getters){ //其有可能进行过滤
      return state.userData;
    },
    authList(state,getters){  //权限集合
      return state.authList;
    },
    isAgent(state,getters){ //没有权限表示没有登录
      return state.authList.includes(types.AUTH_NAME.AGENT);
    },
    isUser(state,getters){ //没有权限表示没有登录
      return state.authList.includes(types.AUTH_NAME.USER);
    },
    islogin(state,getters){ //没有权限 表示没有登录 //或者值中又一个===true表示已经登录了
      if($sessionStorage&&$sessionStorage.get(types.IS_LOGIN)==='true'){ //先查sessionStorage
        if(state.authList.length==0){ //浏览器刷新 authList肯定没有 没有就查一次后台
          return false
        }
        return true;
      }
      if(state.authList.length>0){  //sessionStorage
        $sessionStorage&&$sessionStorage.set(types.IS_LOGIN,true)
        return true;
      }
      return false;
    }
  },
  mutations:{
    [types.SET_PAYPWD](state,val){
      state.isSetPayPwd=val
    },
    [types.SET_USERDATA](state,val={}){
      Object.assign(state.userData,val||{});
    },
    [types.SHOW_LOGIN](state,val){
      state.showLogin=val;
    },
    [types.SET_AUTH](state,val){ //设置权限
      if(typeof val==='string'){
        state.authList=[val];
      }
      else if(Array.isArray(val)){
        state.authList=val;
      }else{
        state.authList=[];
      }
    },
    [types.ADD_AUTH](state,val){
      state.authList.push(val);
    },
    [types.REMOVE_AUTH](state,val){
      if(val===undefined){ //如果不传清空所有权限
        $sessionStorage&&$sessionStorage.remove(types.IS_LOGIN);
        state.authList=[]
      }else{
        let index=state.authList.indexOf(val)
        if(index> -1){
          state.authList.splice(index,1);
        }
      }
    },

  },
  actions:{
    [types.INIT_INFO]({commit},val){ //初始化所有信息 相当于推出
      commit(types.REMOVE_AUTH);
      commit(types.SET_PAYPWD,null)
      commit(types.SET_USERDATA,{
        qq:"",//true string
        loginname:"",// true string
        accountName:"",//t true string 姓名，通过该字段是否有值可判断是否已设置过用户信息
        phone:"",//true string
        level:0,//true string 用户等级
        email:"",// false string
        accountMoney:0,// true string
        role:"",//true string 角色
        birthday:"",//false string 生日
        levelNumber:"",//true number 等级（数字）
        deputyCredit:"",//true number 副账户余额
        phoneValidStatus:"",//true string 手机号是否验证
        mobileNum:"",//true string 手机号
        referWebsite:"",//
      })
    },
    [types.LOGIN_OUT]({commit,dispatch},val){ //退出登录
      dispatch(types.INIT_INFO)
      logOut().then(res=>{
        router.push("/")
      }).catch(res=>{
        toast("请重试")
      })
    },
    [types.GET_PAYPWD]({commit},val){  // 获取登录密码
      return new Promise((resolve,reject)=>{
        checkWithdrawPwd().then(res=>{
          if(res.success){
            commit(types.SET_PAYPWD,res.data=="1");
          }
          return resolve(res)
        }).catch(err=>{
          reject(err)
        })
      })
    },
    [types.UPDATE_USERDATA]({commit,dispatch},val){ //获取 初始化信息
      return ajaxGetSessionPersonalData().then(res =>{
        if(res.success){
          dispatch(types.GET_PAYPWD)
          commit(types.SET_USERDATA,res.data);
          commit(types.SET_AUTH,res.data.role);
        }
        return Promise.resolve(res);
      });
    }
  }
});

