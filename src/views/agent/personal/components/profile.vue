<template>
  <div>
    <div class="deposit_form">
      <table border="0" cellpadding="0" cellspacing="0" style="border-spacing:20px;">
        <tr>
          <td class="txt">代理账号：</td>
          <td class="cl-dd" id="p-person-name">{{userData.loginname}}
          </td>
        </tr>
        <tr>
          <td class="txt">邮箱地址：</td>
          <td class="cl-dd" id="p-person-email">{{userData.email}}</td>
        </tr>
        <tr>
          <td class="txt">真实姓名：</td>
          <td class="cl-dd" id="p-person-account-name">{{userData.accountName}}</td>
        </tr>
        <tr>
          <td class="txt">手机号码：</td>
          <td class="cl-dd">{{userData.mobileNum}}</td>
        </tr>
        <tr>
          <td class="txt">QQ：</td>
          <td class="cl-dd">
            <input v-model.number="newDetail.qq" :placeholder="oldDetail.qq|conceal(2,2)" type="text">
          </td>
        </tr>
        <!--
    <tr>
        <td class="txt">邮寄地址：</td>
        <td>
            <textarea name="address" class="text"  id="updateMailaddress" value="${session.customer.mailaddress}" /></textarea>
        </td>
    </tr>
    -->
        <tr>
          <td></td>
          <td class="cl-dd"><a @click="upData('qq')" href="javascript:;" class="redbtn">提交</a></td>
        </tr>
      </table>
    </div>
    <!--<div class="tips pd10">-->
    <!--<p>-->
    <!--为了您的账号安全，以上资料不能做修改-->
    <!--</p>-->
    <!--</div>-->
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import {modifyCustomerSocialInfo} from 'api/user';

  export default {

    data() {
      return {
        newDetail: {   // weixin  email不能修改？
          qq: "",
          weixin: "",
          email: ''
        },
        oldDetail: {
          qq: "",
          weixin: "",
          email: ''
        },
      };
    },
    methods: {
      upData(type) {
        if (this.newDetail[type] == "")
          return toast("请填写要修改的数据");
        modifyCustomerSocialInfo({[type]: this.newDetail[type]}).then(data => {
          if (data.success) {
            this.oldDetail[type] = this.newDetail[type];
            this.newDetail[type] = "";
          }
          toast(data.message);
        }).catch(err => {
          toast("加载失败")
        })
      }
    },
    activated(){
      let {qq, weixin, email} = this.userData;
      Object.assign(this.oldDetail, {qq, weixin, email});
    },
    computed: {
      ...mapGetters(["userData", "islogin", "isAgent", 'isUser', 'showLogin'])
    },
  }
</script>
