<template>
  <div class="content-main" id="agent">
    <div class="mem_cont deposit">
      <h3>会员列表</h3>
      <div class="log-search" style="padding-bottom:2em;">
        <div class="deposit_wrap log-form">
          <div class="d_range">
            <input v-model="searchData.starttime" type="date" class="inpt " id="offlineUserStarttime" placeholder="开始时间">
            <i class="icons"></i>
          </div>
          <div>
            <input  v-model="searchData.starttime" type="date" class="inpt " id="offlineUserEndtime"  placeholder="结束时间">
            <i class="icons"></i>
          </div>
          <button href="javascript:;" @click="search" class="redbtn" >
            <i class="icons icons-search"></i>查询
          </button>
        </div>
        <div class="data_info">
            <table-data :thead="thead" :data="data">
              <tr v-for="(item,i) in data.pageContents||[]">
                <td>{{(data.pageNumber-1)*data.size+i+1}}</td>
                <td>{{item.loginname}}</td>
                <td>{{item.flag}}</td>
                <td>{{item.credit}}</td>
                <td>{{item.tempCreateTime|Date}}</td>
                <td>{{item.howToKnow}}</td>
              </tr>
            </table-data>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {queryAgentSubUserInfoData} from "api/agent"
  import tableData from "components/table-data"
  export default {
    data () {
      return {
        thead:['序','会员帐号','状态','账户额度','	开户日期','来源网址'],
        data:{pageContents:[]},
        searchData:{
          starttime:"",
          endtime:"",
          size:10,
          pageIndex:1,
        }
      }
    },
    methods:{
      search(index) {
        if(!isNaN(index)){
          if(index==this.searchData.pageIndex)return
          this.searchData.pageIndex=index
        }
        this.searchData.starttime+=" 00:00:00"
        this.searchData.endtime+=" 00:00:00"
        this.data.pageContents=[];
        queryAgentSubUserInfoData(this.searchData).then(res=>{
          if(res.success){
            this.data=res.data.page;
          }else{
            toast(res.message)
          }
        }).catch(err =>{
          toast(err);
        });
      },
    },
    created(){
      this.searchData.starttime=new Date().addDay(-90).format("yyyy-MM-dd");
      this.searchData.endtime=new Date().format("yyyy-MM-dd");
    },
    components:{
      tableData
    }
  }
</script>
