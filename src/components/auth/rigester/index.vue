<template>
  <div class="user-rig">
    <form id="form-register">
      <div class="login-form">
        <div class="icon-user"><label>用户名</label>
          <input v-model="data.account"  name="account" value="" type="text" placeholder="6-10位数字与字母组成"/>
        </div>
        <div class="icon-enter"><label>密&nbsp;&nbsp;码</label>
          <input v-model="data.password" type="password" id="register-password" name="password" placeholder="6-16位数字或字母组成"/>
        </div>
        <div class="icon-phone"><label>手机号</label>
          <input v-model="data.phone" name="phone"
                 type="text" placeholder="取款唯一凭证，请填写正确手机号码" maxlength="11"/></div>
        <div class="user-code icon-code"><label>验证码</label>
          <div class="u-code-ipt">
            <input type="text" v-model="data.imageCode" id="register-code" name="imageCode" placeholder="验证码"/>
          </div>
          <img class="j-code" src="/mobi/mobileValidateCode.php?v=1"/>
        </div>
        <!--<label class="agreement" for="rig_xy"><input id='rig_xy'  type="radio">我已年满18岁，同意并查看过游戏的<a class="cl-gr" href="javascript:void(0);">《协议条款》</a></label>-->
      </div>
      <div class="user-btn">
        <button type="submit" class="button icon-btn0" @click.prevent="register"> 立即开户</button>
        <span class="button icon-r rig-btn">已有账户？ <a class="cl-gr" @click="$emit('change',0)" href="javascript:void(0);">在此登录</a> </span>
      </div>
    </form>
  </div>
</template>
<script>
  import {getAuthImg,register} from 'api/authService';
  export default{
    data() {
      return {
        authImg:getAuthImg(),
        data:{
          aliasName:"", //true string
          phone:"", //true string
          confirmPassword:"",// true string
          email:"", //true string
          name:"", //true string
          account:"", //true string
          birthDate:"", //true string
          imageCode:"", //true string
          password:"", //true string
          qq:"", //true string
          intro:""
        }
      }
    },
    methods:{
      checked(){
        let _RegExp=/^(?!(?:\d+|[a-zA-Z]+)$)[\da-zA-Z]{6,16}$/;
        let _phone=/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
        if(!_RegExp.test(this.data.account))toast("用户名(6-10位数字和字母)");
        else if(!_RegExp.test(this.data.password))toast("密码(6-10位数字和字母)");
        else if(!_phone.test(this.data.phone))toast("手机号格式不正确");
        else if(this.data.imageCode=="")toast("请输入验证码");
        else{
          return true;
        }
      },
      register(){
        if(!this.checked())return;
        register(this.data).then((res)=>{
          this.getimg()
          if(res.success){
            this.$router.replace({path:"/login/registersuccess",query:{account:this.data.account}});
          }else{
            toast(res.message);
          }
        }).catch(err=>{
          this.getimg()
        });
      },
      getimg(e) {
        this.authImg=getAuthImg();
      }
    }
  }
</script>
<style>
</style>
