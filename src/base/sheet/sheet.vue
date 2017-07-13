<template>
  <transition name="sheet-float">
    <div v-show="value" class="sheet">
      <ul class="sheet-list" :style="{ 'margin-bottom': cancelText ? '5px' : '0' }">
        <!--<li v-for="( item, index ) in data" class="sheet-list-item">-->
          <!--{{item.name}}-->
        <!--</li>-->
        <li v-for="( item, index ) in data"     class="sheet-list-item"  @click.stop="itemClick(item, index)">
            <router-link v-if="item.to" :to="item.to">{{item.name}}</router-link>
            <a v-else :href="item.href||'javascript:;'"  :target="item.target">
              {{item.name}}
            </a>
       </li>
      </ul>
      <a class="sheet-btn-cancel" @click.stop="curShow=false" v-if="cancelText!=''">{{ cancelText }}</a>
    </div>
  </transition>
</template>

<script type="text/babel">
  import cover from 'base/cover/cover';
  export default {
    name:'mt-sheet',
    mixins:[cover],
    props:{
      cancelText:{
        type:String,
        default:'取消'
      },
      data:{
        type:Array,
        default:() => []
      },
      showModel:{
        default:true
      },
      modelClick:{
        default:true
      }
    },
    data(){
      return {
        curShow:false
      }
    },
    watch:{
      value(val){
        this.curShow=val;
      },
      curShow(val){
        this.$emit("input",val)
      }
    },
    methods:{
      itemClick(item,index) {
        if(item.method&&typeof item.method==='function'){
          item.method(item,index);
        }
        this.curShow=false;
      },
    }
  };
</script>
<style lang="scss">
  .sheet {
    z-index: 2;
    position: fixed;
    width: 95%;
    text-align: center;
    bottom: 0;
    left: 50%;
    font-size: 18px;
    transform: translate3d(-50%, 0, 0);
    backface-visibility: hidden;
    transition: transform .3s ease-out;
  }

  .sheet-list {
    list-style: none;
    padding: 0;
    margin: 0;
    border-radius: 5px;
    overflow: hidden;
  }

  .sheet-list-item {
    display: block;
    padding: 8px 0;
    background-color: #e0ebf1;
    border-top: 1px solid #d0dbe1;
    color: #6a91f4;

  &
  :first-child { border-top: none; }

  }
  .sheet-btn-cancel {
    margin-top: 10px;
    background-color: #f2f7fb;
    margin-bottom: 5px;
    color: red;
    display: block;
    border-radius: 5px;
    padding: 8px 0;
  }

  .sheet-float-enter, .sheet-float-leave-active {
    transform: translate3d(-50%, 100%, 0);
  }
</style>
