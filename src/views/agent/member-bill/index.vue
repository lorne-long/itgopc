<template>
  <div class="content-main">
    <div class="mem_cont deposit" id="finance">
      <h3 class="fl top-left">我的账户</h3>
      <div class="tab-menu u-tab-menu u-tab-bd ">
        <router-link v-for="item in type " to="" :key="item.value">
          会员{{item.name}}
        </router-link>
      </div>
      <div class="deposit_wrap js-subContent">
        <!-- 会员输赢 -->
        <div class="log-search">
          <div class="log-form">
            <div>
             开始时间: <datepicker class="input" v-model="searchData.startDate" style="display: inline-block; vertical-align: top;"><i class="icons"></i></datepicker>
            </div>
            <div>
              结束时间：
              <datepicker class="input" v-model="searchData.endDate" style="display: inline-block; vertical-align: top;"><i class="icons"></i></datepicker>
            </div>
            <button type="button" @click.prevent="search"><i class="icons icons-search"></i>查询
            </button>
          </div>
          <div class="data_info">
            <table-data :thead="thead" :data="data">
              <tr v-if="show" v-for="(item,i) in data.pageContents||[]">
                <td>{{data.pageIndex + i + 1}}</td>
                <td>{{item.loginname}}</td>
                <td>{{item.platform}}</td>
                <td>{{item.bettotal}}</td>
                <td>{{item.amount}}</td>
                <td>{{item.tempCreateTime | Date}}</td>
              </tr>
              <tr v-if="!show" v-for="(item,i) in data.pageContents||[]">
                <td>{{data.pageIndex + i + 1}}</td>
                <td>{{item.loginname}}</td>
                <td>{{item.tempCreateTime | Date}}</td>
                <td>{{item.money}}</td>
                <td>{{item.gifTamount}}</td>
                <td>{{item.type}}</td>
              </tr>
            </table-data>
          </div>
          <!-- <div class="data_info log-list" id="platformRecordDiv"></div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {getAgentQueryType,queryPlatformDetails,querySubProposal} from "api/agent";
  import tableData from "components/table-data"
  import datepicker from "base/datepicker";

  const thead1=['序','会员帐号','平台','投注总额','输赢值','创建时间']
  const thead2=['序','会员帐号','创建时间','额度','红利','提案类型']
  export default {
    data () {
      return {
        type:[{name:"输赢",value:"-1"}],
        thead:thead1,
        show:true,
        data:{},
        searchData:{
          total:0, //true string
          startDate:"", //true string
          endDate:"",// true string
          size:10, //true string
          pageIndex:0, //true string
          code:'-1'
        }
      }
    },
    methods:{
      search(index){
        if(!isNaN(index)){
          if(index==this.searchData.pageIndex)return
          this.searchData.pageIndex=index
        }
        if(this.searchData.code=="-1"){
          this.win();
        }else{
          this.querySubProposal();
        }
      },
      win(){
        queryPlatformDetails(this.searchData).then(res =>{
          if(res.success){
            this.show= !this.show
            this.thead=thead1;
            this.data=res.data
          }
          else{
            toast(res.message)
          }
        }).catch(err =>{
          toast("查询失败")
        })
      },
      querySubProposal(){
        querySubProposal(this.searchData).then(res=>{
          if(res.success){
            this.data=res.data
            this.thead=thead2;
          }else{
            toast(res.message)
          }
        }).catch(err =>{
          toast("查询失败")
        })
      }
    },
    created(){
      getAgentQueryType().then(res =>{
        if(res.success){
          this.type.push(...res.data);
        }else{
          toast(res.message)
        }
      }).catch(err =>{
        toast("类型加载失败")
      })
    },
    components:{
      tableData,datepicker
    }
  }
</script>
