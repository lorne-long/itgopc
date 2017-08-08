<template>
  <div class="content-main">
    <h3>个人资料</h3>
    <component :is="showWhat"></component>
    <h3>银行卡资料</h3>
    <bank-list></bank-list>
  </div>
</template>
<script>
  import vPerfect from './components/perfect.vue'
  import vUpdate from './components/update.vue'
  import bankList from 'components/bank-list'
  export default {
    data() {
      return {};
    },
    computed:{
      showWhat(){
        let name=this.$store.getters.userData.accountName;
        return name!=null&&name!="" ? vUpdate : vPerfect;
      }
    },
    components:{
      vPerfect,vUpdate,bankList
    }
  };
</script>
<style>
</style>
