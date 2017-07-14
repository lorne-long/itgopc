<template>
  <div class="dataTables_wrapper no-footer">
    <table class="no-footer dataTable" role="grid">
      <thead>
      <tr>
        <th class="sorting_disabled" v-for="(item,i) in thead" @click="item.method||null">
          {{ item.name || item }}
        </th>
      </tr>
      </thead>
      <tbody>
      <slot></slot>
      <tr v-show="!showLoad&&!data.hasOwnProperty('totalRecords')">
        <td :colspan="thead.length" style="padding-bottom: 1em">尚未查询
        </td>
      </tr>
      <tr class="odd" v-show="showLoad">
        <td :colspan="thead.length" style="padding-bottom: 1em">
          <loadding>正在查询...</loadding>
        </td>
      </tr>
      <tr v-show="data.totalRecords==0&&!showLoad">
        <td valign="top" :colspan="thead.length" class="dataTables_empty">空数据
        </td>
      </tr>
      </tbody>
    </table>
    <page-By @search="search" :data="data"></page-By>
  </div>
</template>
<script>
  import pageBy from "components/paging-by";
  import loadding from "components/loadding";
  export default {
    data(){
      return {
        showLoad:false,
      }
    },
    watch:{},
    props:{
      thead:{
        type:Array,
        default(){
          return [];
        }
      },
      data:{
        type:Object,
        default(){
          return {
            pageContents:[]
          };
        }
      },
      className:{
        type:String
      }
    },
    watch:{
      "data.pageContents"(val){
        if(val.length>0){
          this.showLoad=false;
        }else{
          this.showLoad= !this.showLoad;
        }
      }
    },
    methods:{
      search(val,size){
        this.$emit("search",val,size)
      }
    },
    components:{
      pageBy,loadding
    }
  }
</script>
<style>
</style>
