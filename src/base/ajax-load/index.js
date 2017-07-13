let defaults={
  text:'操作中...'
};
import Vue from 'vue';
import ajaxload from './index.vue';
let ajaxload_vue=Vue.extend(ajaxload);
let instance,loadQueue=[]; //一个队列 加载框一般就一个
var initInstance=function(){
  instance=new ajaxload_vue({
    el:document.createElement('div')
  });
  document.querySelector('body').appendChild(instance.$el);
};
let showNext=()=>{
  if(!instance.value){ //只有弹一个 下一个等待
    if(loadQueue.length>0){
      let setting=loadQueue.shift();
      for(let prop in setting){
        if(setting.hasOwnProperty(prop)){
          instance[prop]=setting[prop];
        }
      }
      Vue.nextTick(()=>{
        if(loadQueue.length==0){
          instance.value=true;
        }
      });
    }
  }
}
let gifload=function(setting={}){
  if(!instance){ //单例模式
    initInstance();
  }
  if(typeof setting=="string"){
    setting={
      text:setting
    }
  }
  loadQueue.push(setting);
  showNext()
}
gifload.open=(text,options={})=>{
  if(typeof  text=="string"){
    options.text=text
  }else{
    options=text
  }
  gifload(options);
}
gifload.close=()=>{
  if(!instance)return;
  showNext();
  if(loadQueue.length==0){
    instance.value=false;
  }
}
export const open=gifload.open;
export const close=gifload.close;
export default gifload;
