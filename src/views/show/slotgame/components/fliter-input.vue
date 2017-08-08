<template>
  <div class="sh-ipt"> 游戏搜索：
    <input v-model="inputVal" placeholder="请输入游戏名称" type="text">
    <button type="button" @click="search"><i></i></button>
    <div class="filter" v-show="inputData.length>0">
      <a v-for="item in inputData" href="javascript:void(0);"
         @click="itemClick(item)">{{item.name}}</a>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        inputVal:'',
        inputData:[]
      }
    },
    props: {
      data:{
        type:Array,
        required:true
      }
    },
    computed: {},
    watch: {
      inputVal(val) {
        if (val == "") {
          return this.inputData = []
        }
        this.inputData=this.data.filter((item, i) => {
          return item.name.includes(val) || item.eName.toLowerCase().includes(val);
        });
        this.$emit("change",val);
      }
    },
    methods: {
      search(){
        if(this.inputVal=="")return;//没有数据不查询
        this.$emit("search",this.inputVal,this.inputData||[])
        this.inputData=[];
      },
      itemClick(item){
        this.inputVal="";
        this.$emit("item",item);
      }
    },
    components: {}
  }
</script>
<style spcoed>
</style>
