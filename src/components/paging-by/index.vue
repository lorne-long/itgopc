<template>
  <div class="pagination" v-show="mydata.totalPages>1">
    <div class="page"><span>共6条</span>每页<select class="page-size" value="10">
      <option selected="true" value="10">10</option>
      <option value="20">20</option>
      <option value="30">30</option>
      <option value="40">40</option>
      <option value="50">50</option>
      <option value="60">60</option>
      <option value="70">70</option>
      <option value="80">80</option>
      <option value="90">90</option>
      <option value="100">100</option>
      <!--pagechangeno-->
    </select>条&nbsp;<a class="first" @click="pageFun(1)" title="首页">首页</a>
      <a   class="pre " title="上一页" @click="prev">上一页</a>
      <select v-model="pageNumber">
        <option v-for="n in mydata.totalPages" :value="n">{{n}}</option>
      </select>
      <a class="next   " @click="next" title="下一页">下一页</a><a
        class="last   " @click="pageFun(mydata.totalPages)" title="尾页">尾页</a></div>
  </div>

</template>
<script>
  export default {
    data(){
      return {pageNumber:1}
    },
    props:{
      data:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed:{
      mydata(){
        let mydateInit={
          numberOfRecordsShown:0, //当前页多少条
          pageNumber:1,//当前页
          size:0,  //页大小
          totalPages:0,//总页数，
          totalRecords:0//总记录条数,
        };
        Object.assign(mydateInit,this.data);
        this.pageNumber=mydateInit.pageNumber;
        return mydateInit;
      }
    },
    watch:{
      "pageNumber"(val){
        this.pageFun(val)
      }
    },
    methods:{
      pageFun(index){
        this.$emit("search",index);
      },
      prev(){
        if(this.mydata.pageNumber==1)return;
        this.pageFun(--this.mydata.pageNumber);
      },
      next(){
        if(this.mydata.pageNumber>=this.mydata.totalPages)return
        this.pageFun(++this.mydata.pageNumber);
      }
    }
  }
</script>
