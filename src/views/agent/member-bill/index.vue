<template>
  <div class="content-main">
    <div class="mem_cont deposit" id="finance">
      <h3 class="fl top-left">我的账户</h3>
      <div class="tab-menu u-tab-menu u-tab-bd ">
        <a href="javascript:void(0)" v-for="item in type" :class="{active:curName==item.value}"
           @click="curName=item.value" :key="item.value">
          会员{{item.name}}
        </a>
      </div>
    </div>
    <winlose  v-show="curName==-1"></winlose>
    <recharge v-for="(item,i) in type.slice(1)"
              :type="item.value"
              v-show="curName==item.value">
    </recharge>
  </div>
</template>
<script>
  import {getAgentQueryType} from "api/agent";
  import winlose from './components/win-lose';//会员账务  》  输赢
  import recharge from './components/recharge';//会员账务  》  公共页   //原来 页面不同

//  import discounts from './components/discounts';//会员账务  》  优惠
//  import drawings from './components/drawings';//会员账务  》  提款
//  import washCode from './components/wash-code';//会员账务  》   洗码/返水

  export default {
    data() {
      return {
        type: [{value: '-1',name:"输赢"}],
        curName:"-1"
      }
    },
    methods: {
      getValue(name){
       let curitem= this.type.find((item,i)=>{
         return item.name==name;
       })
        return curitem==undefined?"-1":curitem.value;
      }
    },
    created() {
      getAgentQueryType().then(res => {
        if (res.success) {
          this.type.push(...res.data);
        } else {
          toast(res.message)
        }
      }).catch(err => {
        toast("类型加载失败")
      })
    },
    components:{
      winlose,recharge
    }
  }
</script>
