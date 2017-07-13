<template>
  <div class="layout_item_list02 notice_list_wrap">
    <back-header></back-header>
    <div v-for="(item,i) in data" class="item_list">
      <div class="title_content" @click="showView(item,i)">
        <div class="title_content_main">
          <h3>{{item.title}}
            <span class="notice_time">{{item.createtime|Date("M月dd日")}}</span>
          </h3>
          <p v-html="item.content"></p>
        </div>
      </div>
      <transition name="message">
        <div v-show="item.already" :ref="item.id">
          <div class="toggle_content_main toggle_content " v-html="item.content">
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
  import  {getNewAnnouncement} from "api/show";
  import  Vue from "vue";
  export default {
    data() {
      return {
        data: []  //records
      };
    },
    methods: {
      showView(item, i){
        if(this.$refs[item.id][0].style.height==""){
          this.$refs[item.id][0].style.height=this.$refs[item.id][0].css("height");
        }

          Vue.nextTick(()=>{
            item.already=!item.already;
          });
      }
    },
    created(){
      //加载数据
      getNewAnnouncement().then(res => {
        if (res.success) {
          this.data= res.data.map(item=>{
            item.already=false;
            return item;
         });
        } else {
          toast(data.message);
        }
      })
    },
    components:{
      'back-header':require("components/header_back/header_back")
    }
  }
</script>
<style>
  .message-enter-active, .message-leave-active {
    transition: all 1s;
    overflow: hidden;
  }
  .message-enter,
  .message-leave-to{
    height: 0!important;
  }
</style>
