<template>
  <div class="ticker">
    <div id="total-ticker"></div>
  </div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        props:{},
        methods:{},
        computed:{},
        created(){
        },
        components:{}
    };
</script>
<!--<script src="https://tickers.playtech.com/jackpots/new_jackpotjs.js"></script>-->
<!--<script type="text/javascript">-->
  <!--var StartPageGlobal = {-->
    <!--hasCustomFooterColor: false,-->
    <!--customFooterColor: '',-->
    <!--shouldOpenUnsubscribeNewsletter: false-->
  <!--};-->
  <!--function addCommas (nStr) {-->
    <!--nStr += "";-->
    <!--x = nStr.split (".");-->
    <!--x1 = x[ 0 ];-->
    <!--x2 = x.length > 1 ? "." + x[ 1 ] : "";-->
    <!--var rgx = /(\d+)(\d{3})/;-->
    <!--while (rgx.test (x1)) {-->
      <!--x1 = x1.replace (rgx, "$1" + "," + "$2");-->
    <!--}-->
    <!--return x1 + x2;-->
  <!--}-->
  <!--Ticker.prototype.showJackpot = function () {-->
    <!--var newvalue = this.getJackpot ();-->
    <!--if (this.type != 'count') {-->
      <!--newvalue = Math.round (newvalue * 100) / 100 + '';-->
      <!--if (newvalue.match (/^\d+\.\d$/)) {-->
        <!--newvalue = newvalue + '0';-->
      <!--}-->
      <!--if (newvalue.match (/^\d+$/)) {-->
        <!--newvalue = newvalue + '.00';-->
      <!--}-->
    <!--}-->
    <!--var text = '';-->
    <!--if (newvalue > 0) {-->
      <!--text = (this.signpos != 0 ? addCommas (newvalue) + this.sign : this.sign + addCommas (newvalue));-->
    <!--}-->
    <!--if (newvalue > 0 && this.type == 'count') {-->
      <!--text = newvalue;-->
    <!--}-->
    <!--var imgtxt = loadImage (text);-->
    <!--if (imgtxt != '') {-->
      <!--this.textbox.innerHTML = imgtxt;-->
    <!--}-->
  <!--}-->
  <!--function loadImage (am) {-->
    <!--var digit_len = am.length;-->
    <!--var digit_img_str = "";-->
    <!--for (var di = 0; di < digit_len; di++) {-->
      <!--if (am[ di ].match (/^[0-9]$/)) {-->
        <!--digit_img_str += "<span class='jackpot jackpot_num'>" + am[ di ] + "</span> "-->
        <!--// if(di % 3 == 0 && di < 7) {-->
        <!--//    digit_img_str += "<span class='jackpot jackpot_comm'>&nbsp;</span>";-->
        <!--// }-->
      <!--}-->
      <!--else {-->
        <!--var classType = '';-->

        <!--if (am[ di ] == '.') {-->
          <!--classType = 'jackpot_dot';-->
        <!--}-->
        <!--else if (am[ di ] == ',') {-->
          <!--classType = 'jackpot_comm';-->
        <!--}-->
        <!--else {-->
          <!--continue;-->
        <!--}-->

        <!--digit_img_str += "<span class='jackpot " + classType + "'>,</span>";-->
      <!--}-->
    <!--}-->
    <!--return digit_img_str;-->
  <!--}-->
  <!--var ticker = new Ticker ({-->
    <!--info: 2,-->
    <!--casino: "playtech",-->
    <!--currency: 'cny',-->
    <!--root_url: "https://tickers.playtech.com/"-->
  <!--});-->
  <!--ticker.attachToTextBox ("total-ticker");-->
  <!--ticker.SetCurrencyPos (0);-->
  <!--ticker.SetCurrencySign ('￥');-->
  <!--ticker.tick ();-->
<!--</script>-->
<style>
  #total-ticker {
    background-color: transparent;
    font-size: 40px;
    padding: 0;
    line-height: 65px;
    margin: 0;
    color: #FFF;
    font-weight:bold;
  }
  #total-ticker span{
    float: left;
    text-align: center;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    height: 40px;
    font-size: 30px;
    line-height: 42px;
    background-color: #0d7578;
    color: #ffca5d;
    margin-left: 2px;
    font-weight: 700;
    display:inline-block;
    padding:0 2px;
  }
</style>
