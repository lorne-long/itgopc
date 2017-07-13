/**
 * 按需全局化过滤器
 * 您还可以在组件定义时的 filters 属性中按需引入
 */
import Vue from 'vue'

import {DateFormat} from "@/util/prototype"

//保留二位小数点 不四舍五入 无小数点 自动加 .00
Vue.filter('toFixed',function(val,_number=2){
  return val.toString().$toFixed(_number)
});

//转换日期格式格式
Vue.filter('Date',function(val,format='yyyy-MM-dd'){
  return new Date(val).format(format);
});

//隐藏字符  abcd  默认隐藏为   a***
//start前面显示几个  end后显示  replaceval隐藏*
Vue.filter('conceal',function(val,start=1,end=0,replaceval='*'){
  if(val=="")return "";
  if(start+end>val.toString().length){
    start=1;
    end=0;
  }
   return val.toString().replace(
    new RegExp("(.{"+start+"})(.*)(.{"+end+"})"),function(x,a,b,c){
      return a+b.toString().replace(/./g,replaceval)+c;
    }
  )
});

//分割字符串    例如  金额 10000换为 10，000 字符串相同
Vue.filter('stringSplit',function(val,num=3,rpl=','){
 return val.toString().strSplit(num,rpl)
});



export  default {}
