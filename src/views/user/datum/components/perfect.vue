<template>
  <div  class="contentbox wrapper form">
    <div class="inputbox">
      <span class="label">真实姓名：</span>
      <input type="text"  v-model="Data.accountName"  placeholder="填写后无法修改，与银行卡持卡人一致"/>
    </div>
    <div class="inputbox">
      <span class="label">手机号码：</span>
      <input type="text"  v-model="userData.phone"  readonly placeholder=""/>
    </div>
    <div class="inputbox">
      <span class="label">电子邮箱：</span>
      <input type="text" v-model="Data.email" name="email" id="email" placeholder="填写邮箱地址，方便帐号找回" value=""/>
    </div>
    <div class="inputbox">
      <span class="label">出生日期：</span>
      <input type="date" v-model="Data.birthday" placeholder="填写后有机会获得专属生日礼金" class="inpt Wdate"/>
    </div>
    <div class="inputbox">
      <span class="label">银行卡号：</span>
      <input type="text"  v-model="Data.bankno" @input="getBank" placeholder="输入卡号后，系统智能识别银行" />
      <span>{{banktxt}}</span>
    </div>
    <div class="inputbox">
      <span class="label">微信号码：</span>
      <input type="text"   v-model="Data.wexin"  placeholder="用于接收优惠信息，非必填项"  />
    </div>
    <div class="inputbox">
      <span class="label">Q Q号码：</span>
      <input type="text"   v-model="Data.qq"  placeholder="用于接收优惠信息，非必填项" />
    </div>
    <div>
      <a href="javascript:void(0);" class="formbtn" @click="submit">提交</a>
    </div>
    <div class="note">请注意，检测如有同ip同姓名，或银行卡已被使用时，将无法领取体验金，感谢您的理解。</div>
    <div class="wrapper success"><h1>完善资料成功！</h1><br/><br/>
      <router-link to="/" class="formbtn">领取体验金</router-link>
    </div>
  </div>
</template>
<script>
  import {completeUserInfo} from "api/user"
  import {validateBankNo} from "api/safeCenter"
  import { mapGetters } from 'vuex'

  export default {
    name: 'hello',
    data () {
      return {
        banktxt: "",
        validateBankNo: false,
        Data: {
          birthday: "", //true string
          accountName: "", //true string
          bankno: "", //true string
          email: "", //true string
          qq: "",
          wexin:""
        }
      }
    },
    methods: {
      checked(){

        if (this.Data.accountName == "") toast("请输入真实姓名");
        else if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.Data.email)) {
          toast("请输入正确的电子邮箱")
        }
        else if(!/^[\u4e00-\u9fa5]+$/.test(this.Data.accountName))toast("请输入中文姓名");
        else if (this.Data.birthday == "") toast("请输入生日");
        else if (this.Data.bankno == "") toast("请输入银行卡号");
        else if (!this.validateBankNo) toast("银行卡号检测未通过");

        else {
          return true;
        }
      },
      getBank(){
        if (/^(\d{16}|\d{19})$/.test(this.Data.bankno)) {
          validateBankNo({bankno: this.Data.bankno}).then(data => {
            if(data.success){

              this.banktxt = data.data;
              this.validateBankNo = data.success;
            }
          })
        } else {
          this.banktxt = "";
        }
      },
      submit(){
        if (!this.checked())return;
        completeUserInfo(this.Data).then(data => {
          if (data.success) {
            $confirm("完善资料成功!领取体验金","提示",{
              confirmText:"立刻领取"
            }).then(()=>{
              this.$router.push("/");
            });
            this.$store.dispatch("UPDATE_USERDATA");
          } else {
            toast(data.message)
          }
        }).catch(err=>{
          toast("请稍后重试");
        })
      }
    },
    created(){

    },
    computed: {
      ...mapGetters(["userData"])
    },
    components:{

    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .perfect .wrapper.success {
    position: fixed; top: 30%; left: 40%; background: #fff; padding: 50px 100px; font-size: 20px; text-align: center; display: none;
    .formbtn {
      background: #0d7578; padding: 10px 20px; border-radius: 10px; color: #ccab67;
    }
  }
</style>
