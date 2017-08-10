<template>
  <div>
    <ul class="bank-data clearfix">
      <li v-show="list.length<3" @click="showAdd=true"
          style="cursor: pointer; border: 1px dashed #ccc;text-align: center;background: none; border: 2px #ccc dashed;">
        <div class="bank-info"
             style="font-size: 148px; display: inline-block;font-weight: bold;height: auto;margin-top: 17px;background-color: #fff;color: #ccab67; vertical-align: middle;">
          +
        </div>
      </li>
      <li v-for="item in list">
        <div class="bank-info">
          <div class="bank-icon">
            <img src="static/images/icon/ccb.png"/>
          </div>
          <div class="bank-card">
            {{item.bankname}}
            <p>**** **** **** {{item.bankno}}</p>
          </div>
        </div>
        <p>持卡人：{{userData.accountName}}</p>
      </li>
    </ul>
    <div class="addCard" v-show="showAdd" @click.self="showAdd=false">
      <div>
        <h1>添加银行卡</h1>
        <div class="inputbox">
          <span class="label">银行卡号：</span>
          <input type="text" v-model="bankno" @input="getBank" placeholder="输入卡号后，系统智能识别银行" maxlength="19"/>
        </div>
        <div class="cardTips"><img v-show="loadding" src="@/assets/images/loading.gif" height="20"> {{banktxt}}</div>
        <a href="javascript:;" class="formbtn" @click="submit">保&nbsp;&nbsp;&nbsp;&nbsp;存</a>
        <span class="closeBtn"></span>
      </div>
    </div>
  </div>
</template>
<script>
  import {findUserBankList,validateBankNo,bindBankNo} from "api/payment"
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        loadding:false,
        bankno:"",
        banktxt:"",
        validateBankNo:false,
        showAdd:false,
        list:[]
      }
    },
    props:{
      text:{
        type:String,
        default:""
      }
    },
    methods:{
      getBank(){
        if(/^(\d{16}|\d{19})$/.test(this.bankno)){
          this.loadding=true;
          validateBankNo({bankno:this.bankno}).then(data=>{
            this.validateBankNo=data.success;
            this.loadding=false;
            if(data.success)this.banktxt=data.data;
          }).catch(err=>{
            this.loadding=false;
          })
        }else{
          this.banktxt="";
        }
      },
      submit(){
        if(this.bankno=="")return toast("请输入正确的银行卡");
        if(!this.validateBankNo)return toast("银行卡校验未通过");
        bindBankNo({cardNo:this.bankno}).then(data=>{
          if(data.success){
            this.bankno="";
          }else{
            toast(data.message);
          }
        }).catch(err=>{
          toast("操作失败");
        })
      }
    },
    computed:{
      ...mapGetters(["userData"])
    },
    created(){
      findUserBankList().then(data =>{
        if(data.success){
          this.list=data.data;
        }else{
          toast(data.message)
        }
      }).catch(err =>{
        toast("银行卡加载失败");
      })
    }
  }
</script>
<style>
  .addCard > div {
    transform: translate(-50%, -50%);
    margin: 0 !important;
  }
</style>
