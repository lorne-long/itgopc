import vueRouter from '@/router'; //引入vue
import _axios from 'axios'; //引入axios
import store from '@/store';	//加载状态管理器
var ajax=_axios.create({
  // baseURL:"http://112.213.126.135:4777",
  method:"get",
  timeout:10000,
  responseType:"json",
  withCredentials:true,  // 跨域是否带Token
  // cancelToken: new CancelToken(function(cancel){})
  headers:{"content-type":"application/x-www-form-urlencoded;charset=UTF-8"}
  // transformRequest: [function (data) {
  //   // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
  //   data = Qs.stringify({});
  //   return data;
  // }],
  //
  // transformResponse: [function (data) {
  //   // 这里提前处理返回的数据
  //
  //   return data;
  // }],
});
// 请求拦截
var qs=require('qs');
let get=ajax.get;
ajax.get=function(url,data,config){
  return get(url,Object.assign({
    params:data||{}
  },config||{}));
};
ajax.interceptors.request.use(function(config){
  config.data=qs.stringify(config.data)
  return config;
},function(error){
  console.log("发送请求失败:"+error);
  return Promise.reject(error);
});
//响应拦截
ajax.interceptors.response.use(function(response){
    if(response.status===200&&response.data==undefined){
      let olddata=response.request.responseText||response.request.response;
      if(typeof olddata=="string"){
        try{
          response.data=JSON.parse(olddata)
        }catch(e){
          response.data={message:olddata,olddata:olddata,success:false};
        }
      }else{
        response.data=olddata;
      }
    }
    if(!response.data.hasOwnProperty("success")){
      response.data.success=response.data.code=="10000";
    }
    $load.close();
    if(response.status===200&&/40001/.test(response.data.code)){//没有登录
      store.dispatch("INIT_INFO");//重新初始化信息
      response.data.message="请先登录";
      if(!/ajaxGetSessionPersonalData\.php$/i.test(response.config.url)){
        store.commit("SHOW_LOGIN",true)
      }
    }
    return response.status===200 ? response.data : response;
  },
  function(error){
    $load.close();
    return Promise.reject(error);
  }
)
export default ajax;
