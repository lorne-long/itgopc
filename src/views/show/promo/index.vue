<template>
  <div class="information promo">
    <div class="container">
      <div class="tab-menu">
        <a data-type="" class="active flash" href="javascript:void(0);">全部优惠</a>
        <a data-type="MON" class="flash" href="javascript:void(0);">当月优惠</a>
        <a data-type="LIM" class="flash" href="javascript:void(0);">限时优惠</a>
        <a data-type="VIP" class="flash" href="javascript:void(0);">VIP优惠</a>
        <a data-type="LON" class="flash" href="javascript:void(0);">长期优惠</a>
      </div>
      <router-view></router-view>
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
        activated() {},
        components: {}
    }
</script>
<style spcoed>
</style>
