<template>
  <div class="content-main" id="agnet">
    <div class="mem_cont deposit js-tab-content" id="data">
      <h3 class="fl top-one">我的账户</h3>
      <div class="u-money-info">
        <div class="u-money-total">
          总佣金：<span class="cl-yl j-DEPUTY" id="main_money">{{slotAccount}}</span>元<div class="bm-border"></div>
        </div>
        <div>
          <ul class="clearfix u-slot-mn">
            <li><strong>本月总输赢：<span class="cl-yl" id="data-profitall">{{profitall}}</span>元</strong></li>
            <li><strong>本月总返水：<span class="cl-dd" id="data-ximafee">{{ximafee}}</span>元</strong></li>
            <li><strong>本月总优惠：<span class="cl-dd" id="data-couponfee">{{couponfee}}</span>元</strong></li>
          </ul>
          <ul class="clearfix u-slot-mn last-ul">
            <li>会员总人数：<span class="cl-dd" id="data-reg">{{reg}}</span>元</li>
            <li>本月总注册量：<span class="cl-dd" id="data-monthly">{{monthly_reg}}</span>元</li>
            <li>本月投注额：<span class="cl-dd" id="data-betall">{{betall}}</span>元</li>
          </ul>

        </div>
      </div>
      <ul class="pay-type">
        <li>
          <a href="javascript:void(0);"><img src="static/images/icon/wechat.jpg"></a>
        </li>
        <li>
          <a href="javascript:void(0);"><img src="static/images/icon/zbf.jpg"></a>
        </li>
        <li>
          <a href="javascript:void(0);"><img src="static/images/icon/inline.jpg"></a>
        </li>
      </ul>
      <h3 class="top10">温馨提示:</h3>
      <div class="tips pd10" style="">
        <p>
          当月汇总时间段是按照代理下线会员本月月初到月末，由于代理下线当日的数据需要第二天进行整理清算，每个月月初第一天数据汇总为上个月的，例如8月1号的数据汇总是7月1日00:00—7月31日23:59。
        </p>
        <p>每天下午日结佣金结束之后数据会更新。</p>
        <p>数据可能会出现延迟，如果出现误差，请联系市场专员，以正式后台为准。</p>
      </div>
    </div>
  </div>
</template>
<script>
  import {agentReport} from 'api/agent';
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
          slotAccount:0,//总佣金
          profitall:0,//本月总输赢
          ximafee:0,//本月总反水
          couponfee:0,//本月总优惠
          reg:0,//会员总人数
          monthly_reg:0,//本月注册量
          betall:0//本月投注额
      }
    },
    created(){
      agentReport().then((res)=> {
        if(res.success)Object.assign(this.$data,res.data);
      }).catch((err)=>{
        toast("流水查询失败");
      });
    },
    computed:{
      ...mapGetters(["userData"])
    },
    methods:{
    },
    components:{
    }
  }
</script>
<style>
</style>
