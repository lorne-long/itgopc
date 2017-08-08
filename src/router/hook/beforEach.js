import store from '@/store';	//加载状态管理器
import {checkLogin} from 'api/authService';
import {AUTH_NAME} from "@/store/types"//权限名称
// 权限拦截
export default (to,from,next) =>{
  // return next()
  let needFalseLogin=to.matched.some(function(item,i){
    return item.meta.needFalseLogin===true;
  })
  let NEED_AUTH=to.matched.some(function(item,i){
    return item.meta.auth;
  }) //需要登录
  if(needFalseLogin){ //登录后不允许进入
    if(store.getters.isAgent){
      next({path:"/agent/index"})
    }else{
      if(!store.getters.islogin){//没有登录
        next();
      }else{  //直接 跳index页面 或者根据登陆者权限来 判断
        checkLogin().then(res =>{  //逻辑条件 是否跳掉 用户/代理 中心首页
          if(res.success){
            let {role} = res.data;
            if(role==AUTH_NAME.USER){//如果是用户
              next("/user/index");
            }
            else if(role==AUTH_NAME.AGENT){ //需要代理用户 并且是代理
              next("/agent/index");
            }else{ //未知权限
              next({path:'/index',query:{rquest:to.fullPath}});
            }
          }else{
            next()
          }
        }).catch(err =>{
          next("/index");
        })
      }
    }
  }
  else if(NEED_AUTH){ //需要登录

    let USER_AUTH=to.matched.some(function(item,i){  //用户页面需要检查权限
      return Array.isArray(item.meta.auth)&&item.meta.auth.includes(AUTH_NAME.USER);
    })
    let AGENT_AUTH=to.matched.some(function(item,i){  //代理页面需要检查权限
      return Array.isArray(item.meta.auth)&&item.meta.auth.includes(AUTH_NAME.AGENT);
    })

    if(!store.getters.islogin){ //没有登录去检查一次
      checkLogin().then(res =>{
          if(res.success){
            let {role} = res.data;
            store.commit("SET_AUTH",role);
            store.commit("SET_USERDATA",res.data);
            if(AGENT_AUTH&&USER_AUTH){ //双方都有权限直接进
              next();
            }
            else if(USER_AUTH&&role==AUTH_NAME.USER){//如果是用户
              next();
            }
            else if(AGENT_AUTH&&role==AUTH_NAME.AGENT){ //需要代理用户 并且是代理
              next();
            }else{ //未知权限
              next({path:'/index',query:{rquest:to.fullPath}});
            }
            //设置权限
          }else{ //没有登录跳到登录页面

            store.dispatch("INIT_INFO");
            next({path:'/',query:{rquest:to.fullPath}});
          }
        }
      ).catch(() =>{
        store.dispatch("INIT_INFO");//报错清空登录
        next({path:'/',query:{rquest:to.fullPath}});
      });
    }else{
      if(USER_AUTH&&AGENT_AUTH){
        next();
      }
      else if(USER_AUTH&&store.getters.isUser){
        next();
      }
      else if(AGENT_AUTH&&store.getters.isAgent){ //需要代理用户 并且是代理
        next();
      }else{//未知权限
        next({path:'/index',query:{rquest:to.fullPath}});
      }
    }
  }
  else{
    next();
  }
}
