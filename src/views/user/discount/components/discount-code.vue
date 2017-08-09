<template>
  <div class="v-align ">
    <div class="form">
      <div class="txtct">
        温馨提示：优惠券代码会以站内信形式发送给您，
        <br>请您注意查看站内信通知。
      </div>
      <div class="ipubox">
        <label class="label">选择游戏平台：</label>
        <select v-model="couponType">
          <option value="">---请选择平台---</option>
          <option v-for="item in platformData" :value="item.value">{{item.name}}</option>
        </select>
      </div>
      <div class="ipubox">
        <label class="label">填写转入金额：</label>
        <input type="text" v-model.number="couponRemit" maxlength="10">
      </div>
      <div class="ipubox">
        <label class="label">优惠代码：</label>
        <input type="text" v-model="couponCode" name="amount" id="couponCode" maxlength="20">
      </div>
      <div>
        <a href="javascript:void(0);" @click="submit" class="btn-submit j-submitCouponRemit">确定转入</a>
      </div>
    </div>
  </div>
</template>
<script>
  import  {transferInforCoupon} from "api/preferential-terms"
  import  {platformData} from "@/assets/data"
  export default {
    data() {
      return {
        platformData,
        couponType:"", // true string
        couponRemit:"", //true string
        couponCode:"",//true string
      };
    },
    props:{},
    computed:{},
    methods:{
      check(){
        if(this.couponType=='')toast('请选择游戏平台');
        else if(this.couponRemit=='')toast('请输入转入金额');
        else if(this.couponCode=='')toast('请输入优惠代码');
        else{
          return true;
        }
      },
      submit(){
        if(!this.check())return;
        transferInforCoupon(this.$data).then((data)=>{
          if(data.success){
            this.couponCode='';
          }
          toast(data.message);
        }).catch(()=>{
          toast('请重新尝试');
        })
      }
    },
    created(){
    },
    components:{}
  };
</script>

<style>
</style>
