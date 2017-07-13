<template>
  <div class="contentbox  formbox">
    <table style="margin:0 auto;">
      <tr>
        <td><span class="label">原来支付密码：</span></td>
        <td><input type="password" v-model="originalPwd" name="originalPwd" placeholder="请输入您原来支付密码" class="eyecheck" maxlength="6"></td>
      </tr>
      <tr>
        <td><span class="label">新的支付密码：</span></td>
        <td><input type="password" v-model="newPwd" name="newPwd" placeholder="请设置6位支付密码，由纯数字组成" class="eyecheck" maxlength="6"></td>
      </tr>
      <tr>
        <td>
          &nbsp;
        </td>
        <td>
          <button type="submit" class=" formbtn"  @click="submit">确定</button>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
  import  {modifyWithdrawPwd}  from "api/safeCenter";
  import  md5  from "MD5";
  export default {
    data() {
      return {
        originalPwd:"",
        newPwd:""
      };
    },
    methods:{
      checkFrom(){
        if(this.originalPwd=='')toast("请输入原密码");
        else if(this.newPwd=='')toast("请输入新密码");
        else if(this.newPwd==this.originalPwd)toast("新密码不能和旧密码相同");
        else{
          return true;
        }
      },
      submit(){
        if(!this.checkFrom())return;
        modifyWithdrawPwd({
          originalPwd:md5(md5(this.originalPwd)),
          newPwd:md5(md5(this.newPwd))
        }).then(data=>{
          if(data.success){
            this.originalPwd=this.newPwd='';
            toast("修改成功");
          }else{
            toast(data.message);
          }
        }).catch(err=>{
          toast("修改失败,请重新尝试");
        })
      }
    }
  };
</script>
<style>
</style>
