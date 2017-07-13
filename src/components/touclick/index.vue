<template>
  <div v-show="showDom" ref="verifyWarp" style="width: 320px;">
  </div>
</template>
<script>
  //  import touclicks from 'touclick'
  export default {
    data() {
      return {
        showDom:false
      };
    },
    props:{
      value:{
        type:Boolean,
        defulat:false
      }
    },
    watch:{
      value(val){
        this.showDom=val;
      },
      showDom(val){
        val&&this.success();
      }
    },
    methods:{
      success(){
        let _this=this;
        let tc=TouClick(this.$refs.verifyWarp,{
          onSuccess(obj){
            _this.$emit("success",obj,tc);
          },
          onMaskClick(e){
            tc.close();   //点击关闭验证码
            tc.destory();   //点击关闭验证码
            _this.$emit("input",false);
          }
        });
        tc.start()
      }
    }
  };
</script>
<style>
</style>
