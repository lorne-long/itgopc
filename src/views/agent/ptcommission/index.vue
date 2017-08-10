<template>
  <div class="content-main" id="agnet">
    <div class="mem_cont deposit js-tab-content" id="money">
      <h3>记录查询</h3>
      <div id="memberpage" class="log-search">
        <div class="log-form">
          <div>
            开始时间
            <datepicker class="input" v-model="searchData.starttime"
                        style="display: inline-block; vertical-align: top;"><i class="icons"></i></datepicker>
          </div>
          <div>
            结束时间
            <datepicker class="input" v-model="searchData.endtime" style="display: inline-block; vertical-align: top;">
              <i class="icons"></i></datepicker>
          </div>
          <button type="button" @click="search"><i class="icons icons-search"></i>查询
          </button>
          <!--<select v-model="searchData.endDate" id="friend-type" style="margin-left: 10px;" class="moz-select select">-->
          <!--<option value="0">推荐注册成功玩家</option>-->
          <!--<option value="1">推荐奖金收入</option>-->
          <!--<option value="2">推荐奖金支出</option>-->
          <!--</select>-->
          <!--<a href="/t3/agentmanage.jsp#tab-tk">-->
          <!--<button type="button">提款</button>-->
          <!--</a>-->
        </div>
        <div class="data_info">
          <div class="j-comTable">
            <table-data :thead="thead" :data="data" @search="search">
              <tr v-for="(item,i) in data.pageContents||[]">
                <td>{{(data.pageNumber - 1) * data.size + i + 1}}</td>
                <td>{{getPlatForm(item.id.platform)}}</td>
                <td>{{item.amount}}</td>
                <td>{{item.id.createdate | Date}}</td>
                <td>{{item.profitall}}</td>
                <td>{{item.couponfee}}</td>
                <td>{{item.ximafee}}</td>
                <td>{{item.platformfee}}</td>
                <td>{{item.betall}}</td>
                <td>{{item.tempExcuteTime | Date}}</td>
              </tr>
            </table-data>
          </div>
          <div class="j-page hidden pagination">
          </div>
        </div>
        <div class="tipstxt">
          <p>
            <span class="cl-dd"> 电子类：</span>（包含PT、DT、QT、MG、NT等老虎机平台）。
          </p>
          <p><span class="cl-dd">日结标准：</span>所有老虎机代理终身享受日结佣金，每个工作日18点结算。（周末顺延至周一结算）</p>
          <p>
            <span class="cl-dd">注：</span>享受日结的代理如果连续两个月没有新增一位活跃会员，将在第三个月的时候取消其日结模式，如果在第三个月有开发会员，在次月开启日结。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import datepicker from "base/datepicker";
  import tableData from "components/table-data"
  import {searchPtCommissionsData} from "api/agent"

  export default {
    data() {
      return {
        thead: ['序', '平台', '日佣金', '数据日期', '输赢额度', '优惠额度', '洗码额度', '平台费', '投注额', '执行时间'],
        data: {pageContents: []},
        searchData: {
          starttime: "",
          endtime: '',
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
        this.data.pageContents = []

        searchPtCommissionsData(this.searchData).then(res => {
          if (res.success) {
            this.data = res.data;
          } else {
            toast(res.message)
          }
        }).catch(err => {
          this.data = {};
          toast("查询错误");
        })
      },
      getPlatForm(val) {
        switch (val) {
          case "slotmachine":
            return "老虎机佣金"
          case "liveall":
            return "其他佣金"
          default :
            return val
        }
      }
    },
    created() {
      this.searchData.starttime = new Date().addDay(-60).format("yyyy-MM-dd");
      this.searchData.endtime = new Date().format("yyyy-MM-dd");
//      this.search()
    },
    components: {
      tableData, datepicker
    }
  }
</script>
