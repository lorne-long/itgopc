<template>
  <div class="content-main">
    <div class="mem_cont deposit ">
      <h3>申请提款</h3>
      <div class="deposit_wrap">
        <div class="deposit_form" style="height:auto;">
          <table border="0" cellpadding="0" cellspacing="0">
            <tbody>
            <tr>
              <td class="txt">老虎机佣金余额：</td>
              <td class="cl-dd">
                <input type="text" class="inpt" readonly :value="userData.accountMoney" disabled=""></td>
            </tr>
            <tr>
              <td class="txt">提款金额：</td>
              <td class="cl-dd"><input v-model.number="sumitData.amount" type="text" maxlength="6" class="inpt"
                                       placeholder="单次提款金额最低100元"></td>
            </tr>
            <tr>
              <td class="txt">银行名称：</td>
              <td class="cl-dd">
                <select v-model="sumitData.cardId" ref="carddom" class="inpt">
                  <option value="">请选择银行</option>
                  <option v-for="(item,i) in bankList" :value="item.id">{{item.bankname}}（尾号{{item.bankno}}）</option>
                </select>
                <a href="javascript:;" class="js-bindcard2 j-addBankCard"> 绑定卡/折号？</a>
              </td>
            </tr>
            <!--<tr>-->
            <!--<td class="txt">提款类型：</td>-->
            <!--<td>-->
            <!--<select id="tkType" class="inpt">-->
            <!--<option value="slotmachine">老虎机佣金</option>-->
            <!--</select>-->
            <!--<input  type="hidden" id="tkBankAddress" />-->
            <!--</td>-->
            <!--</tr>-->
            <tr>
              <td class="txt">支付密码：</td>
              <td class="cl-dd">
                <input v-show="isSetPayPwd" v-model="sumitData.payPassword" type="password" maxlength="6" class="inpt">
                <router-link v-show="!isSetPayPwd" to="">设置支付密码？</router-link>
              </td>
            </tr>
            <tr>
              <td></td>
              <td class="cl-dd"><a href="javascript:;" class="redbtn" @click="submit">提交</a></td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="tipstxt tikuan">
          <p class="r"><span class="cl-dd">注：</span> 提款后风控审核，请合作伙伴耐心等待，3小时内到账。</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import  md5  from "MD5";
  import  {findUserBankList,checkWithdrawPwd,thirdWithdraw}  from "api/safeCenter";
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        bankList:[],
        sumitData:{
          amount:"",
          cardId:"",
          payPassword:""
        }
      };
    },
    watch:{},
    methods:{
      checkForm(){
        if(this.sumitData.amount=="")toast("请输入取款金额!");
        else if(this.sumitData.amount<100)toast("最少取款100元!");
        else if(this.sumitData.amount>this.userData.accountMoney)toast("余额不足!");
        else if(this.sumitData.cardId=="")toast("请选银行卡!");
        else{
          return true;
        }
      },
      showPay(val){
        if(!this.checkForm()){
          return;
        }
      },
      submit(){
        if(!this.checkForm())return;
        if(this.sumitData.payPassword=="") return toast("请输入支付密码!");
        thirdWithdraw(
          {
            amount:this.sumitData.amount,
            cardId:this.sumitData.cardId,
            payPassword:md5(md5(this.sumitData.payPassword)) //因为密码要加密 这种方式易懂     监控变化也可以  或者Object.assign()合并也可以
          }
        ).then(data=>{
          if(data.success){
            this.sumitData.amount='';
            this.sumitData.payPassword='';
          }
          toast(data.message);
        }).catch(err=>{
          toast("取款失败,请稍后重新尝试!")
        })
      }
    },
    computed:{
      ...mapGetters(["userData",'isSetPayPwd'])
    },
    created(){
      checkWithdrawPwd().then(data=>{
        if(data.success&&data.data=="0"){
          this.$router.push("/pwd/payset");
        }
      });
      findUserBankList().then(data=>{
        if(data.success){
          this.bankList=data.result;
        }
        else{
          toast("获取银行卡失败")
        }
      }).catch(err=>{
        toast("获取银行卡失败")
      })
    },
    components:{}
  };
</script>
<style>
</style>
