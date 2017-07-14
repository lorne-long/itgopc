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
              开始时间：<input v-model="searchData.startDate" type="date" placeholder="开始时间"><i class="icons"></i>
            </div>
            <div>
              结束时间：<input type="date"  v-model="searchData.endDate"  placeholder="结束时间"><i class="icons"></i>
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
        <!-- 会员存款 -->
        <!--<div class="hidden log-search">-->
          <!--<div class="log-form">-->
            <!--<p>-->
              <!--<b>会员帐号：</b>-->
              <!--<input type="text" class="inpt" id="offlineUsername" maxlength="15">-->
            <!--</p>-->
            <!--<p>-->
              <!--<b>存款类型：</b>-->
              <!--<select id="offlineProposalType" class="inpt">-->
                <!--<option value="1000">在线支付</option>-->
              <!--</select>-->
            <!--</p>-->
            <!--<div>-->
              <!--<input type="text" class="inpt" id="offlineStarttime" readonly=""-->
                     <!--onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" my97mark="false" placeholder="开始时间">-->
              <!--<i class="icons"></i>-->
            <!--</div>-->
            <!--<div>-->
              <!--<input type="text" class="inpt" id="offlineEndtime" readonly=""-->
                     <!--onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" my97mark="false" placeholder="结束时间">-->
              <!--<i class="icons"></i>-->
            <!--</div>-->

            <!--<button href="javascript:;" class="redbtn" onclick="agentOfflineRecordNew(this,'',1,10);"><i-->
              <!--class="icons icons-search"></i>查询-->
            <!--</button>-->
          <!--</div>-->
          <!--<div class="data_info">-->
            <!--<div class="j-comTable"></div>-->
            <!--<div class="j-page hidden pagination"></div>-->
          <!--</div>-->
          <!--&lt;!&ndash;                         <div class="data_info log-list">-->
                                      <!--<table>-->
                                          <!--<tr>-->
                                              <!--<th>序号</th>-->
                                              <!--<th>会员账号</th>-->
                                              <!--<th>申请时间</th>-->
                                              <!--<th>额度</th>-->
                                              <!--<th>申请类型</th>-->
                                          <!--</tr>-->
                                          <!--<tbody id="offlineRecordDiv">-->
                                          <!--</tbody>-->
                                      <!--</table>-->
                                  <!--</div> &ndash;&gt;-->
        <!--</div>-->
        <!--&lt;!&ndash; 会员提款 &ndash;&gt;-->
        <!--<div class="hidden log-search">-->
          <!--<div class="log-form">-->
            <!--<p>-->
              <!--<b>会员帐号：</b>-->
              <!--<input type="text" class="inpt" id="offlineUsernametk" maxlength="15">-->
              <!--<input type="hidden" id="offlineProposalTypetk" class="input" value="503">-->
            <!--</p>-->
            <!--<div>-->
              <!--<input type="text" class="inpt " id="offlineStarttimetk" readonly=""-->
                     <!--onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" my97mark="false" placeholder="开始时间">-->
              <!--<i class="icons"></i>-->
            <!--</div>-->
            <!--<div>-->
              <!--<input type="text" class="inpt" id="offlineEndtimetk" readonly=""-->
                     <!--onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" my97mark="false" placeholder="结束时间">-->
              <!--<i class="icons"></i>-->
            <!--</div>-->
            <!--<button href="javascript:;" class="redbtn" onclick="agentOfflineRecordNew(this,'tk',1,10);">-->
              <!--<i class="icons icons-search"></i>查询-->
            <!--</button>-->
          <!--</div>-->
          <!--<div class="data_info">-->
            <!--<div class="j-comTable"></div>-->
            <!--<div class="j-page hidden pagination"></div>-->
          <!--</div>-->
          <!--&lt;!&ndash;                         <div class="data_info log-list">-->
                                      <!--<table>-->
                                          <!--<tr>-->
                                              <!--<th>序号</th>-->
                                              <!--<th>会员账号</th>-->
                                              <!--<th>提款时间</th>-->
                                              <!--<th>提款额度</th>-->
                                              <!--<th>提款类型</th>-->
                                          <!--</tr>-->
                                          <!--<tbody id="offlineWithdrawRecordDiv">-->
                                          <!--</tbody>-->
                                      <!--</table>-->
                                  <!--</div> &ndash;&gt;-->
        <!--</div>-->
        <!--&lt;!&ndash; 会员返水 &ndash;&gt;-->
        <!--<div class="log-search">-->
          <!--<div class="log-form">-->
            <!--<p>-->
              <!--<b>会员帐号</b>-->
              <!--<input type="text" class="inpt" id="offlineUsernamefs" maxlength="15">-->
            <!--</p>-->
            <!--<p>-->
              <!--<b>返水类型：</b>-->
              <!--<select id="offlineProposalTypefs" class="inpt">-->
                <!--<option value="0">全部</option>-->
                <!--<option value="507">系统洗码</option>-->
                <!--<option value="616">PT自助洗码</option>-->
                <!--<option value="617">PTOTHER自助洗码</option>-->
                <!--<option value="622">TTG自助洗码</option>-->
                <!--<option value="624">QT自助洗码</option>-->
                <!--<option value="625">NT自助洗码</option>-->
                <!--<option value="628">DT自助洗码</option>-->
                <!--<option value="629">MG自助洗码</option>-->
              <!--</select>-->
            <!--</p>-->
            <!--<div>-->
              <!--<input type="text" class="inpt " id="offlineStarttimefs" readonly=""-->
                     <!--onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'})" my97mark="false" placeholder="开始时间">-->
              <!--<i class="icons"></i>-->
            <!--</div>-->
            <!--<div>-->
              <!--<input type="text" class="inpt " id="offlineEndtimefs" readonly=""-->
                     <!--onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss'}" my97mark="false" placeholder="结束时间">-->
              <!--<i class="icons"></i>-->
            <!--</div>-->

            <!--<button href="javascript:;" class="redbtn" onclick="agentOfflineRecordNewfs(this,'fs',1,10);">-->
              <!--<i class="icons icons-search"></i>查询-->
            <!--</button>-->

          <!--</div>-->
          <!--<div class="data_info">-->
            <!--<div class="j-comTable">-->
              <!--<table>-->
                <!--<thead>-->
                <!--<tr>-->
                  <!--<th>序号</th>-->
                  <!--<th>会员账户</th>-->
                  <!--<th>申请时间</th>-->
                  <!--<th>额度</th>-->
                  <!--<th>申请类型</th>-->
                <!--</tr>-->
                <!--</thead>-->
                <!--<tbody>-->
                <!--<tr>-->
                  <!--<td>1</td>-->
                  <!--<td>jack168</td>-->
                  <!--<td>2017-07-13 17:58:27</td>-->
                  <!--<td>35.23</td>-->
                  <!--<td>QT自助洗码</td>-->
                <!--</tr>-->
                <!--<tr>-->
                  <!--<td>2</td>-->
                  <!--<td>woodytest</td>-->
                  <!--<td>2017-07-12 19:03:13</td>-->
                  <!--<td>93</td>-->
                  <!--<td>undefined</td>-->
                <!--</tr>-->
                <!--<tr>-->
                  <!--<td>3</td>-->
                  <!--<td>woodytest</td>-->
                  <!--<td>2017-07-10 10:04:57</td>-->
                  <!--<td>3058.32</td>-->
                  <!--<td>QT自助洗码</td>-->
                <!--</tr>-->
                <!--<tr>-->
                  <!--<td>4</td>-->
                  <!--<td>woodytest</td>-->
                  <!--<td>2017-07-07 17:47:21</td>-->
                  <!--<td>704.64</td>-->
                  <!--<td>TTG自助洗码</td>-->
                <!--</tr>-->
                <!--<tr>-->
                  <!--<td>5</td>-->
                  <!--<td>jack168</td>-->
                  <!--<td>2017-07-05 17:50:32</td>-->
                  <!--<td>352.32</td>-->
                  <!--<td>TTG自助洗码</td>-->
                <!--</tr>-->
                <!--<tr>-->
                  <!--<td>6</td>-->
                  <!--<td>woodytest</td>-->
                  <!--<td>2017-07-04 13:51:02</td>-->
                  <!--<td>13.25</td>-->
                  <!--<td>undefined</td>-->
                <!--</tr>-->
                <!--</tbody>-->
              <!--</table>-->
            <!--</div>-->
            <!--<div class="j-page pagination">-->
              <!--<div class="page"><span>共6条</span>每页<select class="page-size" value="10">-->
                <!--<option selected="true" value="10">10</option>-->
                <!--<option value="20">20</option>-->
                <!--<option value="30">30</option>-->
                <!--<option value="40">40</option>-->
                <!--<option value="50">50</option>-->
                <!--<option value="60">60</option>-->
                <!--<option value="70">70</option>-->
                <!--<option value="80">80</option>-->
                <!--<option value="90">90</option>-->
                <!--<option value="100">100</option>-->
              <!--</select>条&nbsp;<a class="first pagechangeno iconfont icon-first" title="首页">首页</a><a-->
                <!--class="pre pagechangeno iconfont icon-pre" title="上一页">上一页</a><select class="page-index" value="1">-->
                <!--<option selected="true" value="1">1</option>-->
              <!--</select><a class="next pagechangeno iconfont icon-next" title="下一页">下一页</a><a-->
                <!--class="last pagechangeno iconfont icon-last" title="尾页">尾页</a></div>-->
            <!--</div>-->
          <!--</div>-->
          <!--&lt;!&ndash;                         <div class="data_info">-->
                                      <!--<table>-->
                                          <!--<tr>-->
                                              <!--<th>序号</th>-->
                                              <!--<th>会员账号</th>-->
                                              <!--<th>申请时间</th>-->
                                              <!--<th>返水额度</th>-->
                                              <!--<th>返水类型</th>-->
                                          <!--</tr>-->
                                          <!--<tbody id="offlineRecordDivfs">-->
                                          <!--</tbody>-->
                                      <!--</table>-->
                                  <!--</div> &ndash;&gt;-->
        <!--</div>-->
        <!--&lt;!&ndash; 会员优惠 &ndash;&gt;-->
        <!--<div class="hidden log-search">-->
          <!--<div class="log-form">-->
            <!--<p>-->
              <!--<b>会员帐号：</b>-->
              <!--<input type="text" class="inpt" id="offlineUsernameyh" maxlength="15">-->
            <!--</p>-->
            <!--<p>-->
              <!--<b>优惠类型：</b>-->
              <!--<select style="width: 95px;" id="offlineProposalTypeyh" class="inpt"></select>-->
            <!--</p>-->
            <!--<div>-->
              <!--<input type="text" class="inpt " id="offlineStarttimeyh" readonly=""-->
                     <!--onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})" my97mark="false" placeholder="开始时间">-->
              <!--<i class="icons"></i>-->
            <!--</div>-->
            <!--<div>-->
              <!--<input type="text" class="inpt " id="offlineEndtimeyh" readonly=""-->
                     <!--onfocus="WdatePicker({dateFmt:'yyyy-MM-dd'})" my97mark="false" placeholder="结束时间">-->
              <!--<i class="icons"></i>-->
            <!--</div>-->

            <!--<button href="javascript:;" class="redbtn" onclick="agentOfflineRecordNewyh(this,'yh','1',10);">-->
              <!--<i class="icons icons-search"></i>查询-->
            <!--</button>-->
          <!--</div>-->
          <!--<div class="data_info">-->
            <!--<div class="j-comTable"></div>-->
            <!--<div class="j-page hidden pagination"></div>-->
          <!--</div>-->
          <!--&lt;!&ndash;                         <div class="data_info">-->
                                      <!--<table>-->
                                          <!--<tr>-->
                                              <!--<th>序号</th>-->
                                              <!--<th>会员账号</th>-->
                                              <!--<th>申请时间</th>-->
                                              <!--<th>优惠</th>-->
                                              <!--<th>申请类型</th>-->
                                          <!--</tr>-->
                                          <!--<tbody id="offlineRecordDivyh">-->
                                          <!--</tbody>-->
                                      <!--</table>-->
                                  <!--</div> &ndash;&gt;-->
        <!--</div>-->
      </div>
    </div>
  </div>
  <!---->
  <!--<div class="page_content_wrap">-->
  <!--<div class="layout_form layout_form04">-->
  <!--<search-form @search="search" :searchData="searchData">-->
  <!--<div class="form_field date_picker with_arrow_icon">-->
  <!--<span class="form_field_label">类型</span>-->
  <!--<div class="form_field_input">-->
  <!--<select v-model="searchData.code" class="without_style with_arrow">-->
  <!--<option value="-1">输赢</option>-->
  <!--<option v-for="item in type" :value="item.value">{{item.name}}</option>-->
  <!--</select>-->
  <!--</div>-->
  <!--</div>-->
  <!--</search-form>-->
  <!--<table-data :thead="thead" :data="data">-->
  <!--<tr v-if="show" v-for="(item,i) in data.pageContents||[]">-->
  <!--<td>{{data.pageIndex + i + 1}}</td>-->
  <!--<td>{{item.loginname}}</td>-->
  <!--<td>{{item.platform}}</td>-->
  <!--<td>{{item.bettotal}}</td>-->
  <!--<td>{{item.amount}}</td>-->
  <!--<td>{{item.tempCreateTime | Date}}</td>-->
  <!--</tr>-->
  <!--<tr v-if="!show" v-for="(item,i) in data.pageContents||[]">-->
  <!--<td>{{data.pageIndex + i + 1}}</td>-->
  <!--<td>{{item.loginname}}</td>-->
  <!--<td>{{item.tempCreateTime | Date}}</td>-->
  <!--<td>{{item.money}}</td>-->
  <!--<td>{{item.gifTamount}}</td>-->
  <!--<td>{{item.type}}</td>-->
  <!--</tr>-->
  <!--</table-data>-->
  <!--</div>-->
  <!--</div>-->
  <!--&lt;!&ndash;}会员账务&ndash;&gt;-->
</template>
<script>
  import {getAgentQueryType,queryPlatformDetails,querySubProposal} from "api/agent";
  import tableData from "components/table-data"
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
    components:{}
  }
</script>
