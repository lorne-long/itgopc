<template>
  <div class="ajax-load-animate" v-show="value">
    <div class="animate-item-warp animate-item-two">
      {{text}}
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import cover from 'base/cover/cover';
  export default {
    mixins:[cover],
    props:{
      text:{
        type:String,
        default:"加载中..."
      },
      showModel:{
        default:true
      }
    },
    watch:{
    }
  };
</script>
<style>
  .ajax-load-animate {
    /*background: rgba(0,0,0,0.5);*/
    position: fixed; z-index:9999998; top:0px; left: 0; width: 100%; height: 100% }
  .animate-item-warp { position: relative;
    height: 150px;
    width: 150px;
    line-height: 150px;
    text-align: center;
    font-size: 20px;
    color: yellow;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
  }

  .animate-item-one:after, .animate-item-one:before,
  .animate-item-two:after, .animate-item-two:before {
    content: '';
    top: 0;
    bottom: 0;
    display: block;
    position: absolute;
    background-color: rgba(0, 0, 0, 0);
    border: 5px solid rgba(0, 183, 229, 0.9);
    opacity: .9;
    border-left: 5px solid rgba(0, 0, 0, 0);
    border-radius: 50%;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 30px #2187e7;
  }

  .animate-item-one:before {
    border-top: 5px solid rgba(0, 0, 0, 0);
    width: 80%;
    height: 80%;
    left: 10%;
    top: 10%;
    animation: spinoff 2s infinite linear;
  }

  .animate-item-one:after {
    border-top: 5px solid rgba(0, 0, 0, 0);
    animation: spin 2s infinite linear;
  }

  @keyframes spinoff {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(-360deg); }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .animate-item-two:after {
    width: 80%;
    height: 80%;
    left: 10%;
    top: 10%;
    border-right: 5px solid rgba(0, 0, 0, 0);
    animation: spin 2s infinite linear;
  }
  .animate-item-two:before {
    border-right: 5px solid rgba(0, 0, 0, 0);
    animation: spinPulse 2s infinite  ease-in-out;

  }

  @keyframes spinPulse {
    0% { transform: rotate(0deg); opacity:1; box-shadow: 0 0 1px #2187e7; }
    50% { transform: rotate(145deg); opacity:1; }
    100% { transform: rotate(-360deg); opacity:1; }
  }
</style>
