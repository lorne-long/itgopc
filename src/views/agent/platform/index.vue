<template>
  <div class="page_content_wrap">
    <div class="layout_form layout_form04">
      <search-form @search="search" :searchData="searchData">
        <div class="form_field date_picker with_arrow_icon">
          <span class="form_field_label">类型</span>
          <div class="form_field_input">
            <select v-model="searchData.code" class="without_style with_arrow">
              <option value="-1">输赢</option>
              <option v-for="item in type" :value="item.value">{{item.name}}</option>
            </select>
          </div>
        </div>
      </search-form>
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
  </div>
  <!--}会员账务-->
</template>
<script>
  import {getAgentQueryType, queryPlatformDetails} from "api/agent";
  const thead1 = ['序', '会员帐号', '平台', '投注总额', '输赢值', '创建时间']
  const thead2 = ['序', '会员帐号', '创建时间', '额度', '红利', '提案类型']
  export default {
    data () {
      return {
        type: [],
        thead: thead1,
        show:true,
        data: {},
        searchData: {
          total: 0, //true string
          startDate: "", //true string
          endDate: "",// true string
          size: 10, //true string
          pageIndex: 0, //true string
          code: '-1'
        }
      }
    },
    methods: {
      search(index){
        if(!isNaN(index)){
          if(index==this.searchData.pageIndex)return
          this.searchData.pageIndex=index
        }
        queryPlatformDetails(this.searchData).then(res => {
          if (res.success) {
            if(this.searchData.code != "-1"){
              this.show=!this.show
            }
            this.thead =this.searchData.code == "-1" ? thead1 : thead2;
              this.data=res.data
          }
          else {
            toast(res.message)
          }
        }).catch(err => {
          toast("查询失败")
        })
      }
    },
    created(){
      getAgentQueryType().then(res => {
        if (res.success) {
          this.type = res.data;
        } else {
          toast(res.message)
        }
      }).catch(err => {
        toast("类型加载失败")
      })
    },
    components: {
    }
  }
</script>
