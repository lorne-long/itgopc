<template>
  <ul class="left-menu sidebar">
    <li id="user_info"  v-if="islogin">
      <router-link  class="user-name" tag="div" :to="isAgent?{path:'/agent'}:{path:'/user'}">
        <div class="step">V{{userData.levelNumber}}</div>
        <div class="u-name">{{userData.loginname}}</div>
      </router-link>
    </li>
    <li  v-for="item in myData">
      <router-link v-if="item.to" :to="item.to" class="flash" >
        <i  :class="['icons',item.icon]"></i>
            {{item.name}}
      </router-link>
      <a v-else href="javascript:void(0);">
        <i  :class="['icon-user',item.icon]"></i>
        {{item.name}}
      </a>
    </li>
  </ul>
</template>
<script>
  let user_menu=[
    {name:"个人资料",to:{path:"/user/datum"},icon:"icon-user"},
    {name:"财务服务",to:{path:"/user/finance"},icon:"icon-finance"},
    {name:"我的优惠",to:{path:"/user/discount"},icon:" icon-discount"},
    {name:"安全中心",to:{path:"/user/security"},icon:"icon-security"},
    {name:"记录查询",to:{path:"/user/log"},icon:"icon-log"},
    {name:"站内消息",to:{path:"/user/message"},icon:"icon-msg"}
  ]
//  {name:'佣金报表',to:{path:"/agent/ptcommission"}},
//  {name:'会员列表',to:{path:"/agent/subuser"}},
//  {name:'会员账务',to:{path:"/agent/platform"}},
//  {name:'额度记录',to:{path:"/agent/creditlog"}},
//  {name:'个人中心',to:{path:"/agent/profile"}},
//  {name:'绑定银行卡/折号',to:{path:"/agent/personal"}},
  let Agent_menu=[
    {name:"数据汇总",to:{name:"agent_index"},icon:"icon-user"},
    {name:"佣金报表",to:{name:"agent_ptcommission"},icon:"icon-gold"},
    {name:"会员列表",to:{name:"agent_subuser"},icon:"icon-users"},
    {name:"会员账务",to:{name:"agent_platform"},icon:"	icon-userMoney"},
    {name:"额度记录",to:{name:"agent_creditlog"},icon:"icon-log"},
    {name:"申请提款",to:{path:"/agent/index"},icon:"icon-cash"},
    {name:"站内信  ",to:{name:"agent_message"},icon:"icon-msg"},
//    {name:"数据汇总",to:{path:""},icon:"icon-cash"},
//    {name:"绑定银行卡  ",to:{path:""},icon:"icon-msg"}
  ]
  import {mapGetters} from 'vuex'
    export default {
        data() {
            return {
              myData:[]
            };
        },
        props:{
          data:{
            type:Array,
            default(){
              return [];
            }
          }
        },
        methods:{},
        computed:{
          ...mapGetters(["userData","islogin","isAgent",'isUser'])
        },
        created(){
          if(this.data.length==0){
            this.myData=this.isAgent?Agent_menu:user_menu
          }else{
            this.myData=this.data;
          }
        }
    };
</script>
<style>
</style>
