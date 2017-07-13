<template>
<div>
</div>
</template>
<script>


  let  platform={title:"全部平台",filter:"platform",
    data:[
      {name:"全部平台",value:"ALL"},{name:"PT",value:"PT"},{name:"MG",value:"MG"},{name:"DT",value:"DT"},{name:"NT",value:"NT"},{name:"QT",value:"QT"}
    ]
  }
  let  line={title:"赔付线",filter:"line",
    data:[
      {name:"全部",value:""},{name:"全赔",value:"100-1024"},{name:"1-15",value:"16-40"},{name:"41-100",value:"41-100"},{name:"其它",value:"1025-2048"}
    ]
  }
  let  tag={title:"类型",filter:"tag",
    data:[
      {name:"全部",value:""},{name:"热门",value:"HOT"},{name:"最新",value:"NEW"},{name:"彩金池",value:"AMA"},{name:"其他",value:"OTH"}
    ]
  }
  export default {
    data() {
      return {
        showFilter:false,
        filterData:[ platform, line,tag]
      };
    },
    watch:{},
    props:{},
    activated(){
    },
    methods:{
      search(){}
    },
    computed:{},
    created(){
    },
    components:{

    }
  };
</script>
<style>

</style>
