<template>
  <!--<div class="warp-public vip-gold">-->
  <!--<form-tip>-->
  <!--每月5日系统自动审核升降级，达到晋级条件<br>-->
  <!--即可直接申请。真情回报，无投注额要求-->
  <!--<router-link to="/preferential" class="text_red"  slot="link">详情</router-link>-->
  <!--</form-tip>-->
  <!--<div class="ul_auto_wrap">-->
  <!--<div class="user_vip_progress_info" :style="{width:widthAll}" >-->
  <!--<div class="present_box " :style="{'margin-left':100/num*lineNum+'%'}">-->
  <!--<div class="present_box_content">-->
  <!--本月投注额<br>-->
  <!--<span class="money_text text_red ">-->
  <!--{{thisMonthMoney}}-->
  <!--</span>-->
  <!--</div>-->
  <!--<div class="present_box_arrow"></div>-->
  <!--</div>-->
  <!--<div class="progress_info">-->
  <!--<div class="progress_info_val" :style="{width:lineWidth}"></div>-->
  <!--</div>-->
  <!--<div class="user_vip_level_info" >-->
  <!--<div v-for="(item,i) in data.upgradeThresholdList" class="fl" :style="{width:100/num+'%'}">-->
  <!--<div class="level_info_label text_red">{{item.levelName}}</div>-->
  <!--<div class="level_info_text">{{-->
  <!--item.money|stringSplit-->
  <!--}}</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--<a href="javascript:void(0);" @click="submit" :class='["btn","btn01",{"btn_disable02":lineNum<1&&!(lineNum==1&&userData.levelNumber==0)}]'>申请礼金</a>-->
  <!--<div class="bottom_info_text">每月仅可自助申请一次哟</div>-->
  <!--</div>-->

  <div class="orangebox step1">
    <h3 class="bold">会员每个月只享有一次晋级的机会</h3>
    <br/>
    <div class="meter" style="overflow: hidden;">
      <div class="ul_auto_wrap mb10" :style="{width:widthAll}">
        <div class="meter2">
          <div class="ul_auto_wrap mb10">
            <div class="user_vip_progress_info">
              <div class="present_box" :style="{'margin-left':'-46px','left':lineWidth}">
                <div class="present_box_content">
                  本月投注额<br>
                  <span class="money_text text_red ">{{thisMonthMoney}}</span>
                </div>
                <div class="present_box_arrow"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="user_vip_progress_info ">
          <div class="progress_info" >
            <div class="progress_info_val" :style="{width:lineWidth,'background-color':'#ff614b' }"></div>
          </div>
          <div class="user_vip_level_info" >
            <div class="level_info_gap"  v-for="(item,i) in data.upgradeThresholdList" :style="{width:100/num+'%'}">
              <div class="level_info_label text_red">{{item.levelName}}</div>
              <div class="level_info_text">{{item.money|stringSplit}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="txtct">
      <a href="javascript:void(0);"
         :class='["formbtn",{"disablebtn":lineNum<1&&!(lineNum==1&&userData.levelNumber==0)}]'>检测升级</a>
      <br/>
      <a class="cl-dd" href="javascript:void(0);">每月仅可自助申请一次哟</a>
    </p>
  </div>

</template>
<script>

  import {checkUpgrade, getBetUpgrateVO} from "api/preferential-terms"
  import {mapGetters} from 'vuex'

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
    props: {},
    methods: {
      submit() {
        checkUpgrade().then(data => {
          toast(data.message)
        })
      }
    },
    computed: {
      ...mapGetters(["userData"]),
      num() {
        let num = this.levelCount;
        num = num - this.userData.levelNumber + 1;
        num -= (!this.userData.levelNumber ? 1 : 0);
        return num;
      },
      widthAll() { //总长
        return this.num * 33 + 1 + "%"
      },
      lineNum(){
        return this.data.upgradeThresholdList.filter(item => {
          return item.money && this.thisMonthMoney >= item.money;
        }).length;
      },
      lineWidth() { //红色线条长度
        let list=this.data.upgradeThresholdList;
        if(list.length==0)return 0
        let index=list.findIndex(item => { //找到第一个大于本月金额的等级
            return item.money && item.money>this.thisMonthMoney;
        });
        if(index==0){
          return   (this.thisMonthMoney/list[0].money)/this.lineNum*100+"%"
        }else{
          let  next=list[index],
            def=100/this.num, //每个等级的长
            cur=list[index-1],
            more= this.thisMonthMoney-cur.money,//保级 多出来的钱
            rotes=more/(next.money-cur.money)/def;//多出来的钱 占剩余钱的 比例

           return rotes+def*this.lineNum+'%'
        }
//        let nextMoney=index==-1? this.thisMonthMoney:list[index].money; //0不能当除数   下面要被除  所以等于除数本身就好了 也就是this.thisMonthMoney
//        return (100 / this.num * this.lineNum) + (this.thisMonthMoney / nextMoney * (100 / this.num)) + "%"
      }
    },
    created() {
      getBetUpgrateVO({username: this.userData.loginname}).then(res => {
        if (res.success) {
          this.data = res.data;
          this.levelCount = res.data.upgradeThresholdList.length;  //所有等级的数量
          this.thisMonthMoney = this.data.betList[this.data.betList.length - 1].bet; //本月投注额
          this.data.upgradeThresholdList = this.data.upgradeThresholdList.filter((item) => {   //数据处理
            if (item.level == this.userData.levelNumber) {
              item.levelName = "保级";
              item.money = item.retainthreshold; }
            else if (item.level > this.userData.levelNumber) {
              item.levelName = "VIP " + (item.level + 1);
              item.money = item.upgradethreshold;
            }
            return item.level >= this.userData.levelNumber;
          })
          ;
        }
        else {
          toast(res.message)
        }
      }).catch(err => {
        console.log(err)
        toast("晋级查询失败");
      })
    },
    components: {}
  };
</script>
<style lang="scss">
</style>
