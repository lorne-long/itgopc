<template>
  <div class="content-main" id="agent">
    <div class="mem_cont deposit ">
      <h3>额度记录</h3>
      <div class="log-search" style="padding-bottom: 1em;">
        <div class="log-form">
          <div>
           开始时间
            <datepicker class="input" v-model="searchData.starttime" ><i class="icons"></i></datepicker>
          </div>
          <div>
            结束时间
            <datepicker class="input" v-model="searchData.endtime"><i class="icons"></i></datepicker>
          </div>
          <button href="javascript:;" class="redbtn" @click="search"><i class="icons icons-search"></i>查询</button>
        </div>
        <div class="data_info">
          <table-data @seach="search" :thead="thead" :data="data">
            <tr v-for="(item,i) in data.pageContents||[]">
              <td>{{(data.pageNumber-1)*data.size+i+1}}</td>
              <td>{{item.type}}</td>
              <td>{{item.remit}}</td>
              <td>{{item.credit}}</td>
              <td>{{item.newCredit}}</td>
              <td>{{item.tempCreateTime|Date}}</td>
            </tr>
          </table-data>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {queryCreditlogs}  from "api/user"
  import tableData from "components/table-data"
  import datepicker from "base/datepicker";
  export default {
    name:'hello',
    data () {
      return {
        thead:["序",'操作类型','额度变量','改变前额度','改变后额度','加入时间'],
        data:{pageContents:[]},
        searchData:{
          starttime:"", //true string
          endtime:"",// true string
          size:10, //true string
          pageIndex:1//true string
        }
      }
    },
    methods:{
      search(index){
        if(!isNaN(index)){
          if(index==this.searchData.pageIndex)return
          this.searchData.pageIndex=index
        }
        this.data.pageContents=[]
        queryCreditlogs(this.searchData).then(res =>{
          if(res.success){
            this.data=res.data
          }else{
            toast(res.message)
          }
        })
      }
    },
    created(){
      this.searchData.starttime=new Date().addDay(-30).format();
      this.searchData.endtime=new Date().format();
    },
    components:{
      tableData,datepicker
    }
  }
</script>
<style>
</style>
