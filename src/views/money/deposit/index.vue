<template>
  <div class="deposit">
    <div id="page_content" class="flex_1">
      <select v-model="depositType" class="without_style with_arrow type_select">
        <option value="thirdPay">第三方存款</option>
        <option value="zzhk">秒存转账（手机、网银转账/支付宝转账）</option>
      </select>
      <div class="page_content_wrap thirdPay_type" v-show="depositType=='thirdPay'">
        <div class="sec_box j-sec_box">
          <div class="main_nav_with_arrow ul_auto_wrap align_center">
            <ul class="title j-title">
              <li data-num="0" class="active"><a href="javascript:void(0);" class="layout_image_with_text"><img
                src="static/images/icons/icon_alipay.png" width="40" height="40"><span
                class="img_text">支付宝支付</span></a><span class="arrow_down"></span></li>
              <li data-num="1"><a href="javascript:void(0);" class="layout_image_with_text"><img
                src="static/images/icons/icon_online_deposit.png" width="40" height="40"><span
                class="img_text">网银支付</span></a><span class="arrow_down"></span></li>
              <li data-num="2"><a href="javascript:void(0);" class="layout_image_with_text"><img
                src="static/images/icons/icon_weixin.png" width="40" height="40"><span class="img_text">微信支付</span></a><span
                class="arrow_down"></span></li>
            </ul>
          </div>
          <div class="layout_form layout_form02 no_left_padding j-content deposit_form">
            <div class="quick_select_label filter_dropdown_content_sec">
              <h3>选择金额</h3>
              <div class="filter_item_content">
                <div class="filter_item" data-val="10"><a href="#" class="active">10元</a></div>
                <div class="filter_item" data-val="20"><a href="#">20元</a></div>
                <div class="filter_item" data-val="50"><a href="#">50元</a></div>
                <div class="filter_item last_line" data-val="100"><a href="#">100元</a></div>
                <div class="filter_item last_line" data-val="200"><a href="#">200元</a></div>
                <div class="filter_item last_line"><a href="#">其他</a></div>
              </div>
            </div>
            <div class="form_field_warp">
              <div class="form_field with_right_label form_field_money"><span class="form_field_label">金额</span>
                <div class="form_field_input"><input type="text" placeholder="最少100元，最多15万元" id="deposit-alipay-money"
                                                     class="j-money"><input ="hidden"="" id="minmoeryipu"><input ="
                  hidden"="" id="maxmoeryipu"></div>
                <span class="right_label">元</span></div>
              <div class="form_field"><span class="form_field_label">支付类型</span>
                <div class="form_field_input"><input type="hidden" value="alipay">
                  <select   class="j-type">
                  <option value="">请选择</option>
                  <option value="35" selplatformtype="yfzfb">优付支付宝</option>
                  <option value="38" selplatformtype="yfzfb">优付支付宝一</option>
                </select></div>
              </div>
            </div>
          </div>
          <div class="layout_form layout_form02 no_left_padding j-content hidden deposit_form">
            <div class="quick_select_label filter_dropdown_content_sec"><h3>选择金额</h3>
              <div class="filter_item_content">
                <div class="filter_item" data-val="10"><a href="#" class="active">10元</a></div>
                <div class="filter_item" data-val="20"><a href="#">20元</a></div>
                <div class="filter_item" data-val="50"><a href="#">50元</a></div>
                <div class="filter_item last_line" data-val="100"><a href="#">100元</a></div>
                <div class="filter_item last_line" data-val="200"><a href="#">200元</a></div>
                <div class="filter_item last_line"><a href="#">其他</a></div>
              </div>
            </div>
            <div class="form_field_warp">
              <div class="form_field with_right_label form_field_money"><span class="form_field_label">金额</span>
                <div class="form_field_input">
                  <input type="text" placeholder="最少100元，最多15万元" class="j-money">

                </div>
                <span class="right_label">元</span></div>
              <div class="form_field"><span class="form_field_label">支付类型</span>
                <div class="form_field_input"><input type="hidden" value="ebank"><select id="m-deposit-ebank-pay"
                                                                                         onchange="selChangeOpt(this);"
                                                                                         class="j-type">
                  <option value="">请选择</option>
                  <option value="50" selplatformtype="zfwy">网银通道一</option>
                </select></div>
              </div>
            </div>
          </div>
          <div class="layout_form layout_form02 no_left_padding j-content hidden deposit_form">
            <div class="quick_select_label filter_dropdown_content_sec"><h3>选择金额</h3>
              <div class="filter_item_content">
                <div class="filter_item"
                      v-for="item in loadMoney"
                     data-val="10"><a href="#" class="active">10元</a></div>
                <div class="filter_item" data-val="20"><a href="#">20元</a></div>
                <div class="filter_item" data-val="50"><a href="#">50元</a></div>
                <div class="filter_item last_line" data-val="100"><a href="#">100元</a></div>
                <div class="filter_item last_line" data-val="200"><a href="#">200元</a></div>
                <div class="filter_item last_line"><a href="#">其他</a></div>
              </div>
            </div>
            <div class="form_field_warp">
              <div class="form_field with_right_label form_field_money"><span class="form_field_label">金额</span>
                <div class="form_field_input"><input type="text" placeholder="最少100元，最多15万元" id="deposit-wechat-money"
                                                     class="j-money"><input ="hidden"="" id="minmoeryipu"><input ="
                  hidden"="" id="maxmoeryipu"></div>
                <span class="right_label">元</span></div>
              <div class="form_field"><span class="form_field_label">支付类型</span>
                <div class="form_field_input"><input type="hidden" value="wechat"><select id="m-deposit-wechat-pay"

                                                                                          class="j-type">
                  <option value="">请选择</option>
                  <option value="52" selplatformtype="zhfwx">智汇付微信</option>
                </select></div>
              </div>
            </div>
          </div>
        </div>
        <div class="btn_wrap j-btn"><a href="javascript:void(0);" class="btn btn01 j-submit" data-num="0">提交</a></div>
        <div class="btn_wrap j-btn hidden"><a href="javascript:void(0);" class="btn btn01 j-submit" data-num="1">提交</a>
        </div>
        <div class="btn_wrap j-btn hidden"><a href="javascript:void(0);" class="btn btn01 j-submit" data-num="2">提交</a>
        </div>
      </div>
      <sec-save v-show="depositType!='thirdPay'"></sec-save>
    </div>
  </div>
</template>
<script>
  import secSave from "./components/sec-save"
  export default {
    data() {
      return {
        depositType:'thirdPay',
        loadMoney:["10元","20元","50元","100元","200元","其他"]
      }
    },
    props:{},
    methods:{},
    computed:{},
    components:{
      secSave
    }
  };
</script>
<style>
</style>
