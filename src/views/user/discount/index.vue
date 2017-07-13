<template>
  <div class="content-main member transact">
    <h3>我的优惠</h3>
    <div class="tab-menu u-tab-menu max-tab horizontal style_f">
      <router-link v-for="item in menuList" :to="item.to"
                   style="padding: 0 23px">
        {{item.name}}
      </router-link>
    </div>
    <div class="contentbox expgold my-dis">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
  let menuList=[
    {name:"体验金",to:"/user/discount/experience"},
    {name:"存送优惠",to:"/user/discount/savesend"},
    {name:"洗码",to:"/user/discount/washcode"},
    {name:"优惠券",to:"/user/discount/coupon" },
    {name:"救援金",to:"/user/discount/help"},
    {name:"VIP礼金",to:"/user/discount/vip"},
    {name:"生日礼金",to:"/user/discount/birthday"},
    {name:"推荐好友",to:"/user/discount/recommend"}
  ]
  export default {
    data() {
      return {
        menuList
      };
    }
  };

</script>
<style>
</style>
