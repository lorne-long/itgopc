<template>
  <div class=" v-align ">
    <div class="form">
      <div class="txtct">
        无限次领取，红利单日上限3888元！
        <br/>更有限时限量100%存送惊喜等你来抢！
      </div>
      <p>
        <label class="label">填写转入金额：</label>
        <input type="text" v-model.number="submitData.remit" name="amount"/>
      </p>
      <p>
        <label>选择游戏平台：</label>
        <select v-model="Type">
          <option value="">选择游戏平台</option>
          <option v-for="item in platformData" :value="item">
            {{item}}
          </option>
        </select>
      </p>
      <p class="">
        <label>选择优惠幅度：</label>
        <select v-model="submitData.youhuiConfigId">
          <option value="">选择优惠幅度</option>
          <option v-for="(item,i) in filterData" :value="item.id">
            {{item.name}}</option>
        </select>
      </p>
      <div class="mg-btm">
        <p>可获得红利（7天有效）:<span class="cl-yl">{{percentMoney|toFixed}} 元</span></p>
        <p>取款流水要求: <span class="cl-dd">{{limitMoney|toFixed}} 元</span></p>
        <p>投注限额: <span class="cl-dd"> {{touzhuLimit|toFixed }} 元</span></p>
      </div>


      <div>
        <a href="javascript:void(0);" type="button" @click="submit" class="btn-submit formbtn">确认转入</a>
      </div>

    </div>
  </div>

</template>
<script>
  import {youhui,getSelfYouHuiObject} from "api/preferential-terms"
  import {mapGetters} from "vuex"
  export default {
    data() {
      return {
        listData:[], //优惠数据

        percentMoney:0,  //可获得红利
        limitMoney:0, //取款流水要求
        touzhuLimit:0,//投注限额
        Type:'',//选择平台
        submitData:{  //数据提交
          youhuiConfigId:'', // true number
          youHuiType:"", //true string
          platform:"",// true string
          remit:''//true number
        }
      };
    },
    methods:{
      submit(){
        if(!this.check())return;
        getSelfYouHuiObject(this.submitData).then((data)=>{
            toast(data.message)
          }
        ).catch(()=>{
          toast("请求错误请稍后重新尝试...")
        })
      },
      check(){
        if(this.submitData.remit=='')toast("请输入转入金额");
        else if(this.Type=='')toast("请选择优惠平台");
        else if(this.submitData.youhuiConfigId=='')toast("请选择优惠幅度");
        else{
          return true
        }
      },
      computedMoney(){ //计算金额
        let _data=this.listData.filter(item=>item.id==this.submitData.youhuiConfigId);
        if(_data.length<=0||this.submitData.youhuiConfigId==''||this.submitData.remit=='')return;
        _data=_data[0];
        this.submitData.youHuiType=this.submitData.platform=_data.title;
        let _remit=Math.min(this.submitData.remit*_data.percent,_data.limitMoney);
        let _limitMoney=_data.betMultiples*(parseFloat(_remit)+parseFloat(this.submitData.remit));
        _remit=_remit<0 ? 0 : _remit;
        this.percentMoney=_remit;
        this.limitMoney=_limitMoney;
        this.touzhuLimit=(this.submitData.remit+_remit)*0.1
      },
      getYouHui(){
        youhui().then(data=>{
          if(data.success){
            this.listData=data.data
          }
        }).catch(()=>{
          toast("获取优惠信息失败...")
        });
      }
    },
    watch:{
      "submitData.youhuiConfigId"(val){
        val==""||this.computedMoney();
      },
      "submitData.remit"(val){
        val==""||this.computedMoney();
      }
    },
    computed:{
      filterData(){
        this.submitData.youhuiConfigId='';
        let filterList=this.listData.filter((item,i)=>{
          return item.platform==this.Type
        });
        if(filterList.length==1){
          this.submitData.youhuiConfigId=filterList[0].id;
        }
        return filterList;
      },
      platformData(){
        let pf=[]
        this.listData.forEach(item=>{
          if(!pf.includes(item.platform)){
            pf.push(item.platform)
          }
        });
        return pf;
      }
    },
    created(){
      this.getYouHui();
    }
  };
</script>
