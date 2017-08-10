<template>
  <div class="deposit_wrap">
    <!-- 会员输赢 -->
    <div class="log-search">
      <div class="log-form">
        <p>
          会员帐号：
          <input type="text" v-model="searchData.loginname" class="inpt"  maxlength="15"/>
        </p>
        <p>
          平台类型：<select v-model="searchData.platform"  class="inpt">
            <option value="">全部</option>
            <option value="PT">PT</option>
            <option value="NT">NT</option>
            <option value="QT">QT</option>
            <option value="MG">MG</option>
            <option value="DT">DT</option>
          </select>
        </p>
        <div>
          开始时间:
          <datepicker class="input" v-model="searchData.starttime">
            <i class="icons"></i></datepicker>
        </div>
        <div>
          结束时间：<datepicker class="input" v-model="searchData.endtime"><i class="icons"></i></datepicker>
        </div>
        <button type="button" @click.prevent="search"><i class="icons icons-search"></i>查询</button>
      </div>
      <div class="data_info">
        <table-data :thead="thead" :data="data" @search="search">
          <tr v-if="show" v-for="(item,i) in data.pageContents||[]">
            <td>{{(data.pageNumber-1)*data.size+i+1}}</td>
            <td>{{item.loginname}}</td>
            <td>{{item.platform}}</td>
            <td>{{item.bettotal}}</td>
            <td>{{item.amount }}</td>
            <td>{{item.tempCreateTime| Date}}</td>
          </tr>
        </table-data>
      </div>
      <!-- <div class="data_info log-list" id="platformRecordDiv"></div> -->
    </div>
  </div>
</template>
<script>
  import {searchagprofitData} from "api/agent";
  import datepicker from "base/datepicker";
  import tableData from "components/table-data"
  export default {
    name: "",
    data() {
      return {
        thead: ['序', '会员帐号', '平台', '投注总额', '输赢值', '时间'],
        show: true,
        data: {pageContents:[]},
        searchData: {
          total: 0,
          loginname:"",
          platform:"",
          starttime: "",
          endtime: "",
          size: 10,
          pageIndex: 1
        }
      }
    },
    methods: {
      search(index) {
        if (!isNaN(index)) {
          if (index == this.searchData.pageIndex) return
          this.searchData.pageIndex = index
        }
        this.data.pageContents=[];
        searchagprofitData(this.searchData).then(res => {
          if (res.success) {
            this.show = !this.show
            this.data = res.data
          }
          else {
            this.data.pageContents=[];
            toast(res.message)
          }
        }).catch(err => {
          toast("查询失败")
        })
      }
    },
    created() {
      this.searchData.starttime=new Date().addDay(-30).format();
      this.searchData.endtime=new Date().format();
    },
    activated() {
    },
    components: {
      tableData,datepicker
    }
  }
</script>
<style spcoed>

</style>
