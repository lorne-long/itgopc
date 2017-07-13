<template>
  <div class=" pd26 v-align">
    <div class="form">
      <p class="">
        <label>选择游戏平台：</label>
        <select v-model="type">
          <option value="">选择游戏平台</option>
          <option v-for="(item,i) in platformData" :value="item.value">
            {{item.name}}</option>
        </select>
      </p>
      <div v-show="showLoad">
        <loadding>正在查询</loadding>
      </div>
      <p v-show="show">
        <label>总有效投注额：</label>
        <input readonly disabled type="text" :value="validAmount">
      </p>
      <p v-show="show">
        <label>洗码比率：</label>
        <input readonly disabled type="text" :value="rate">
      </p>
      <div v-show="show">
        <a href="javascript:void(0);" type="button" @click="doXima" class="btn-submit formbtn">确定洗码</a>
      </div>
    </div>
    <div class="orangebox step2">
      <p class="txtct">
        所有平台 (非旋转类) 可随时自助洗码。<br/> 若当日没有洗码，次日自动派发到主账户！
      </p>
      <p class="txtct">流水进度或有延迟，请耐心等待，平均更新时间为<span class="cl-dd">8分钟</span>，如有更多疑问请
        <a class="cl-yl" href="javascript:void(0);">联系客服</a>
      </p>
    </div>
  </div>
</template>

<script>
  import {getXimaData,doXima} from "api/preferential-terms"
  import loadding from "components/loadding"
  import  {platformData} from "@/util/data"
  export default {
    data() {
      return {
        type:"",
        platformData,
        validAmount:0,
        ximaAmount:0,
        rate:0,
        show:false,
        showLoad:false,
      };
    },
    watch:{
      type(val){
        val==''||this.search();
      }
    },
    methods:{
      search(){
        if(this.type=="") return toast("请选择洗码平台!");
        this.showLoad=true;
        getXimaData({gameId:this.type}).then(data=>{
          this.show=data.success;
          this.showLoad=false;
          if(data.success){
            this.validAmount=data.data.validAmount;
            this.ximaAmount=data.data.ximaAmount;
            this.rate=data.data.rate;
          }else{
            toast(data.message);
          }
        }).catch(()=>{
          this.show=this.showLoad=false
          toast("请求错误请稍后重新尝试...");
        })
      },
      doXima(){
        doXima({gameId:this.type}).then(res=>{
          toast(res.message);
          if(res.success){
            this.show=false;
            this.type="";
          }
        }).catch(()=>{
          toast("洗码失败请重新尝试...");
        })
      }
    },
    computed:{},
    created(){
    },
    components:{
      loadding
    }
  };
</script>
