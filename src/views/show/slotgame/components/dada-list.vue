<template>
  <div v-show="value">
    <ul class="games-list clearfix">
      <li v-for="(item,i) in data">
        <img v-lazy='getImg(item,i)'/>
        <strong>{{item.name}}</strong>
        <div class="game-play">
          <a  target="_blank" @click="tryGame(item,$event)" class="link t0_5">免费试玩</a>
          <a  target="_blank" @click="playGame(item,$event)" class="into">进入游戏</a>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import {saveOrUpdateGameStatus} from "api/show"
  import {games} from  "@/vue-extend/mixins";
  export default {
    mixins:[games],
    data() {
      return {};
    },
    props: {
      value: {
        type: Boolean,
        default: true,
      },
      data: Array,
      statusData: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      getfaved(item) {
        return this.statusData.some(el => {
          return el.id == item.id;
        })
      },
    }
  };
</script>
<style>
</style>
