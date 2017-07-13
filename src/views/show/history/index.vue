<template>
  <div id="page_content" class="flex_1">
    <div class="history_content_wrap">
      <select id="years" class="without_style with_arrow history_select">
        <option value="all">所有年份</option>
        <option value="2017">2017年</option>
        <option value="2016">2016年</option>
      </select>
      <div class="history_item_list">
        <div class="history_item 2017">
          <a href="static/brand/power_f1.html?v=1">
            <div class="time_stamp icon_with_text"><span class="icon icon_time"></span><span>2017全年</span></div>
            <div class="history_content box_border_box">
              <img src="static/images/history/img04.jpg">
              <span class="history_text box_border_box">全年赞助撒哈拉印度力量F1车队</span>
            </div>
          </a>
        </div>
        <div class="history_item 2016">
          <div class="time_stamp icon_with_text"><span class="icon icon_time"></span><span>10月21日</span></div>
          <div class="history_content box_border_box">
            <img src="static/images/history/img01.jpg">
            <span class="history_text box_border_box">赞助WBO世界拳王争霸赛</span>
          </div>
        </div>
        <div class="history_item 2016">
          <div class="time_stamp icon_with_text"><span class="icon icon_time"></span><span>10月6日</span></div>
          <div class="history_content box_border_box">
            <img src="static/images/history/img02.jpg">
            <span class="history_text box_border_box">取款升级 单日可提1000万</span>
          </div>
        </div>
        <div class="history_item 2016">
          <div class="time_stamp icon_with_text"><span class="icon icon_time"></span><span>9月19日</span></div>
          <div class="history_content box_border_box">
            <img src="static/images/history/img03.jpg">
            <span class="history_text box_border_box">利来国际爱心包裹慈善捐赠</span>
          </div>
        </div>
      </div>
    </div>
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
<style>
</style>
