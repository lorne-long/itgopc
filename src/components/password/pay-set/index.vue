<template>
  <div class="tab-bd up-pwd  v-align">
  <div class="contentbox">
      <table style="margin:0 auto;">
        <tr class="inputbox">
          <td class="label">登录密码：</td>
          <td>
            <input type="password" v-model="loginPwd" name="loginPwd" placeholder="请输入您的登录密码" class="eyecheck">
          </td>
        </tr>
        <tr class="inputbox">
          <td class="label">支付密码：</td>
          <td><input type="password"  v-model="withdrawPwd" name="withdrawPwd" placeholder="请设置6位支付密码，由纯数字组成" class="eyecheck" maxlength="6"></td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td><button type="submit" class="formbtn" @click="submit" >确定</button></td>
        </tr>
      </table>
  </div>
  </div>
</template>
<script>
  import  md5  from "MD5";
  import  {bindWithdrawPwd,checkWithdrawPwd}  from "api/payment";
  export default {
    data() {
      return {
        withdrawPwd:'',
        loginPwd:""
      };
    },
    methods:{
      checkForm(){
        if(this.loginPwd=='')toast("请输入登录密码");
        else if(this.withdrawPwd=="")toast("请输入支付密码");
        else{ return true;}
      },
      submit(){
        if(!this.checkForm())return;
        bindWithdrawPwd({
          withdrawPwd:md5(md5(this.withdrawPwd)),
          loginPwd:this.loginPwd
        }).then((data)=>{
          if(data.success){
            toast("设置成功");
            const {rquest}= this.$route.query;
            if(rquest){
              this.$router.push({path:rquest});
            }
            this.loginPwd=this.withdrawPwd='';
          }else{
            toast(data.message);
          }
        }).catch(err=>{
          toast("设置失败,请重新尝试");
        })
      }
    }
  };
</script>
<style>
</style>
