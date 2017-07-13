<template>
  <!--用户登录注册-->
  <div id="user-login" v-show="value" class="model-alert">
    <div class="user">
      <div class="tab-btn">
        <a @click="change(0)" :class="{active:menuActive}" href="javascript:void(0);">用户登录</a>
        <a @click="change(1)" :class="{active:!menuActive}" href="javascript:void(0);">注册账户</a>
      </div>
      <div class="user-main">
        <component @change="change" :is="templet"></component>
      </div>
      <div class="close" @click='SHOW_LOGIN(false)'></div>
    </div>
  </div>
</template>
<script>
  import  {login} from "api/authService";
  import  cover from "base/cover/cover";
  import  vlogin  from "./login/index";
  import  rigester  from "./rigester/index";
  import {mapGetters,mapActions,mapMutations} from 'vuex'
  export default {
    mixins:[cover],
    data() {
      return {
        show:false,
        templet:vlogin,
        menuActive:true
      };
    },
    props:{
      showModel:{default:true}
    },
    methods:{
      ...mapMutations(["SHOW_LOGIN"]),
      change(val){
        this.templet=!val ? vlogin : rigester;
        this.menuActive= !val;
      }
    }
  };
</script>
