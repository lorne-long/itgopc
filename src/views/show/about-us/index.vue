<template>
  <div class="information">
    <div class="container">

      <div class="left-menu">
        <router-link class="flash" :to="{path:'aboutus'}"><i class="icons icon-about"></i>关于我们</router-link>
        <router-link class="flash" :to="{path:'question'}" ><i class="icons icon-question"></i>常见问题</router-link>
        <router-link class="flash" :to="{path:'contactus'}"><i class="icons icon-contact"></i>联系我们</router-link>
        <router-link class="flash" :to="{path:'agreement'}"><i class="icons icon-agreement"></i>协议条款</router-link>
        <router-link class="flash" :to="{path:'duty'}"><i class="icons icon-sm"></i>免责声明</router-link>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
    export default {
        name: "",
        data() {
            return {}
        },
        props: {},
        computed: {},
        watch: {},
        methods: {},
        created() {
        },
        activated() {
        },
        components: {}
    }
</script>
<style spcoed>
</style>
