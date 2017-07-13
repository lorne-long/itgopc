<template>
<div></div>
</template>
<script>
  import {logOut} from 'api/authService';
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components: {
//      "bankList": require("components/bank-list/index")
    },
    methods: {
      logOut: function () {
        logOut();
        this.$router.push("/index");
      }
    },
  }
</script>
