<template>
  <div class=" ">
    <p class="txtct">
      在生日当天，您可申请生日礼金，无投注额要求，<br /> 祝您生日快乐，财源广进！
    </p>
    <br/>
    <p class=" txtct hidden">
      距您的生日 <span class=""></span> 还有 <span class="j-howmanyDay"></span>&nbsp;天
    </p>
    <div class="tbrithday txtct">
      <span>当前系统日期是<span class="">{{today|Date("M月dd日")}}</span></span>
    </div>
    <p class="txtct">
      <a href="javascript:;" class="formbtn btn-reset" @click="submit" >{{message}}</a>
    </p>
  </div>
</template>

<script>
  import  {canClaimBirthdayCoupon,claimBirthdayCoupon} from "api/preferential-terms"
  export default {
    data() {
      return {
        message:"领取礼金",
        today:new Date(),
        isSubmit:false
      };
    },
    props:{},
    methods:{
      submit(){
        if(!this.isSubmit)return;
        claimBirthdayCoupon().then(data=>{
          toast(data.message)
        });
      }
    },
    computed:{},
    created(){
      canClaimBirthdayCoupon().then(data=>{
        this.isSubmit=data.success;
        if(!data.success){
          this.message=data.message;
        }
      })
    },
    components:{

    }
  };
</script>

<style>
</style>
