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
        <recommand-games></recommand-games>
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
          <winning-list></winning-list>

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
  import {queryBannerList} from "api/show"
  import recommandGames from  "./components/recommand-games";
  import winningList from  "./components/winning-list";
  let slotGame=[
    {name:"PT 老虎机",class:"pt",to:{name:'slotgame',params:{type:"PT"}}},
    {name:"DT 老虎机",class:"dt",to:{name:'slotgame',params:{type:"DT"}}},
    {name:"MG 老虎机",class:"mg",to:{name:'slotgame',params:{type:"MSG"}}},
    {name:"NT 老虎机",class:"nt",to:{name:'slotgame',params:{type:"NT"}}},
    {name:"QT 老虎机",class:"qt",to:{name:'slotgame',params:{type:"QT"}}},
    {name:"TTG 老虎机",class:"ttg",to:{name:'slotgame',params:{type:"TTG"}}}
  ]
  export default {
    data() {
      return {
        slotGame
      };
    },
    methods:{
    },
    created(){
      queryBannerList({bannerType:0}).then()
    },
    activated(){
    },
    components:{
      jackPot,recommandGames,winningList
    }
  };
</script>
<style>
</style>
