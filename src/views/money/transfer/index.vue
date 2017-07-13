<template>
  <div class="page_content_wrap">
    <div class="sec_box layout_transfer_account">
      <div class="select-top">
        <div class="to_account display_flex_h flex_align_center">
          <div class="label">
            <span class="label-text text_red">  转出</span>
            <span>{{type==0?"主账户":"游戏账户"}}</span>
          </div>
          <div class="flex_1">
            <div v-show="type==0">{{accountMoney}} 元</div>
            <select ref="transOut" v-model="data.transferGameOut"
                    class="without_style with_arrow select j-moneyAccount">
              <option v-for="item in array2" :value="item.value">
                {{item.text}}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <div class="to_account display_flex_h flex_align_center">
          <div class="label">
            <span class="label-text text_green">转入</span>
            <span>  <span>{{type!=0?"主账户":"游戏账户"}}</span></span>
          </div>
          <div class="flex_1">
            <div v-show="type!=0">{{accountMoney}} 元</div>
            <select v-show="type==0" v-model="data.transferGameIn" class="without_style with_arrow hd-value select">
              <option v-for="item in array1" :value="item.value">
                {{item.text}}
              </option>
            </select>
          </div>
        </div>
      </div>
      <span class="icon icon_transfer02" @click="changType"></span>
    </div>
    <div class="layout_form layout_form03">
      <form action="#">
        <div class="form_field_warp">
          <div class="form_field">
            <span class="form_field_label">金额</span>
            <div class="form_field_input"><input v-model.number="data.transferGameMoney" type="text"
                                                 placeholder="请输入转账金额"></div>
          </div>
        </div>
      </form>
    </div>
    <div class="btn_wrap">
      <a href="javascript:;" @click="transfer" class="btn btn01">确定</a>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {updateGameMoney} from "api/safeCenter"
  import  {getAllMoney} from "api/user"
  let transferGameIn=[
    {value:"",text:"选择游戏平台"},{value:"PT",text:"PT账户"},{value:"MG",text:"MG账户"},{value:"TTG",text:"TTG账户"},
    {value:"NT",text:"NT账户"},{value:"QT",text:"QT账户"},{value:"DT",text:"DT账户"},{value:"AGIN",text:"捕鱼账户"},
  ]
  let transferGameOut=[{value:"MAIN",text:"主账户"},{value:"DEPUTY",text:"副账户"}];
  export default {
    data() {
      return {
        array1:transferGameIn,
        array2:transferGameOut,
        type:0,//0表示转入游戏账户  1表示转入主账户
        accountMoney:"",
        gameMoney:0,
        data:{
          transferGameOut:"MAIN", //转出账号
          transferGameMoney:"",
          transferGameIn:""//转入
        }
      };
    },
    watch:{
      "data.transferGameOut"(val){
        if(this.type!=0){
          if(val=="")return;
          let options=this.$refs.transOut.options;
          options[options.selectedIndex].text="正在查询金额..."
          getAllMoney({gameCode:val}).then(res=>{
            if(res.success){
              options[options.selectedIndex].text=transferGameIn[options.selectedIndex].text+" ("+res.data+")元";
            }else{
              options[options.selectedIndex].text=res.message;
            }

          }).catch(err=>{
            options[options.selectedIndex].text="查询金额失败..."
          })
        }else{
          if(val=="MAIN")
            this.accountMoney=this.userData.accountMoney;
          else{
            getAllMoney({gameCode:"Deputy"}).then((res)=>{ //副账户
              if(res.success) this.accountMoney=res.data;
              else{
                this.accountMoney=res.message;
              }
            }).catch(err=>{
              this.accountMoney=0;
            });
          }
        }
      }
    },
    computed:{
      ...mapGetters(["userData"])
    },
    created(){
      this.accountMoney=this.userData.accountMoney;
    },
    activated(){
      this.accountMoney=this.userData.accountMoney;
    },
    methods:{
      transfer(){
        if(this.data.transferGameMoney=="")return toast("请输入转账金额");
        if(this.data.transferGameIn=="" &&this.type==0)return toast("请选择游戏平台");
        if(this.data.transferGameOut=="" &&this.type!=0)return toast("请选择游戏平台");
        updateGameMoney(this.data).then(res=>{
            toast(res.message);
        }).catch(err=>{
          toast("转入失败");
        })
      },
      changType(){ //切换转入转出
        this.type=this.type==0 ? 1 : 0;
        if(this.type==0){
          this.array1=transferGameIn;
            this.array2=transferGameOut;
          this.data.transferGameOut="MAIN"
          this.data.transferGameIn="";
        }else{
          this.array1=transferGameOut;
          this.array2=transferGameIn;
          this.data.transferGameIn="MAIN"
          this.data.transferGameOut="";
        }
      }
    }
  }
</script>
<style>
</style>
