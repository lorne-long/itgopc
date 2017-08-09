<template>
  <li>
    <a href="javascript:void(0);" class="btn btn01 a_validate_phone formbtn ml0" @click="step=2">手机验证</a>
    <div id="d-reverse-sms" class="user_center_nav_content_step">
      <div class="layout_icon_text_button display_flex_h flex_align_center">
        <div class="icon_wrap"><img src="static/images/icons/icon_send_message.png" width="84" height="45"></div>
        <div class="flex_1">
          <p>请使用注册时填写的手机，发送短信“<span class="j-smsCode"></span>”到<span></span>，发送成功<span
            class="text_red">15</span>秒后，点击验证</p>
        </div>
      </div>
      <div class="btn_wrap no_padding">
        <a href="javascript:void(0);" class="btn btn01 formbtn" @click="verify">验证</a>
      </div>
    </div>
    <div v-show="step==2" >
      <div class="layout_icon_text_button display_flex_h flex_align_center">
        <div class="flex_1">
          <p>点击获取验证码，系统将向您的注册手机号发送一个验证码</p>
          <div class="inputbox pt20">
            <span class="label">验证码:</span>
            <input type="text" v-model="code" placeholder="请输入验证码" maxlength="">
            <a href="javascript:void(0);" class="btn btn04"  @click="showVerify=true" >获取验证码</a>
          </div>
        </div>
      </div>
      <v-touclick v-model="showVerify" @success="success"></v-touclick>
      <div class="btn_wrap no_padding">
        <a href="javascript:void(0);" class="btn btn01  formbtn"  @click="verify">验证</a>
      </div>
    </div>
  </li>
</template>
<script>
  import vTouclick from 'components/touclick'
  import  {sendSms4TYJ,checkPhoneCode} from "api/user";
  export default {
    data() {
      return {
        code:"",
        step:1,
        showVerify:false,
        isSendMsg:false,
        myData:{
          sid:"",//true string
          check_address:"", //true string
          check_key:"", //true string
        }
      };
    },
    watch:{},
    activated(){
    },
    methods:{
      verify(){
        if(!this.isSendMsg)return toast("请填写获取验证码");
        if(this.code=="")return toast("请填写验证码");
        checkPhoneCode({code:this.code}).then(res=>{
          toast(res.message)
          if(res.success){
            this.$emit("input",false)
          }
        }).catch(err=>{
          toast("验证失败");
        })
      },
      success(obj,tc){
        tc.destory();
        this.showVerify=false;
        this.myData.check_key=obj.token;
        this.myData.check_address=obj.checkAddress;
        this.myData.sid=obj.sid;
        sendSms4TYJ(this.myData).then(res=>{
          toast(res.message);
          this.isSendMsg=res.success

        }).catch(err=>{
          toast("发送失败")
        });
      },
    },
    computed:{},
    created(){
    },
    components:{
      vTouclick
    }
  };
</script>
<style>
</style>
