<template>
  <div  class="content-main">
    <h3 class="fl top-left">我的账户</h3>
    <div class="tab-menu u-tab-menu u-tab-bd style_f ">
      <a  @click="showWhat=0" href="javascript:void(0)" :class="[{active:showWhat==0}]">修改登录密码</a>
      <a v-if="!isSetPayPwd"  @click="showWhat=1" href="javascript:void(0)" :class="[{active:showWhat==1}]">设置支付密码</a>
      <a v-else @click="showWhat=2" href="javascript:void(0)" :class="[{active:showWhat==2}]">修改支付密码</a>
    </div>
    <component :is="menuList[showWhat].component"></component>
  </div>
</template>
<script>
  import loginUpdate from "components/password/login-update"
  import paySet from "components/password/pay-set"
  import payUpdate from "components/password/pay-update"
  import {mapGetters,mapActions,mapMutations} from 'vuex'
  let menu=[
    {name:"修改登录密码",component:loginUpdate},
    {name:"设置支付密码",component:paySet},
    {name:"修改支付密码",component:payUpdate},
  ]
    export default {
        data() {
            return {
              showWhat:0,
              menuList:menu
            }
        },
        props:{},
        methods:{},
        computed:{
          ...mapGetters(["isSetPayPwd"])
        },
        created(){},
        components:{
          loginUpdate,paySet,payUpdate
        }
    };
</script>
<style>
</style>
