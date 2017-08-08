import Vue from 'vue'


import {mapGetters,mapMutations} from 'vuex'
// import {getQTGame,gameH5MGS,loginDT,getNTGame,mobileGameAgFish,gamePNGMobile} from 'api/show'

import {loginNTInfo,loginDTInfo,loginTTGInfo} from "api/show";

export let games={
  data() {
    return {
      State:['DEM']//这个状态 只能试玩
    }
  },
  methods:{
    ...mapMutations(["SHOW_LOGIN"]),
    getImg(item){ // 图片连接
      return `http://staticserverhost.com/games/images/${item.category.toLowerCase()}games/${item.pic}`;
    },
    showTry(){
      return obj.state=='PLA'?false:true;
    },
    showPlay(obj){
      return obj.state=='DEM'?false:true;
    },
    tryGame(obj,e){ //试玩连接
      if(obj.state=='PLA')return toast("此游戏不能试玩");    //PLA状态 不能试玩
      switch(obj.category){
        case 'PT':
          return e.target.href=`http://cachedownload.morningstar88.com/casinoclient.html?mode=offline&affiliates=1&language=zh-cn&game=${obj.id}`;
        case 'QT':
          return e.target.href=`/gameQT.php?gameCode=${obj.id}&isfun=1&type=${obj.subType=='H5'?0:1}`;
        case 'NT':
          return e.target.href=`http://load.sdjdlc.com/nt/demo.html?game=${obj.id}&language=en`;
        case 'TTG':
          return e.target.href=`http://pff.ttms.co/casino/generic/game/game.html?gameSuite=flash&gameName=${obj.code}&lang=zh-cn&playerHandle=999999&gameId=${obj.id}&account=FunAcct`;
        case 'TTG-MG':
          return e.target.href=`http://pff.ttms.co/casino/generic/game/game.html?gameSuite=flash&gameName=${obj.code}&lang=zh-cn&playerHandle=999999&gameId=${obj.id}&account=FunAcct`;
        case 'DT':
          return e.target.href=`http://play.dreamtech8.com/playSlot.aspx?gameCode=${obj.id}&isfun=1&type=dt&language=zh_CN`;
        case 'MGS':
        return e.target.href=obj.subType=='H5'?`https://mobile22.gameassists.co.uk/MobileWebServices_40/casino/game/launch/UFAcom/${obj.id}/zh?loginType=VanguardSessionToken&isPracticePlay=true&casinoId=2712&isRGI=true&authToken=&lobbyurl=/gamePt.php?showtype=MGS`
              :`http://redirector3.valueactive.eu/Casino/Default.aspx?applicationid=1024&theme=quickfire&usertype=5&sext1=demo&sext2=demo&csid=2712&serverid=2712&variant=TNG&ul=zh&gameid=${obj.id}`;
        case 'PNG':
          return e.target.href=`/gamePNGFlash.aspx?practice=1&gameCode=${obj.id}`;
        default:
          return "";
      }
    },
    playGame(obj,e){ //真玩 游戏
      if(obj.state=='DEM') return toast("此游戏只能试玩");    //DEM状态 不能真玩
      switch (obj.category){
        case 'PT': //
          return  e.target.href=`/loginGame.php?gameCode=${obj.id}`;
        case 'QT': //
          return e.target.href=`/gameQT.php?gameCode=${obj.id}&isfun=0&type=${obj.subType=='H5'?'0':'1'}`;
        case 'NT':
          if(/^http/.test(e.target.href)){return;}
          if(!this.islogin){return this.SHOW_LOGIN(true)}
          loginNTInfo({v:Math.random()}).then(res=>{
            if(res.success){
              var popup = window.open('about:blank', '_blank');
              popup.location=`http://load.sdjdlc.com/nt/?game=${obj.id}&key=${res.data.nt_session}&language=cn`;
            }else {
              toast(res.message)
            }
          })
          return 'javascript:;';
        case 'TTG':
          if(/^http/.test(e.target.href)){return;}
          if(!this.islogin){return this.SHOW_LOGIN(true)}
          loginTTGInfo({v:Math.random()}).then(res=>{
            if(res.success){
              var popup = window.open('about:blank', '_blank');
              e.target.href=popup.location=`https://ams-games.ttms.co/casino/generic/game/game.html?playerHandle=${res.data.nt_session}&account=CNY&gameName=${obj.code}&gameId=${obj.id}&lang=zh-cn&t=${Math.random()}`;
            }else {
              toast(res.message)
            }
          })
          return 'javascript:;';
        case 'DT':
          if(/^http/.test(e.target.href)){return;}
          if(!this.islogin){return this.SHOW_LOGIN(true)}
          loginNTInfo({v:Math.random()}).then(res=>{
            if(res.success){
              var popup = window.open('about:blank', '_blank');
              e.target.href=popup.location=`https://play.dtgame-dtweb.com/dtGames.aspx?slotKey=${res.data.nt_session}&gameCode=${obj.id}&isfun=0&clientType=0&closeUrl=${window.location.href}`;
            }else {
              toast(res.message)
            }
          })
          return 'javascript:;';
        case 'MGS':
            return e.target.href==obj.subType=='H5'
              ?`/gameMGS4H5Desktop.php?gameCode=${obj.id}&lobby=${window.location.href}`
              :`/gameMGS.php?gameCode=${obj.id}`
        default:
          return 'javascript:;'
      }
    },
    collect(item){   //收藏
      if (!this.islogin) {
        $confirm("系统检测到你未登陆...", "提示", {
          confirmText: "立刻登陆"
        }).then(() => {
          this.$router.push("/login/index");
        })
        return;
      }
      let $cur = this.statusData.findIndex(el => {
        return el.id == item.id;
      })
      if ($cur > -1) {
        this.statusData.splice($cur, 1);
      } else {
        this.statusData.unshift(item);
        this.statusData.length > 18 && this.statusData.pop()
      }
      saveOrUpdateGameStatus({gameList: JSON.stringify(this.statusData)}).then(res => {
        toast($cur > -1 ? "已取消收藏" : "收藏成功,最多收藏19个");
      }).catch(err => {
        toast("操作失败!请稍后重试");
      })
    }
  },
  computed:{
    ...mapGetters(["islogin"])
  }
};
