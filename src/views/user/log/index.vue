<template>
  <div class="content-main">
    <h3 class="">记录查询</h3>
    <div class="log-search">
      <dl>
        <dt>记录类型：</dt>
        <dd v-for="item in filterMenu" @click="searchData.historyType=item.value"
            :class="['subnav',{active:searchData.historyType==item.value}]">
          {{item.name}}
        </dd>
      </dl>
      <div class="log-form">
        <div>
          开始时间<input type="date" class="calendar  mr20 inpt Wdate" v-model="searchData.startDate"/>
        </div>
        <div>
          结束时间<input type="date" class="calendar  mr20 inpt Wdate" maxlength="20" v-model="searchData.endDate"/>
        </div>
        <select v-model="searchData.friendtype" v-show="searchData.historyType=='friend'" class="moz-select select">
          <option value="0">推荐注册成功玩家</option>
          <option value="1">推荐奖金收入</option>
          <option value="2">推荐奖金支出</option>
        </select>
        <button type="button" @click="search"><i class="icons icons-search"></i>查询</button>
      </div>
      <div class="log-list">
        <tabledata @search="search" :thead="thead" :data="data">
          <tr v-for="(item,i) in data.pageContents||[]">
            <td v-for="one in thead">
              {{item[one.value]}}
            </td>
          </tr>
        </tabledata>
      </div>
    </div>
  </div>
</template>
<script>
  import  {queryHistory} from "api/user";
  import  tabledata from "components/table-data";
  let filterMenu=[
    {name:"在线存款",value:"deposit"},{name:"提款",value:"withdraw"},{name:"户内转账",value:"transfer"},{
      name:"优惠活动",
      value:"concessionReccords"
    },
    {name:"自助优惠",value:"couponRecords"},{name:"自助返水",value:"ximaDetail"},{name:"好友推荐",value:"friend"},
  ]
  export default {
    data() {
      return {
        thead:[],
        filterMenu,
        data:{pageContents:[]},
        searchData:{
          historyType:"deposit",
          startDate:"",
          endDate:'',
          pageIndex:1,
          size:10,
          friendtype:"0"
        }
      };
    },
    watch:{},
    methods:{
      search(index,size){
        if(!isNaN(index)){
          if(index==this.searchData.pageIndex&&this.searchData.size==size )return
          this.searchData.pageIndex=index;
          this.searchData.size=size||10;
        }
        this.data.pageContents=[];
        this.changeType(this.searchData.historyType);
        queryHistory(this.searchData).then((res)=>{
          if(res.success){
            this.data=res.data;
          }else{
            toast(res.message)
          }
        });
      },
      changeType(val){
        switch(val){
          case "deposit":
            return this.thead=[{name:'编号',value:'billno'},{name:"提款金额",value:"money"},{
              name:"状态",
              value:"flag"
            },{name:"提款时间",value:"tempCreateTime"}];
          case "withdraw":
            return this.thead=[{name:'编号',value:'pno'},{name:'提款金额',value:'amount'},{
              name:'状态',
              value:'flag'
            },{name:'提款时间',value:'tempCreateTime'}];
          case "transfer":
            return this.thead=[{name:'编号',value:'id'},{name:'转账金额',value:'remit'},{name:'转账时间',value:'tempCreateTime'}];
          case "concessionReccords":
            return this.thead=[{name:'优惠类型',value:'type'},{name:'赠送金额',value:'amount'},{
              name:'创建时间',
              value:'tempCreateTime'
            }];
          case "couponRecords":
            return this.thead=[{name:'赠送',value:'gifTamount'},{name:'存款',value:'amount'}];
          case "deputyRecords":
            return this.thead=[{name:'附言',value:'depositId'},{name:'银行',value:'bankname'},{
              name:'状态',
              value:'status'
            },{name:'创建时间',value:'tempCreateTime'}];
          case "ximaDetail":
            return this.thead=[{name:'有效投注额',value:'validAmount'},{name:'结算金额',value:'ximaAmount'},{
              name:'状态',
              value:'ximaStatus'
            }];
          case "friend":
            return this.thead=[{name:'玩家账号',value:'downlineuser'},{name:'金额',value:'money'},{
              name:'类型',
              value:'type'
            },{name:'时间',value:'createtime'}];
          default:
            break;
        }
      },
    },
    created(){
      this.searchData.startDate=new Date().addDay(-60).format("yyyy-MM-dd");
      this.searchData.endDate=new Date().format("yyyy-MM-dd");
    },
    mounted(){
      this.search()
    },
    components:{
      tabledata
    }
  };
</script>
<style>
  .user-pg .log-search { padding-bottom: 20px }
</style>
