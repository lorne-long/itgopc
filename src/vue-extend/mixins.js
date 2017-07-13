import Vue from 'vue'


import {mapGetters} from 'vuex'
// import {getQTGame,gameH5MGS,loginDT,getNTGame,mobileGameAgFish,gamePNGMobile} from 'api/show'

export let games={
  data() {
    return {
      NoTry:["AG","PT"],  //不能试玩
      loginDT:"",
      getNTGame:"",
    }
  },
  methods:{
    getImg(item){
      return ` http://staticserverhost.com/games/images/${item.category.toLowerCase()}games/${item.pic}`;
    },
    tryGame(item){
      let _tmp='',$href=window.location.href
      switch(item.category){
        case 'PT':
          _tmp=`http://cachedownload.goldenrose88.com/flash/7/launchcasino.html?mode=offline&affiliates=1&language=zh-cn&game=${item.id}`;
          break;
        case 'QT':
          this.getQTGame(item,1)
          return;
        case 'NT':
          _tmp=`http://load.sdjdlc.com/nt/demo.html?game=${item.id}&language=cn&lobbyUrl=${$href}`;
          break;
        case 'DT':
          _tmp=`http://play.dreamtech8.com/playSlot.aspx?gameCode=${item.id}&isfun=1&type=dt&closeUrl=${$href}`;
          break;
        case 'MGS':
          _tmp=`https://mobile22.gameassists.co.uk/MobileWebServices_40/casino/game/launch/LILAI/${item.id}/zh-cn?loginType=VanguardSessionToken&isPracticePlay=true&casinoId=2712&isRGI=true&authToken=&lobbyurl=${$href}`
          break;
        case 'PNG':
          _tmp=`https://bsicw.playngonetwork.com/casino/PlayMobile?pid=${item.code}&gid=${item.id}&lang=zh_CN&practice=1`;
          break;
      }
      window.location.href=_tmp;
    },
    playGame(item){
      if(!this.islogin) return toast("请先进行登录");
      switch(item.category){
        case 'PT':
          window.location.href=`/mobi/ptH5Login.php?gameCode=${item.id}`
          /*var type='ngm';
           if(GameConfig.ptToken == ''){
           //window.location = "http://w8ikychrt.com/pth5loading.jsp?username=" + GameConfig.userName + "&type=" + type + "&game=" + item.id + "&baseUrl=" + GameConfig.baseUrl ;
           window.location = "http://w8ikychrt.com/pth5loading.jsp?type=" + type + "&game=" + item.id + "&baseUrl=" + GameConfig.baseUrl ;
           }else{
           window.location='http://hub.ms226388.com/hosting/hosting.html?gameClientUrl=http://m.ms226388.com/casino/games/casinoclient.html&gameId=' + item.id + '&real=1&gamePlatform=NGM&username=' + GameConfig.userName + '&lang=zh-cn&tempToken=' + GameConfig.ptToken + '&lobbyPage=' + GameConfig.baseUrl + '/mobile/ptlobby.jsp' + '&supportPage=' + GameConfig.baseUrl + '/mobile/ptlobby.jsp' + '&logoutPage=' + GameConfig.baseUrl + '/mobile/index.jsp';
           }*/
          break;
        case 'MGS':
          var currentUrl=window.location.href;
          gameH5MGS({gameCode:item.id,isfun:0,lobby:currentUrl}).then(res=>{
            if(res.success){
              window.location.href=res.data.url;
            }else{
              toast(res.message);
            }
          })
          break;
        case 'DT':
          if(this.loginDT==""){
            loginDT().then(res=>{
              if(res.success){
                this.loginDT=res.data;
                window.location.href=`${this.loginDT.url}?slotKey=${this.loginDT.key}&language=zh-cn&gameCode=${item.id}&isfun=0&closeUrl=${this.loginDT.referWebsite}`;
              }else{
                toast(res.message)
                this.loginDT="";
              }
            }).catch(re=>{
              toast("请重新尝试")
              this.loginDT="";
            })
          }else{
            window.location.href=`${this.loginDT.url}?slotKey=${this.loginDT.key}&language=zh-cn&gameCode=${item.id}&isfun=0&closeUrl=${this.loginDT.referWebsite}`;
          }
          break;
        case 'QT':
          this.getQTGame(this.curItem,0)
          break;
        case 'NT':
          if(this.getNTGame==""){
            getNTGame().then(res=>{
              if(res.success){
                this.getNTGame=res.data;
                //                  window.location.href=`${this.getNTGame.url}?slotKey=${this.getNTGame.key}&language=zh-cn&gameCode=${item.id}&isfun=0&closeUrl=${this.getNTGame.referWebsite}`;
              }else{
                toast(res.message)
                this.getNTGame="";
              }
            }).catch(re=>{
              toast("请重新尝试")
              this.getNTGame="";
            })
          }else{
            window.location.href=`${this.getNTGame.url}?slotKey=${this.getNTGame.key}&language=zh-cn&gameCode=${item.id}&isfun=0&closeUrl=${this.getNTGame.referWebsite}`;
          }
          break;
        case 'PNG':
          gamePNGMobile({practice:0,gameCode:this.curItem.id}).then(res=>{
            if(res.success){
              window.location.href = res.data.url;
            }else{
              toast(res.message);
            }
          });
          break;
        case 'AG':
          mobileGameAgFish().then(res=>{
            if(res.success){
              window.location.href=res.data;
            }else{
              toast(res.message);
            }
          })
          break;
      }
    },
    getQTGame(item,isfun){
      //isfun 1 试玩 0真玩
      getQTGame({isfun:isfun,gameType:"qtGames",gameCode:item.id,origin:window.location.href}).then(res=>{
        if(res.success){
          window.location.href=res.data.url;
        }else{
          toast(res.message)
        }
      })
    }
  },
  computed:{
    ...mapGetters(["islogin"])
  }
};
