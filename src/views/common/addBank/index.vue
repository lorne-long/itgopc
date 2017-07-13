<template>
  <div id="page_content" class="flex_1">
    <div class="page_content_wrap add_bank_content">
      <div class="layout_form layout_form02">
        <div class="form_field_warp">
          <div class="form_field">
            <span class="form_field_label">银行卡号</span>
            <div class="form_field_input"><input v-model="bankno" type="text" placeholder="输入卡号后，系统智能识别银行" class="j-bankno" maxlength="19"
                                                 @input="getBank"></div>
          </div>
          <div class="addBankTips">
            {{banktxt}}
          </div>
        </div>
        <div class="form_btn_wrap">
          <a href="javascript:void(0);" @click="submit" class="btn btn01 j-submit">保存</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import {validateBankNo,bindBankNo} from "api/safeCenter";
    export default {
        data() {
            return {
              bankno:"",
              banktxt:"",
              validateBankNo:false
            };
        },
        methods:{
          getBank(){
              if(/^(\d{16}|\d{19})$/.test(this.bankno)){
                validateBankNo({bankno:this.bankno}).then(data=>{
                  this.validateBankNo=data.success;
                  if(data.success)this.banktxt=data.data;
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
        }
    };
</script>
<style>
</style>
