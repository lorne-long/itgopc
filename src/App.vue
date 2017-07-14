<template>
  <div id="app">
    <v-header></v-header>
    <transition :name="transitionName">
        <router-view v-if="!$route.meta.noCache"></router-view>

    </transition>
    <transition :name="transitionName">
      <router-view v-if="$route.meta.noCache"></router-view>
    </transition>
    <nav-menu ></nav-menu>
    <v-footer ></v-footer>
    <v-auth v-model="showLogin"></v-auth>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'

  import navMenu from 'components/nav-menu'
  import vFooter from 'components/footer'
  import vHeader from 'components/header'
  import vAuth from 'components/auth'
  export default {
    data(){
      return {
        transitionName:"slide",
      }
    },
    computed:{
      ...mapGetters(["showLogin"]),
      isExclude(){
        return this.$route.meta.cache ? "" : this.$route.name;
      }
    },
    watch:{
      "$route"(to,from){
        document.title=to.meta.title||to.meta.headName||"itgo";
      }
    },
    components:{
      navMenu,vFooter,vHeader,vAuth
    }
  }
</script>
