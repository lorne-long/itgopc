<template>
  <div>
    <div class="banner" style="height: 400px;">
      <div class="banner-wrapper">
        <a class="opacity-item active" href="javascript:void(0);"><img src="static/images/banner/banner.jpg" /></a>
        <a class="opacity-item" href="javascript:void(0);"><img src="static/images/banner/im1.jpg" /></a>
        <a class="opacity-item" href="javascript:void(0);"><img src="static/images/banner/banner.jpg" /></a>
      </div>
      <div class="banner-page">
        <a class="active" href="javascript:void(0);"></a>
        <a href="javascript:void(0);"></a>
        <a href="javascript:void(0);"></a>
      </div>
    </div>
    <div class="user-pg">
      <div class="container">
        <v-menu></v-menu>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  import vMenu from "components/menu"
  export default {
    data() {
      return {};
    },
    props:{},
    methods:{},
    computed:{},
    created(){
    },
    components:{
      vMenu
    }
  };
</script>
<style>
</style>
