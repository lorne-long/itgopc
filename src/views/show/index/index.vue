<template>
  <div class="index-main">
    <div class="banner index-banner">
      <div class="banner-wrapper">
        <a class="opacity-item active" href="javascript:void(0);"><img src="static/images/banner/banner.jpg"/></a>
        <a class="opacity-item" href="javascript:void(0);"><img src="static/images/banner/im1.jpg"/></a>
        <a class="opacity-item" href="javascript:void(0);"><img src="static/images/banner/banner.jpg"/></a>
      </div>
      <div class="banner-page">
        <a class="active" href="javascript:void(0);"></a>
        <a href="javascript:void(0);"></a>
        <a href="javascript:void(0);"></a>
      </div>
    </div>
    <div class="game-list">
      <div class="container">
        <div class="game-platform">
          <ul>
            <li v-for="item in slotGame">
              <router-link :class="item.class" :to="item.to">
                {{item.name}}
              </router-link>
            </li>
          </ul>
        </div>
        <div class="game-view">
          <div class="banner game-banner">
            <ul class="banner-wrapper game-wrapper horizontal">
              <li v-for="item in bannerData" @click="" class="slider-item active">
                <img :src="getImg({pic:item.picPath,category:item.platform})"> <strong>夏日海滩</strong>
                <div class="game-play"><a class="icons" target="_blank"
                                          href="/gameQT.php?gameCode=ELK-samonthebeach&amp;isfun=1&amp;type=1"
                                          @click="tryGame(extend(item))">免费试玩</a>
                  <a class="icons into" target="_blank"
                     href="href=&quot;/gameQT.php?gameCode=ELK-samonthebeach&amp;isfun=0&amp;type=1&quot;"
                     @click="playGame(extend(item))">进入游戏</a>
                </div>
              </li>
            </ul>
            <a class="icons prev" href="javascript:void(0);"></a>
            <a class="icons next" href="javascript:void(0);"></a>
          </div>
        </div>
      </div>
    </div>
    <div class="activity">
      <div class="container">
        <div class="banner activity-banner j-activity">
          <div class="banner-wrapper">
            <a href="javascript:void(0);"><img src="static/images/banner/im1.jpg"/></a>
            <a class="opacity-item" href="javascript:void(0);"><img src="static/images/banner/banner.jpg"/></a>
            <a class="opacity-item" href="javascript:void(0);"><img src="static/images/banner/im1.jpg"/></a>
            <a class="opacity-item" href="javascript:void(0);"><img src="static/images/banner/banner.jpg"/></a>
            <a class="opacity-item" href="javascript:void(0);"><img src="static/images/banner/im1.jpg"/></a>
          </div>
          <div class="banner-page horizontal">
            <a class="active" href="javascript:void(0);">注册送18-88元 </a>
            <a href="javascript:void(0);">免费筹码1288元 </a>
            <a href="javascript:void(0);">首存100%</a>
            <a href="javascript:void(0);">返水最高1.1% </a>
            <a href="javascript:void(0);">次次存送最高25%</a>
          </div>
        </div>
        <div class="winning-info">
          <div class="money">
            <div class="tips-txt">
              <img src="static/images/tips-txt.png"/>
            </div>
            <div class="money-number j-pond">
              <jack-pot></jack-pot>
            </div>
          </div>
          <img src="static/images/winning-title.jpg"/>
          <div style="height:410px; overflow:hidden;margin-top:30px;">
            <ul class="winning-list j-group">
              <li v-for="item in winningData">
                <div><img src="static/images/prd/1.jpg"/></div>
                <div class="info">
                  <p>恭喜玩家 <b>{{item.userName}}</b>在{{item.platform}}游戏</p>
                  <p><span>{{item.gameName}} </span>赢得<span>{{item.prize}}</span>元</p>
                  <p><b>{{item.prizeTime}}</b></p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="help-self ">
      <div class="horizontal container">
        <a href="javascirpt:void(0);">
          <img src="static/images/icon/index-1.png"/>
          <p>存款速度</p>
        </a>
        <a href="javascirpt:void(0);">
          <img src="static/images/icon/index-2.png"/>
          <p>取款速度</p>
        </a>
        <a href="javascirpt:void(0);">
          <img src="static/images/icon/index-3.png"/>
          <p>银行支持</p>
        </a>
        <a href="javascirpt:void(0);">
          <img src="static/images/icon/index-4.png"/>
          <p>游戏指南</p>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
  import  jackPot from "components/jackpot"
  import {queryRecommandGamesList,queryBannerList,getCarouselListAll} from "api/show"
  import {games} from  "@/vue-extend/mixins";
  let slotGame=[
    {name:"PT 老虎机",class:"pt",to:{name:'slotgame',params:{type:"PT"}}},
    {name:"DT 老虎机",class:"dt",to:{name:'slotgame',params:{type:"PT"}}},
    {name:"MG 老虎机",class:"mg",to:{name:'slotgame',params:{type:"MSG"}}},
    {name:"NT 老虎机",class:"nt",to:{name:'slotgame',params:{type:"NT"}}},
    {name:"QT 老虎机",class:"qt",to:{name:'slotgame',params:{type:"QT"}}},
    {name:"TTG 老虎机",class:"ttg",to:{name:'slotgame',params:{type:"TTG"}}}
  ]
  export default {
    name:"index",
    mixins:[games],
    data() {
      return {
        slotGame,
        bannerData:[],
        winningData:[],
      };
    },
    props:{
      showModel:{default:true}
    },
    methods:{
      extend(item){
        return {
          "eName":"",
          "name":item.gameName,
          "id":item.gameId,
          "code":item.gameId,
          "category":item.platform,
          "type":"SLO",
          "line":"",
          "state":1,
          "pic":item.picPath,
          "tag":[]
        }
      }
    },
    computed:{},
    created(){
      queryBannerList({bannerType:0}).then()
      queryRecommandGamesList({gameType:0}).then(res=>{
        this.bannerData=res.data;
      });
      getCarouselListAll().then(res=>{
        if(res.success){
          this.winningData=res.data;
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
    activated(){
    },
    components:{
      jackPot
    }
  };
</script>
<style>
</style>
