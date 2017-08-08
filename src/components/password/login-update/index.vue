<template>
  <div class="tab-bd up-pwd v-align">
  <div class="contentbox">
    <table style="margin: 0px auto;">
      <tr>
        <td>原密码：</td>
        <td><input type="password" v-model="password" name="password" placeholder="原密码" class="eyecheck"> <span
          id="pwds0" class="showpwd eyeclose hidden"></span></td>
      </tr>
      <tr>
        <td>新密码：</td>
        <td><input type="password" v-model="new_password" name="new_password"
                   placeholder="密码为6-16位数字或英文字母，英文字母开头且不能和账号相同" class="eyecheck">
          <span id="pwds1" class="showpwd eyeclose hidden"></span></td>
      </tr>
      <tr>
        <td>确认密码：</td>
        <td><input type="password" v-model="confirm_password" name="confirm_password" placeholder="再次输入"
                   class="eyecheck">
          <span id="pwds2" class="showpwd eyeclose hidden"></span></td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>
          <button type="submit" class="formbtn btn-submit" @click="submit">确定</button>
        </td>
      </tr>
    </table>
  </div>
  </div>
</template>
<script>
  import  md5  from "MD5";
  import  {changepws}  from "api/safeCenter";
  export default {
    data() {
      return {
        password:"",// true string
        confirm_password:"",// true string
        new_password:""
      };
    },
    props:{},
    methods:{
      check(){
        if(this.password=="")toast("请输入原密码");
        else if(this.new_password=="")toast("请输入新密码");
        else if(this.confirm_password=="")toast("请重复新密码");
        else if(this.new_password!=this.confirm_password)toast("二次密码不一致");
        else if(this.password==this.new_password)toast("新密码不能与旧密码相同");
        else{
          return true;
        }
      },
      submit(){
        if(!this.check())return;
        changepws(
          {
            password:md5(md5(this.password)),
            confirm_password:md5(md5(this.confirm_password)),
            new_password:md5(md5(this.new_password)),
          }
        ).then(data=>{
          if(data.success){
            toast(data.message);
            this.password=this.confirm_password=this.new_password=""
          }else{
            toast(data.message)
          }
        }).catch(err=>{
          toast("修改失败,稍后重试")
        })
      }
    }
  };
</script>
<style>
</style>
