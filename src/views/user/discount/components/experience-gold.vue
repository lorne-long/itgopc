<template>
  <div>
    <div class="orangebox txtct" v-show="step==1">
      <h3 class=""><span class="j-tyj">{{money}}</span>元体验金，无投注额要求，满100元即可提款！</h3>
      <router-link v-if="userData.accountName==''" class="gotolink"  to="/user/datum">立即完善个人资料</router-link>
      <br/>
      <span class="formbtn"  @click="step=2">{{msg}}</span>
    </div>
    <div class="orangebox txtct form" v-show="step==2">
      <h3 class="bold">恭喜您获得<span>{{money}}</span>元体验金</h3>
      <p>部分厅TTG、NT需进入游戏激活，方可转入使用<br/>（点击游戏名称进入激活）</p>
      <br/>
      <div class="inputbox">
        <span class="label">选择游戏平台：</span>
        <select  v-model="platform"class=" custom-select">
          <option value="">请选择游戏平台</option>
          <option v-for="item in platformData" :value="item.value">
            {{item.name}}
          </option>
        </select>

      </div>
      <div class="clear"></div>
      <br/>
      <a href="javascript:;" class="formbtn cmargin " @click="submit">提交</a>
    </div>
  </div>
</template>
<script>
  import  {commitPT8Self,canGetPt8CouponCheck} from "api/preferential-terms"
  import  {platformData} from "@/assets/data"
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        msg:"领取体验金",
        money:"",
        step:1,
        platformData,
        platform:""
      };
    },
    methods:{
      submit(){
        if(this.platform=="")return toast("请选择转入平台")
        if(this.userData.accountName==""){
          $confirm("请先完善个人资料!","提示",{
            confirmText:"立刻完善"
          }).then(()=>{
            this.$router.push("/user/datum");
          })
          return
        }
        if(this.userData.phoneValidStatus=="0"){
          $confirm("请先验证注册手机号!","提示",{
            confirmText:"立刻验证"
          }).then(()=>{
            this.$router.push("/user/datum");
          })
          return
        }
        commitPT8Self({platform:this.platform}).then(res=>{
          if(res.success){
            $confirm("转入成功!","提示",{
              confirmText:"进入游戏"
            }).then(()=>{
              this.$router.push("/slotgame");
            })
            this.step=1;
          }
          else{
            toast(res.message);
          }
        }).catch(err=>{
          toast("领取体验金失败了");
        })
      }
    },
    computed:{
      ...mapGetters(["userData"])
    },
    created(){
      canGetPt8CouponCheck().then(res=>{
        if(res.success){
          this.money=res.data
        }else{
          this.msg=res.message
        }
      })
    },
    components:{}
  };
</script>
<style>
</style>
