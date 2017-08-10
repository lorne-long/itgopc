<template>
  <div class="game-view">
    <div class="banner game-banner">
      <ul class="banner-wrapper game-wrapper horizontal">
        <li v-for="item in myData" @click="" class="slider-item active">
          <img :src="getImg({pic:item.picPath,category:item.platform})"> <strong>夏日海滩</strong>
          <div class="game-play">
            <a class="icons" target="_blank" href="javascript:void(0)" @click="tryGame(extend(item),$event)">免费试玩</a>
            <a class="icons into" target="_blank" href="javascript:void(0)"
               @click="playGame(extend(item),$event)">进入游戏</a>
          </div>
        </li>
      </ul>
      <a class="icons prev" href="javascript:void(0);"></a>
      <a class="icons next" href="javascript:void(0);"></a>
    </div>
  </div>
</template>
<script>
  import {games} from "@/vue-extend/mixins";
  import {queryRecommandGamesList} from "api/show"

  export default {
    mixins: [games],
    data() {
      return {
        myData: [],
      };
    },
    methods: {
      extend(item) {
        return {
          "eName": "",
          "name": item.gameName,
          "id": item.gameId,
          "code": item.gameId,
          "category": item.platform,
          "type": "SLO",
          "line": "",
          "state": 1,
           subType: "",
          "pic": item.picPath,
          "tag": []
        }
      }
    },
    created() {
      queryRecommandGamesList({gameType: 0}).then(res => {
        this.myData = res.data;
      });
    },
    activated() {
    },
    components: {}
  }
</script>
<style spcoed>
</style>
