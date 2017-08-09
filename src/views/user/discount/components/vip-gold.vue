<template>
  <div class="orangebox step1">
    <h3 class="bold">会员每个月只享有一次晋级的机会</h3>
    <br/>
    <vipStep></vipStep>
    <p class="txtct">
      <a href="javascript:void(0);"
         :class='["formbtn",{"disablebtn":lineNum<1&&!(lineNum==1&&userData.levelNumber==0)}]'>检测升级</a>
      <br/>
      <a class="cl-dd" href="javascript:void(0);">每月仅可自助申请一次哟</a>
    </p>
  </div>

</template>
<script>

  import {checkUpgrade} from "api/preferential-terms"
  import  vipStep from "components/vip-step"

  export default {
    data() {
      return {
        data: {
          upgradeThresholdList: [],
          betList: [{bet: 0}]
        },
        levelCount: 0, //所有的等级数量
        thisMonthMoney: 0//本月投注额
      };
    },
    methods: {
      submit() {
        checkUpgrade().then(data => {
          toast(data.message)
        })
      }
    },
    components: {
      vipStep
    }
  };
</script>
<style lang="scss">
</style>
