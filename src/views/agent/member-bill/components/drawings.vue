<template>
  <div class="log-search">
    <div class="log-form">
      <p>
        会员帐号：
        <input type="text" v-model="searchData.loginname" class="inpt"  maxlength="15"/>
      </p>
      <div>
        开始时间
        <datepicker class="input" v-model="searchData.starttime"><i class="icons"></i></datepicker>
      </div>
      <div>
        结束时间
        <datepicker class="input" v-model="searchData.endtime"><i class="icons"></i></datepicker>
      </div>
      <button type="button" @click.prevent="search"><i class="icons icons-search"></i>查询</button>
    </div>
    <div class="data_info">
      <table-data :thead="thead" :data="data" @search="search">
        <tr v-for="(item,i) in data.pageContents||[]">
          <td>{{(data.pageNumber - 1) * data.size + i + 1}}</td>
          <td>{{item.loginname}}</td>
          <td>{{item.tempCreateTime }}</td>
          <td>{{item.amount}}</td>
          <td>{{item.type}}</td>
        </tr>
      </table-data>
    </div>
  </div>
</template>
<script>
  import {searchsubuserProposalData} from "api/agent";
  import datepicker from "base/datepicker";
  import tableData from "components/table-data"

  export default {
    name: "",
    data() {
      return {
        thead:["序号", "会员账户", "申请时间", "额度", "申请类型"],
        data: {pageContents:[]},
        searchData: {
          loginname:"",
          tail:"",
          total: 0,
          starttime: "",
          endtime: "",
          proposalType: "-1",
          size: 10,
          pageIndex: 1
        }
      }
    },
    props: ["type"],
    methods: {
      search(index) {
        if (!isNaN(index)) {
          if (index == this.searchData.pageIndex) return
          this.searchData.pageIndex = index
        }
        this.data.pageContents=[];
        this.searchData.proposalType = this.type
        searchsubuserProposalData(this.searchData).then(res => {
          if (res.success) {
            this.data = res.data
          } else {
            toast(res.message)
          }
        }).catch(err => {
          this.data.pageContents=[];
          toast("查询失败")
        })
      }
    },
    created() {
      this.searchData.starttime = new Date().addDay(-30).format("yyyy-MM-dd 00:00:00");
      this.searchData.endtime = new Date().format("yyyy-MM-dd 00:00:00");
    },
    activated() {
    },
    components: {
      tableData, datepicker
    }
  }
</script>
<style spcoed>
</style>
