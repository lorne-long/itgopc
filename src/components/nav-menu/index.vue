<template>
  <div class="menu">
    <!--左侧菜单-->
    <a href="/t4/index.jsp"><img src="static/images/logo.png" alt="itgo"/></a>
    <ul class="menu-list">
      <router-link tag="li" class="flash" :to="{name:'index'}">
        <a class="flash" href="/t4/index.jsp"><i class="home"></i><strong>官网首页
          <small>HOME</small>
        </strong></a>
      </router-link>
      <router-link tag="li" class="flash" :to="{name:'slotgame'}">
        <a class="flash" href="/t4/games.jsp"><i class="slot"></i><strong>老虎机游戏
          <small>SLOT GAME</small>
        </strong></a>
      </router-link>
      <li class="flash">
        <a class="flash j-no" href="javascript:$alert('敬请期待');"><i class="live"></i><strong>真人视讯
          <small>LIVE</small>
        </strong></a>
      </li>
      <li class="flash">
        <a class="flash j-no" href="javascript:$alert('敬请期待');"><i class="fish"></i><strong>捕鱼游戏
          <small>FISHING</small>
        </strong></a>
      </li>
      <router-link tag="li" :to="{name:'promo'}" class="flash">
        <a class="flash" href="javascript:void(0);"><i class="prom"></i><strong>优惠活动
          <small>PROMOTIONS</small>
        </strong></a>
      </router-link>
      <li class="flash">
        <a class="flash j-no" href="javascript:$alert('敬请期待');"><i class="mobile"></i><strong>手机投注
          <small>MOBILE</small>
        </strong></a>
      </li>
      <router-link tag="li" :to='{path:"/aboutus"}' class="flash">
        <a class="flash" href="javascript:void(0);"><i class="about"></i><strong>关于我们
          <small>ABOUT US</small>
        </strong></a>
      </router-link>
      <router-link tag="li" class="flash" :to="{name:'agentarea'}">
        <a class="flash"  href="javascript:void(0);"> <i class="agent"></i><strong>代理专区
          <small>AGENT</small>
        </strong></a>
      </router-link>
      <li class="flash">
        <a class="flash j-no" href="javascript:$alert('敬请期待');" ><i class="forum"></i><strong>游戏论坛
          <small>FORUM</small>
        </strong></a>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    props:{},
    methods:{},
    computed:{},
    created(){
    },
    components:{}
  };
</script>
<style>
</style>
