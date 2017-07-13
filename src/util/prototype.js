
String.prototype.format=function(){
  var arg=Array.from(arguments);
  return this.replace(/\{(\d+)\}/g,function(x,y,z){
    return arg[y]||"";
  })
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
Date.prototype.addDay=function(days){
   return  new Date(this.getTime()+days*86400*1000);
}
if (!Date.prototype.getWeekNumber) {
  Date.prototype.getWeekNumber = function(){
    var d = new Date(+this);
    d.setHours(0,0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
  };
}
//保留二位小数点 不四舍五入
String.prototype.$toFixed=function(_number=2){
  let _val= parseFloat(this).toString();
  _val=isNaN(_val)?"0":_val;
  _val+=_val.indexOf(".")>-1?"00":".00";
  return _val.replace(new RegExp('(\\d*\\.\\d{'+_number+'})\\d*','g'),"$1")
}

//拷贝文字
String.prototype.$copy=function(e){
  let $this=this;
  var save=function(e){
    e.clipboardData.setData('text/plain',$this);
    e.preventDefault();
  }
  document.addEventListener('copy',save);
  document.execCommand('copy');
  document.removeEventListener('copy',save);
  toast('复制成功');
}

//分割字符串  123456789分割成 12,345,678
String.prototype.strSplit=function(num=3,rpl=","){
  return this.toString().replace(new RegExp("(\\w)(?=(\\w{"+num+"})+(?!\\w))",'g'), "$1"+rpl)
}

export const DateFormat=Date.prototype.format
