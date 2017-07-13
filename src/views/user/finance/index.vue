<template>
  <div class="content-main finance">
    <div id="page-deposit" class="tab-panel active">
      <h3 class="other u-tab-bd">第三方存款</h3>
      <div  id="j-paymentContainer" class="form ">

          <p>
            <label>存款账号：</label>
            <input type="text" placeholder="存款账号" />
          </p>
          <p>
            <label>存款金额：</label>
            <input type="text" placeholder="存款金额" />
          </p>
          <p>
            <label>存款姓名：</label>
            <input type="text" placeholder="存款姓名" />
          </p>
          <p>
            <label>银行名称：</label>
            <input type="text" placeholder="银行名称" />
          </p>
          <p>
            <label>联系电话：</label>
            <input type="text" placeholder="联系电话" />
          </p>
          <p>
            <label>&nbsp;</label>
            <button type="submit" class="btn-submit" > 提交</button>
            <button type="reset" class="btn-reset" >重置</button>
          </p>
      </div>
      <h3 class="other u-tab-bd">
        转账汇款<small class="cl-yl">(温馨提示：您可以使用支付宝转账到银行收款账号进行存款！)</small></h3>
      <table class="transfer-log"  id="example">
        <tbody>

        </tbody>
      </table>
    </div>
    <div id="page-withdraw" class="withdraw tab-panel">
      <div>
        <h3 class="fl top-one">取款</h3>
        <div class="u-money-total">
          主账户余额：<span class="cl-yl j-credit">${session.customer.credit}</span>元
          <div class="bm-border"></div>
        </div>
        <div id="stepOnePage" class="form">
          <form id="form-withdraw">
            <p>
              <label>主账户余额：</label>
              <input type="text" id="j-credit" value="${session.customer.credit}" readonly>
            </p>
            <p>
              <label>取款金额：</label>
              <input type="text" data-rule-digits name="amount" id="amount" placeholder="最少100元">
            </p>
            <p>
              <label>取款账号：</label>
              <select id="j-selectBank">
                <option value="">请选择银行卡</option>
              </select>
            </p>
            <p>
              <label>&nbsp;</label>
              <button type="button" data-step="1" class="btn-submit j-btn" /> 提交</button>
              <button type="reset" class="btn-reset" />重置</button>
            </p>
          </form>
        </div>
        <div id="stepTwoPage" class="form" style="display:none">
          <p class="inputbox" style="padding-left: 123px;line-height: 39px;" id="j-paymentInfo">

          </p>
          <div class="inputbox">
            <span class="label">支付密码：</span>
            <input type="password" name="password" id="payPwd" placeholder="支付密码是由6位纯数字组成的">
          </div>
          <p>
            <label>&nbsp;</label>
            <button type="button" data-step="2" class="btn-submit j-btn" />确定</button>
          </p>
        </div>

        <div id="stepThreePage" class="form" style="display:none">
          <div class="orangebox wt">
            <p class="txt1"><span class="lightgrey font16">取款金额：</span> <span class="font22 j-balance"></span></p>
            <p class="txt1"><span class="grey font16">工作人员正在为您处理，如果您的各项资料正确，<br/>取款金额会在1小时内到达您的绑定银行账户。</span></p>
            <div class="clear"></div>
            <a href="/t4/user/log.jsp" class="formbtn">查看取款记录</a>
          </div>
        </div>
        <div id="page-setpaypwd" style="display: none;">
          <div class="modifypassword">

            <form id="form-setPayPwd" class="form">
              <h1 style="    text-align: center;margin: 20px 0 51px 0;font-size: 20px;color: #0d7578;">设置支付密码</h1>
              <div class="inputbox">
                <span class="label">登录密码：</span>
                <input type="password" name="loginPwd"  placeholder="请输入您的登录密码" class="eyecheck">
                <span href="javascript:;"  class="showpwd eyeclose"></span>
              </div>
              <div class="inputbox">
                <span class="label">支付密码：</span>
                <input type="password" name="withdrawPwd"  placeholder="请设置6位支付密码，由纯数字组成" class="eyecheck" maxlength="6">
                <span href="javascript:;"  class="showpwd eyeclose"></span>
              </div>
              <div class="inputbox"><span class="label">&nbsp;</span>
                <button type="submit" class="formbtn">
                  确定
                </button>
              </div>

            </form><!-- formbox -->
          </div>
        </div>
      </div>
    </div>
    <div id="page-transfer" class="tab-panel transfer ">
      <h3 class="fl">转账</h3>
      <div class="tab-menu-two">
        <a href="javascript:void(0);" class="active">转入主账户
          <div class="bm-border"></div>
        </a>
        <a href="javascript:void(0);">转入游戏账户
          <div class="bm-border"></div>
        </a>
      </div>
      <div class="form">
        <form>
          <p>
            <label>主账户：</label>
            <input type="text" id="acount_to_main" readonly value="${session.customer.credit}">
          </p>
          <p>
            <label>游戏账户：</label>
            <select id="transferGameOut" onChange="getGameMoney(this.value,this);">
              <option value="" selected="selected">选择游戏平台</option>
              <option value="PT">PT账户</option>
              <option value="DT">DT账户</option>
              <option value="MG">MG账户</option>
              <option value="QT">QT账户</option>
              <option value="TTG">TTG账户</option>
              <option value="NT">NT账户</option>
              <!-- <option value="AGIN">捕鱼账户</option> -->
            </select>
          </p>
          <p>
            <label>转入金额：</label>
            <input type="text" id="transferGameMoney_to_main" placeholder="请输入转账金额">
          </p>
          <p>
            <label>&nbsp;</label>
            <a type="button" class="btn-submit" onClick="transferMonery(1);" />提交</a>
            <!--<button type="reset" class="btn-reset" />重置</button>-->
          </p>

        </form>
      </div>
      <div class="form none">
        <form>
          <p>
            <label>主账户：</label>
            <input type="text" class="acount_to_main" readonly value="${session.customer.credit}">
          </p>
          <p>
            <label>游戏账户：</label>

            <select id="transferGameIn" onChange="getGameMoney(this.value,this);">
              <option value="" selected="selected">选择游戏平台</option>
              <option value="PT">PT账户</option>
              <option value="DT">DT账户</option>
              <option value="MG">MG账户</option>
              <option value="QT">QT账户</option>
              <option value="TTG">TTG账户</option>
              <option value="NT">NT账户</option>
              <!--<option value="AGIN">捕鱼账户</option>-->
            </select>

          </p>

          <p>
            <label>转出金额：</label>
            <input type="text" id="transferGameMoney_to_game" placeholder="请输入转账金额">
          </p>
          <p>
            <label>&nbsp;</label>
            <a class="btn-submit" onClick="transferMonery(1);" /> 提交</a>
            <button type="reset" class="btn-reset" />重置</button>
          </p>
        </form>
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
