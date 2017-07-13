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
          <li>PT电游：<span class="cl-dd" @click="getGameMoney('PT')">{{myData.PT}}</span></li>
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
      <div class="accountlvl">
        <div class="acctmeter">
          <div class="meter meter2">
            <div class="ul_auto_wrap mb10">
              <div class="user_vip_progress_info j-allwidth">
                <div class="present_box j-bet" style="margin-left: -56px;">
                  <div class="present_box_content">
                    本月投注额<br>
                    <span class="money_text "></span>
                  </div>
                  <div class="present_box_arrow"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="meter">
            <div class="ul_auto_wrap mb10">
              <div class="user_vip_progress_info j-allwidth">
                <div class="progress_info"><div class="progress_info_val j-progress_info_val"
                                                style="width: 0%;"></div></div>
                <div class="user_vip_level_info j-levelList"></div>
              </div>
            </div>
          </div>
        </div>
      </div><!-- accountlvl -->
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
  import {getGameMoney} from 'api/user'
  import {mapGetters,mapActions} from 'vuex'
    export default {
        data() {
            return {
              myData:{
                PT:"点击刷新",
                QT:"点击刷新",
                DT:"点击刷新",
                NT:"点击刷新",
                MG:"点击刷新",
                TTG:"点击刷新",
              }
            };
        },
        props:{},
        methods:{
          getGameMoney(val){
            this.myData[val]="正在刷新.."
            getGameMoney({gameCode:val}).then(res=>{
               this.myData[val]=res.success?res.data:res.message;
            })
          }
        },
        computed:{
          ...mapGetters(["userData"])
        },
        created(){
        },
        components:{}
    };
</script>
<style>
</style>
