<template>
  <div class="orangebox">
    <div class="txtct">救援金有效时间为30天 (从派发当天开始计算)<br/>规定时间内未领取将自动取消，10倍流水。</div>
    <br/>
    <div class="moneywrap" v-show="!submitData.pno" >
      <a v-for="item in listData" href="javascript:;" @click="submitData.pno=item.pno" class="moneybox">
        <h2>{{item.promo}}  元</h2>
        <span class="date">截止 {{getUom(item)}} </span>
      </a>
    </div>
    <div class="v-align" v-show="!!submitData.pno">
      <div class="form">
        <div class="ipubox">
          <label class="label">选择游戏平台：</label>
          <select v-model="submitData.platform">
            <option value="">选择游戏平台</option>
            <option value="PT">PT</option>
            <option value="QT">QT</option>
            <option value="DT">DT</option>
            <option value="TTG">TTG</option>
            <option value="NT">NT</option>
            <option value="MG">MG</option>
          </select>
        </div>
        <div>
          <a href="javascript:;" class="btn-submit  " @click="submit">确认转入</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import  {queryPTLosePromo,claimLosePromo} from "api/preferential-terms";
  import  {platformData} from "@/assets/data"
  export default {
    data() {
      return {
        platformData,
        listData:[],
        searchLogData:{
          pageIndex:1,
          total:0,
          size:100
        },
        submitData:{
          pno:"",
          platform:"",
          flag:2
        }
      };
    },
    methods:{
      getUom(item){
        var d1=new Date(item.tempCreateTime);
        var uom = new Date(d1-0+30*86400000);
        uom = uom.getFullYear() + "-" + (uom.getMonth()+1) + "-" + uom.getDate();
        return uom;
      },
      submit(){
        if(this.submitData.pno=="")return toast("请选择救援金");
        if(this.submitData.platform=="")return toast("选择游戏平台");
        claimLosePromo(this.submitData).then(res=>{
          toast(res.message);
          if(res.success)this.submitData.pno="";
        }).catch(err=>{
          toast("处理失败...")
        })
      }
    },
    activated(){
      queryPTLosePromo(this.searchLogData).then(data=>{
        if(data.success){
          this.listData=data.data.records.filter(function(item,i){
            return item.status==0
          });
        }else{
          toast(data.message);
        }
      })
    },
    components:{}
  };
</script>
