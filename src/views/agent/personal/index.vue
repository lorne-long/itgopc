<template>
  <!--个人中心{-->
  <div class="content-main" id="agnet">
    <div class="tab-menu u-tab-menu u-tab-bd ">
      <router-link :to="{name:'personal_center'}">个人中心</router-link>
      <router-link :to="{name:'generalize_link'}">推广链接</router-link>
      <router-link :to="{name:'personal_loginUpdate'}">修改密码</router-link>
      <router-link :to="{name:'personal_payUpdate'}">支付密码</router-link>
      <router-link :to="{name:'bind_bank'}">绑定银行卡</router-link>
    </div>
    <keep-alive>
     <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
  import {checkWithdrawPwd} from 'api/payment';
  export default {
    data() {
      return {}
    },
    methods: {
    },
    beforeCreate(to, from, next) {
//      checkWithdrawPwd().then(data => {
//        if (!data.success) {
//          this.$router.push("/pwd/payset")
//        }
//      })
    },
    components: {}
  }
</script>
