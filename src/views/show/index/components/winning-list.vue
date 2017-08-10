<template>
  <div style="height:410px; overflow:hidden;margin-top:30px;">
    <ul class="winning-list j-group">
      <li v-for="item in myData">
        <div><img src="static/images/prd/1.jpg"/></div>
        <div class="info">
          <p>恭喜玩家 <b>{{item.userName}}</b>在{{item.platform}}游戏</p>
          <p><span>{{item.gameName}} </span>赢得<span>{{item.prize}}</span>元</p>
          <p><b>{{item.prizeTime}}</b></p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import {getCarouselListAll} from "api/show"
    export default {
        name: "",
        data() {
            return {
              myData:[],
            }
        },
        props: {},
        computed: {},
        watch: {},
        methods: {},
        created() {
          getCarouselListAll().then(res=>{
            if(res.success){
              this.myData=res.data;
              let groupdom=$(".j-group");
              function j_groupID_fun(){
                groupdom.animate({top:"-102px"},1000,function(){
                  groupdom.find(":first").appendTo(groupdom);
                  groupdom.css("top",0);
                });
              }
              var j_groupID=setInterval(j_groupID_fun,2000)
              $(".j-group").hover(function(){
                clearInterval(j_groupID);
              },function(){
                j_groupID=setInterval(j_groupID_fun,2000)
              })
            }
          })
        },
        activated() {
        },
        components: {}
    }
</script>
<style spcoed>
</style>
