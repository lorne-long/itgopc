<template>
  <div class="user-login">
    <form class="form-login">
      <div class="login-form">
        <div class="icon-user"><label>用户名</label>
          <input type="text" name="account" v-model="data.account" placeholder="请输入用户名"/></div>
        <div class="icon-enter"><label>密&nbsp;&nbsp;码</label>
          <input type="password" name="password"  v-model="data.password" placeholder="请输入用户密码"/></div>
        <div class="user-code icon-code"><label>验证码</label>
          <div class="u-code-ipt">
            <input type="text" v-model="data.imageCode"  name="imageCode" placeholder="验证码"/>
          </div>
          <img :src="ImgCode" @click="getimg"/>
        </div>
        <!--<label class="agreement" for="login_xy"><input id='login_xy' type="radio">我已年满18岁，同意并查看过游戏的<a class="cl-gr" href="javascript:void(0);">《协议条款》</a></label>-->

      </div>
      <div class="user-btn">
        <button type="submit" @click.prevent="login" class="button login-into">立即登录</button>
        <a type="button" class="button icon-enter icon-r">忘记密码</a>
      </div>
    </form>
  </div>
</template>
<script>
  import  {getAuthImg,login}  from "api/authService"
  import {$localStorage, $sessionStorage} from '@/util/storage';
  import {AUTH_NAME} from "@/store/types"//权限名称
  import {mapGetters,mapActions,mapMutations} from 'vuex'
  export default {
    data(){
      return {
        ImgCode:getAuthImg(),
        isAgent:false,
        data:{
          account:"woodytest",
          password:"aa123456789",
          imageCode:"",
          isRemember:false
        }
      }
    },
    props:{},
    methods:{
      ...mapMutations(["SHOW_LOGIN"]),
      getimg(){
        this.ImgCode=getAuthImg()
      },
      reset(msg){
        this.data.imageCode=""
        this.getimg()
        toast(msg);
      },
      login() {
        if(!this.check())return;
        login(this.data).then(res =>{
          if(res.success){
            this.SHOW_LOGIN(false)
            this.data.imageCode='';
            if(this.data.isRemember){
              $localStorage.set("isRememberAccount",this.data.account);
            }else{
              $localStorage.remove("isRememberAccount");
            }
            let {rquest} = this.$route.query;
            if(!rquest){
              let {role} = res.data;
              let $path="/index";
              this.$store.dispatch("UPDATE_USERDATA");
              this.$store.commit("SET_AUTH",role);
              if(role==AUTH_NAME.AGENT){
                $path="/agent/index";
              }else if(role==AUTH_NAME.USER){
                $path="/user/index";
              }
              this.$router.push({path:$path});
            }else{
              this.$router.push({path:rquest});
            }
          }else{
            this.reset(res.message)
          }
        }).catch(error =>{
          this.reset("请求失败")
        });
      },
      check() {
        if(this.data.account=="")
          toast("用户名不能为空")
        else if(this.data.password=="")
          toast("密码不能为空")
        else if(this.data.imageCode=="")
          toast("验证码不能为空")
        else
          return true;
      },
    },

    created(){
    },
    components:{}
  };
  //  import {login, getAuthImg} from 'api/authService';
  //  import vChoose from 'components/choose';
  //  import {$localStorage, $sessionStorage} from '@/util/storage';
  //  import {AUTH_NAME} from "@/store/types"//权限名称
  //  export default {
  //    data() {
  //      return {
  //        authImg: getAuthImg(),
  //        isAgent: false,
  //        data: {
  //          account: "woodytest",
  //          password: "aa123456789",
  //          imageCode: "",
  //          isRemember: false
  //        }
  //      };
  //    },
  //    methods: {
  //      getimg(e) {
  //        this.authImg = getAuthImg();
  //      },
  //      reset(msg){
  //        this.data.imageCode=""
  //        this.getimg()
  //        toast(msg);
  //      },
  //      login() {
  //        if (!this.check())return;
  //        login(this.data).then(res =>{
  //          if (res.success) {
  //            this.data.imageCode='';
  //            if (this.data.isRemember) {
  //              $localStorage.set("isRememberAccount", this.data.account);
  //            } else {
  //              $localStorage.remove("isRememberAccount");
  //            }
  //            let {rquest} = this.$route.query;
  //            if (!rquest) {
  //              let {role} = res.data;
  //              let $path = "/index";
  //              this.$store.dispatch("UPDATE_USERDATA");
  //              this.$store.dispatch("SET_AUTH", role);
  //              if (role == AUTH_NAME.AGENT) {
  //                $path = "/agent/index";
  //              } else if(role == AUTH_NAME.USER) {
  //                $path = "/user/index";
  //              }
  //              this.$router.push({path: $path});
  //            } else {
  //              this.$router.push({path:rquest});
  //            }
  //          }else {
  //            this.reset(res.message)
  //          }
  //        }).catch(error =>{
  //          this.reset("请求失败")
  //        });
  //      },
  //      check() {
  //        if (this.data.account == "")
  //          toast("用户名不能为空")
  //        else if (this.data.password == "")
  //          toast("密码不能为空")
  //        else if (this.data.imageCode == "")
  //          toast("验证码不能为空")
  //        else
  //          return true;
  //      },
  //      changeTab(){
  //        this.isAgent = this.$route.name=='agentLogin';
  //        if(this.isAgent) {
  //          this.data.account = "a_bbb";
  //          this.data.password = "aa123456"
  //        }else{
  //          this.data.account = "woodytest";
  //          this.data.password = "aa123456789"
  //        }
  //      }
  //    },
  //    created() {
  //      if ($localStorage.get("isRememberAccount")) {
  //        this.data.isRemember = true;
  //        this.data.account = $localStorage.get("isRememberAccount");
  //      }
  //      this.changeTab();
  //    },
  //    components: {
  //      vChoose
  //    }
  //  };
</script>
<style>
</style>
