<template>
  <div class="content-main">
    <h3 class="">站内消息</h3>
    <div class="loc-msg">
      <ul>
        <li v-for="(item,i) in data.pageContents" class="read" @click="showView(item,i)">
          <a href="javascript:void(0);">
            <h4>{{item.title}}</h4>
            <p>{{item.createDate}}</p>
          </a>
          <transition name="message">
            <div :ref="item.id" v-show="!!viewList['x-'+item.id]">
              <div style="padding:29px;border-top:2px #ccab67 solid;">
                {{viewList[item.id] }}
              </div>
            </div>
          </transition>
        </li>
        <li  v-show="showLoadding">
          <loadding></loadding>
        </li>
        <li  v-show="!data.pageContents||data.pageContents.length==0" style="text-align: center; padding: 30px">
          暂无站内消息
        </li>
      </ul>
      <paging-by :data="data" @seach=""></paging-by>
    </div>
  </div>
</template>
<script>
  import  {getMessageByUser,readMsg} from "api/common";
  import    pagingBy from "components/paging-by";
  import    loadding from "components/loadding";
  import  Vue from "vue";
  export default {
    data() {
      return {
        data:{},  //records
        viewList:{},
        showLoadding:true,
        searchData:{ //查询条件
          total:"10", //true string
          v:"",    //true string
          size:"10",  // true string
          pageIndex:"1"//
        }
      };
    },
    methods:{
      showView(item,i){
        if(typeof this.viewList["x-"+item.id]=="boolean"){
          this.$set(this.viewList,"x-"+item.id,!this.viewList["x-"+item.id]);
          return;
        }
        readMsg({msgID:item.id}).then((data)=>{
          this.$set(this.viewList,item.id,data.data.content);
          Vue.nextTick(()=>{
            this.$refs[item.id][0].style.height=this.$refs[item.id][0].css("height");
            this.$set(this.viewList,"x-"+item.id,true);
          });
        });
      },
      search(index){
        this.searchData.pageIndex=!isNaN(index)?index:this.searchData.pageIndex;
        getMessageByUser(this.searchData).then(res =>{
          this.showLoadding=false
          if(res.success){
            this.data=res.data;
          }else{
            toast(res.message);
          }
        })
      }
    },
    created(){
      this.search();
    },
    components:{
      pagingBy,loadding
    }
  }
</script>
<style>
  .message-enter-active, .message-leave-active {
    transition: all 1s;
    overflow: hidden;
  }

  .message-enter,
  .message-leave-to {
    height: 0 !important;
  }
</style>
