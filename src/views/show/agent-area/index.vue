<template>
  <div class="information">
    <div class="container">
      <div class="left-menu">
        <router-link class="flash" :to="{path:'joinplan'}"><i class="icons icon-join"></i>加盟计划</router-link>
        <router-link class="flash" :to="{path:'brandadvantage'}"><i class="icons icon-brand"></i>品牌优势</router-link>
        <router-link class="flash" :to="{path:'commonproblems'}"><i class="icons icon-question"></i>常见问题</router-link>
        <router-link class="flash" :to="{path:'applicationprocess'}"><i class="icons icon-sm"></i>申请流程</router-link>
        <a class="flash"  href="javascript:void(0)"><i class="icons icon-agent"></i>代理注册</a>
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
