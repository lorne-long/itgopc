<template>
  <div class="search-menu fl">
    <dl class="clearfix" v-for="mydata in data">
      <dt class="fl">{{mydata.title}}</dt>
      <dd v-for="(item,i) in mydata.data"
          :class="{active:item.value==mydata.active}" @click="search(item,i,mydata)">
        {{item.name}}
      </dd>
    </dl>
  </div>
</template>
<script>
//  let platform = {
//    title: "全部平台", filter: "platform",active:"",
//    data: [
//      {name: "全部平台", value: "ALL"}, {name: "PT", value: "PT"}, {name: "MG", value: "MG"},
//      {name: "DT", value: "DT" }, {name: "NT", value: "NT"}, {name: "QT", value: "QT"}
//    ]
//  }
  let line = {
    title: "赔付线数:", filter: "line",active:"",
    data: [
      {name: "全部", value: ""}, {name: "全赔", value: "100-1024"}, {name: "1-15", value: "16-40"},
      {name: "41-100", value: "41-100"}, {name: "其它", value: "1025-2048"}
    ]
  }
  let tag = {
    title: "游戏类型：", filter: "tag",active:"",
    data: [
      {name: "全部", value: ""}, {name: "热门游戏", value: "HOT"}, {name: "最新游戏", value: "NEW"},
      {name: "彩金池游戏",value: "AMA"}, {name: "其他游戏", value: "OTH"}
    ]
  }
  export default {
    data() {
      return {
        data:[line,tag]
      }
    },
    watch:{},
    props:{
      value:Boolean
    },
    methods:{
      search(item,i,mydata){
        mydata.active=item.value;
        this.$emit("search",mydata.filter,item.value);
      }
    }
  };
</script>
<style>
</style>
