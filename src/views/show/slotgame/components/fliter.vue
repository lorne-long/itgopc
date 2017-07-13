<template>
  <div class="filter_dropdown_content_sec">
    <h3>{{data.title}}</h3>
    <ul class="filter_item_content">
      <li class="filter_item" v-for="(item,i) in data.data">
        <router-link>{{item.name}}</router-link>
      </li>
    </ul>
    <div class="space_border_wrap"><div class="space_border"></div></div>
  </div>
</template>
<script>
    export default {
        data() {
            return {
            }
        },
        watch:{},
        props:{
          data:{
            type:Object,
            defalut(){
              return {
                title:"",
                data:[{name:"NT",value:"",}]
              }
            }
          }
        },
        activated(){},
        methods:{},
        computed:{},
        created(){
        },
        components:{}
    };
</script>
<style>
</style>
