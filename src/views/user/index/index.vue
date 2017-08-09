<template>
  <div class="content-main">
    <h3 class="fl top-one">我的账户</h3>
    <div class="u-money-info">
      <div class="u-money-total">
        主账户余额：<span class="cl-yl">{{userData.accountMoney}}</span>元
        <div class="bm-border"></div>
      </div>
      <div>
        <ul class="clearfix u-slot-mn">
          <!--<li><strong>主账户余额：<span class="cl-yl">0.00</span>元</strong></li>-->
        </ul>
        <ul class="clearfix u-pw-list bdtopnone">
          <!--<li v-for="(item,val) in myData">{{val}}电游：<span class="cl-dd" @click="getGameMoney('PT')">-->
            <!--{{item}}-->
          <!--</span>-->
          <!--</li>-->
          <li>QT电游：<span class="cl-dd" @click="getGameMoney('PT')">{{myData.PT}}</span></li>
          <li>QT电游：<span class="cl-dd" @click="getGameMoney('QT')">{{myData.QT}}</span></li>
          <li>DT电游：<span class="cl-dd" @click="getGameMoney('DT')">{{myData.DT}}</span></li>
        </ul>
        <ul class="clearfix u-pw-list">
          <li>NT电游：<span class="cl-dd" @click="getGameMoney('NT')">{{myData.NT}}</span></li>
          <li>MG电游：<span class="cl-dd" @click="getGameMoney('MG')" >{{myData.MG}}</span></li>
          <li>TTG电游：<span class=" cl-dd" @click="getGameMoney('TTG')" >{{myData.TTG}}</span></li>
        </ul>
      </div>
    </div>
    <ul class="pay-type">
      <li><a href="javascript:void(0);"><img src="static/images/icon/wechat.jpg"></a></li>
      <li><a href="javascript:void(0);"><img src="static/images/icon/zbf.jpg"></a></li>
      <li><a href="javascript:void(0);"><img src="static/images/icon/inline.jpg"></a></li>
    </ul>
    <h3 class="other">用户等级</h3>
    <div class="u-step-por">
      <vipStep></vipStep>
    </div>
    <h3 class="other">常用功能</h3>
    <ul class="u-often-fun clearfix">
      <li>
        <a href="/t4/user/discount.jsp#0">
          <img src="static/images/icon/oftenfun1.png" />
          <strong>转账</strong>
        </a>
      </li>
      <li><a href="/t4/user/discount.jsp#1"><img src="static/images/icon/oftenfun2.png" /><strong>洗码</strong> </a></li>
      <li><a href="/t4/user/discount.jsp#1"><img src="static/images/icon/oftenfun3.png" /><strong>存送优惠</strong></a> </li>
      <li><a href="/t4/user/discount.jsp#2"><img src="static/images/icon/oftenfun4.png" /><strong>推荐好友</strong></a> </li>
      <li><a href="/t4/user/discount.jsp#3"><img src="static/images/icon/oftenfun5.png" /><strong>救援金</strong> </a></li>
      <li><a href="/t4/user/discount.jsp#4"><img src="static/images/icon/oftenfun6.png" /><strong>礼金</strong> </a></li>
    </ul>
  </div>

</template>
<script>
  import {getGameMoney,getMoneyAll} from 'api/user'
  import  vipStep from "components/vip-step"

  import {mapGetters,mapActions} from 'vuex'
    export default {
        data() {
            return {
              myData:{
                PT:"0.00",
                QT:"0.00",
                DT:"0.00",
                NT:"0.00",
                MG:"0.00",
                TTG:"0.00",
              }
            };
        },
        methods:{
          getGameMoney(val){
            this.myData[val]="正在查询.."
            getGameMoney({gameCode:val}).then(res=>{
               this.myData[val]=res.success?res.data:res.message;
            })
          },
          getMoneyAll(){
            for(let item in this.myData){
              this.getGameMoney(item)
            }
          }
        },
        computed:{
          ...mapGetters(["userData"])
        },
        created(){
          this.getMoneyAll()
        },
        components:{vipStep}
    };
</script>
<style>
  .u-step-por{ padding-top: 50px!important;}
</style>
