<template>
  <div class="page_content_wrap">
    <div class="main_nav_with_arrow ul_auto_wrap main_nav_with_arrow_Julien">
      <ul>
        <li class="active j-sms" data-href="tiyanjin_content">
          <a href="static/forgotPassword.jsp" class="layout_image_with_text">
            <img src="static/images/icons/icon_mobile.png" width="40" height="40">
            <span class="img_text">短信找回</span>
          </a>
          <span class="arrow_down"></span>
        </li>
        <!-- <li class="j-email" data-href="user_transfer_content">
                      <a href="forget_password02.html" class="layout_image_with_text">
                          <img src="images/icons/icon_mail02.png" width="40" height="40">
                          <span class="img_text">邮箱找回</span>
                      </a>
                  </li> -->
        <li data-href="user_rebate_content">
          <a href="https://www.ll-kefu.com/chat/chatClient/chatbox.jsp?companyID=8999&amp;configID=37"
             class="layout_image_with_text" target="_blank">
            <img src="static/images/icons/icon_chat03.png" width="40" height="40">
            <span class="img_text">客服找回</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="layout_form layout_form03 j-content">
      <div class="form_field_warp">
        <div class="form_field with_icon_label">
          <span class="form_field_label"><span class="icon icon_user"></span></span>
          <div class="form_field_input"><input v-model="name" type="text" placeholder="请输入您的游戏账号"></div>
        </div>
        <div class="form_field with_icon_label">
          <span class="form_field_label"><span class="icon icon_phone"></span></span>
          <div class="form_field_input"><input v-model="phone" type="text" placeholder="请输入绑定手机号码"></div>
        </div>
      </div>
      <tou-click v-model="showVerify" @success="success"></tou-click>
      <div class="btn_wrap">
        <a href="javascript:void(0);" @click="verify" v-show="!showVerify" class="btn btn01">验证</a>
      </div>
    </div>
  </div>
</template>
<script>
  import {getbackPwdByDx_dc} from "api/common";
  import touClick from "components/touclick";
  let _phone=/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
  export default {
    data() {
      return {
        showVerify:false, //显示验证
        sid:"9d154e5f-4f65-4b6d-9201-632adcdba1b7", // true string
        phone:"15896542132", // true string
        check_address:"sverify-5-2-0", // true string
        token:"99da842a-40d4-4f10-9a221499131241289", //true string
        name:"adfad"
      };
    },
    methods:{
      verify(){
        if(this.name=='')toast("请输入游戏账户;");
        else if(!_phone.test(this.phone))toast("手机号码格式不正确");
        else{
          this.showVerify=true;
        }
      },
      success(obj,tc){
        this.token=obj.token;
        this.check_address=obj.checkAddress;
        this.sid=obj.sid;
        getbackPwdByDx_dc(this.$data).then(res=>{
          if(res.success){
            tc.destory();
          }else{
            this.showVerify=false;
            toast(res.message)
          }
        }).catch(err=>{
          toast("验证失败...");
        })
      }
    },
    components:{
      touClick
    }
  };
</script>
<style>
</style>
