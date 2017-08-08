<template>
  <div class="loading-warp">
    <img width="24" height="24" src="./loading.gif">
    <p class="desc"><slot>正在加载...</slot></p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
  }
</script>
<style scoped lang="scss"  spcoed>
  .loading-warp{
    width: 100%;
    text-align: center;
    .desc{
      line-height: 20px;
      font-size: 12px;
      color:#000;
    }
  }
</style>
































