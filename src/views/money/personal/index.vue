<template>
  <div id="page_content" class="flex_1">
    <div class="page_content_wrap withdraw_content_wrap">
      <div class="sec_box main_account_sec j-content1">
        <h3>主账户</h3>
        <p><span class="money_text j-mainMoney">{{userData.accountMoney}}</span> 元</p>
      </div>
      <div class="layout_form layout_form04 j-content1">
        <div class="form_field_warp">
          <div class="form_field with_right_label">
            <span class="form_field_label">金额</span>
            <div class="form_field_input"><input type="text" v-model.number="sumitData.amount" placeholder="最少100元"></div>
            <span class="right_label">元</span>
          </div>
          <div class="form_field bank_card_select">
            <span class="form_field_label">取款至</span>
            <span class="icon icon_logo_bank icon_logo_02"></span><!-- 不同银行卡的样式 icon_logo_01 icon_logo_02 -->
            <div class="form_field_input">
              <select  v-model="sumitData.cardId" ref="carddom">
                <option  value="">请选择银行卡</option>
                <option  v-for="(item,i) in bankList"    :value="item.id">{{item.bankname}}（尾号{{item.bankno}}）</option>
              </select>
            </div>
          </div>
        </div>
        <div class="btn_wrap">
          <a href="javascript:void(0);" @click="showPay" class="btn btn01 j-submit">提交</a>
        </div>
      </div>
      <div class="bottom_link j-content1">
        <router-link to="/datum/addbank">添加银行卡？</router-link>
      </div>
      <div class="page_content_wrap" v-show="step==2">
        <div class="layout_operation_result normal_padding">git
          <div class="sec_box">
            <img class="icon_top" src="images/icons/icon_ok.png" width="78" height="79">
            <h3>取款申请成功</h3>
            <p class="result_text">金额 <span class="j-getMoney">{{sumitData.amount}}</span></p>
            <div class="space_border"></div>
            <p class="info_text">工作人员正在为您处理，如果您的各项资料正确，
              取款金额会在1小时内到达您的绑定银行账户。</p>
          </div>
          <div class="btn_wrap no_padding">
            <a href="static/accountHistory.jsp" class="btn btn01">查看取款记录</a>
          </div>
        </div>
      </div>
      <div class="dialog_wrap dialog_with_title" :style="{display:step==1?'block':'none'}">
        <div class="dialog_main">
          <div class="title_wrap">请输入支付密码</div>
          <div class="dialog_content">
            <div class="layout_form layout_form_dialog">
              <div class="form_field_warp">
                <div class="form_field">
                  <span class="form_field_label">银行</span>
                  <div class="form_field_input">
                    {{bankText}}
                  </div>
                </div>
                <div class="form_field no_border">
                  <span class="form_field_label">金额</span>
                  <div class="form_field_input"><span class="money_text">{{sumitData.amount}}</span></div>
                </div>
                <div class="form_field with_icon_label form_field_password with_right_label">
                  <div class="form_field_input"><input v-model="sumitData.payPassword" type="password" placeholder="支付密码是由6位纯数字组成的" maxlength="6" class="j-payPassword"></div>
                  <span class="right_label"></span>
                </div>
              </div>
              <div class="btn_wrap">
                <a href="javascript:void(0);" @click="submit" class="btn btn01 j-submit2">确定</a>
                <a href="javascript:void(0);" @click="step=0" class="btn btn02 j-cancel mt10">取消</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import  md5  from "MD5";
    import  {findUserBankList,checkWithdrawPwd,thirdWithdraw}  from "api/safeCenter";
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
              step:0,
              bankList:[],
              bankText:"",
              sumitData:{
                amount:"",
                cardId:"",
                payPassword:""
              }
            };
        },
        watch:{
          "sumitData.cardId"(){
            this.bankText=this.$refs.carddom.options[this.$refs.carddom.options.selectedIndex].text;
          }
        },
        methods:{
          checkForm(){
            if(this.sumitData.amount=="")toast("请输入取款金额!");
            else if(this.sumitData.amount<100)toast("最少取款100元!");
            else if(this.sumitData.amount>this.userData.accountMoney)toast("余额不足!");
            else if(this.sumitData.cardId=="")toast("请选银行卡!");
            else{return true;}
          },
          showPay(val){
            if(!this.checkForm()){return;}
            this.step=1;
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
          ...mapGetters(["userData"])
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
