<template>
  <div class="hearder">
    <div class="container">
      <div class="top">
        <ul class="fl">
          <li>
            <a href="/t4/agent/information.jsp">合作代理</a>
          </li>
          <li>
            <a href="/t4/information.jsp">牌照展示</a>
          </li>
          <li>
            <a href="javascript:void(0);" class="j-no">在线客服</a>
          </li>
          <li class="service">24小时客服热线：
            <a href="javascript:void(0);">400-xxxx-xxx</a>
          </li>
        </ul>
        <div class="user-info fr">
          <!--未登陸-->
          <a v-show="!islogin" class="btn-login none" @click="SHOW_LOGIN(true)" href="javascript:void(0);">用户登录</a>
          <a v-show="!islogin" class="btn-register none" @click="SHOW_LOGIN(true)" href="javascript:void(0);">立即开户</a>
          <!--未登陸-->
          <!--已登錄-->
          <div class="user-info-view" v-show="islogin">
            你好, <span class="">{{userData.loginname}}<i class="icon-step">V{{userData.levelNumber}}</i></span>
            <i class="icon-money"></i> 余额：
            <span>{{userData.accountMoney}}</span>元 &nbsp;
            <router-link class="user-conter" v-if="isUser" :to="{name:'user'}">用户中心</router-link>
            <router-link class="user-conter" v-else :to="{name:'agent'}">代理中心</router-link>
            <a class="btn-out" href="javascript:void(0);" @click="LOGIN_OUT">安全退出</a>
          </div>
          <!--已登錄-->
        </div>
      </div>
      <div class="tips">
        <div class="tips-title">最新公告：</div>
        <div class="tips-info">
          <marquee ref="marquee" direction="left" onmouseout="this.start();" onmouseover="this.stop();">
            <router-link v-for="item in data" :to="{name:'agent'}">
              {{item.title}}
              <span>[{{item.createtime}}]</span>
            </router-link>
           </marquee>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters,mapActions,mapMutations} from 'vuex'
  import {getNewAnnouncement} from "api/common"
  export default {
    data() {
      return {
        data:[]
      };
    },
    methods:{
      ...mapActions(["UPDATE_USERDATA","LOGIN_OUT"]),
      ...mapMutations(["SHOW_LOGIN"])
    },
    computed:{
      ...mapGetters(["userData","islogin","isAgent",'isUser','showLogin'])
    },
    created(){
      this.UPDATE_USERDATA();
      getNewAnnouncement().then(data => {
        this.data = data.data;
        this.$refs.marquee.start();
      })
    }
  };
</script>
<style>
</style>
