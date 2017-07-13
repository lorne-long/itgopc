<template>
  <ul class="personal-data personalinfo">
    <li>真实姓名：<span>{{userData.accountName}}</span></li>
    <li>手机号码：<span class="mobile">{{userData.phone}}</span></li>
    <li>电子邮箱：<span class="email">{{userData.email}}</span></li>
    <li>Q&nbsp;Q号码：<span><input v-model="newDetail.qq" :placeholder='oldDetail.qq|conceal(2)' /></span><a @click="upData('qq')" href="javascript:;">修改</a>
    <li>微信号码：<span><input v-model="newDetail.weixin" :placeholder='oldDetail.weixin|conceal(2)' /></span><a @click="upData('weixin')" href="javascript:;">修改</a></li>
    <li>出生日期： <span class="bdate">{{userData.birthday|Date}}</span></li>
    <verify-phone  v-if="userData.phoneValidStatus==0"></verify-phone>
  </ul>
</template>
<script>
  import {mapGetters,mapActions} from 'vuex'
  import {modifyCustomerSocialInfo, getCustomerSocialInfo} from 'api/user';
import  verifyPhone from './verify'
    export default {
        data() {
            return {
              verify:false,
              newDetail: {
                qq: "",
                weixin: "",
                email:''
              },
              oldDetail: {
                qq: "",
                weixin: "",
                email:''
              },
            };
        },
        watch:{},
        props:{},
        methods:{
          upData(type){
            if(this.newDetail[type]=="")
              return  toast("请填写要修改的数据");
            modifyCustomerSocialInfo({[type]: this.newDetail[type]}).then(data => {
              if(data.success){
                this.oldDetail[type]= this.newDetail[type];
                this.newDetail[type]="";
              }
              toast(data.message);
            }).catch(err => {
              toast("加载失败")
            })
          }
        },
        created(){
          this.oldDetail.qq =this.userData.qq;
          this.oldDetail.weixin =this.userData.weixin;
          this.oldDetail.email =this.userData.email;
        },
        computed:{
          ...mapGetters(["userData"])
        },
        components:{
          verifyPhone
        }
    };
</script>
<style>
</style>
