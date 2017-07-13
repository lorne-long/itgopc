<template>
  <div class=" v-align">
    <div class="txtct">好友成功领取体验金，您即获得推荐奖金，<br/>其当日30%的负盈利彩金也会在次日派发给您！</div>

    <div class="orangebox form">
      <div>
        <button class=" btn-reset btn-view-money">
          <span>{{money}}</span>元
          <br>
          <span class="date">推荐礼金</span>
        </button>
      </div>
      <div class="ipubox">
        <label>选择游戏平台：</label>
        <select v-model="myData.platform">
          <option value="">选择游戏平台</option>
          <option v-for="item in platformData" :value="item.value">
            {{item.name}}
          </option>
        </select>
      </div>
      <div class="ipubox">
        <label class="label">填写转入金额：</label>
        <input type="text" placeholder="转入金额最低2元"  v-model.number="myData.money" />
      </div>
      <div>
        <!--disablebtn-->
        <a href="javascript:;" id="friend-submit" @click="submit"  class="btn-submit formbtn ">确定转入</a>
      </div>
      <div class="cl-yl">提示：平台金额必须小于2.0元，才能转入</div>
      <br/>
      <div class="my-link-copy" @click="friendLink.$copy()">
        您的专属推荐链接 (
        <button class="cl-dd">点击可复制</button>
        ) <br/>
        <span  class="link_ref">{{friendLink}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  import  {queryFriendBonue,transferInforFriend} from "api/preferential-terms";
  import  {platformData} from "@/util/data"
  export default {
    data() {
      return {
        platformData,
        step:1,
        money:0,
        url:"",
        myData:{
          platform:"", //true string
          money:""
        }
      };
    },
    computed:{
      friendLink(){
        return window.location.origin+"?friendcode="+this.url;
      }
    },
    methods:{
      submit(){

        if(this.myData.platform=="")return toast("请选择转入平台")
        if(this.myData.money=="")return toast("请输入金额")
        if(this.myData.money>this.money)return toast("推荐奖励金额不足")
        transferInforFriend(this.myData).then(res=>{
          toast(res.message)
        }).catch(err=>{
          toast("领取失败")
        })
      }
    },
    created(){
      queryFriendBonue().then(data=>{
        this.money=data.data.money;
        this.url=data.data.url;
      })
    },
    components:{}
  };
</script>

<style lang="scss">

</style>
