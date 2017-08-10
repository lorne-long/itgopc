<template>
  <div class="games">
    <div class="container">
      <div class="games-menu">
        <router-link :to="{name:'slotgame',params:{type:'PT'}}">
          <span>PT 老虎机</span><img src="static/images/icon/slot-logo-1.png">
        </router-link>
        <router-link :to="{name:'slotgame',params:{type:'DT'}}">
          <span>DT 老虎机</span><img src="static/images/icon/slot-logo-2.png">
        </router-link>
        <router-link :to="{name:'slotgame',params:{type:'MGS'}}">
        <span>MG 老虎机</span><img src="static/images/icon/slot-logo-3.png">
        </router-link>
        <router-link :to="{name:'slotgame',params:{type:'NT'}}">
          <span>NT 老虎机</span><img src="static/images/icon/slot-logo-4.png">
        </router-link>
        <router-link :to="{name:'slotgame',params:{type:'QT'}}">
          <span>QT 老虎机</span><img src="static/images/icon/slot-logo-5.png">
        </router-link>
        <router-link :to="{name:'slotgame',params:{type:'TTG'}}">
          <span>TTG 老虎机</span><img src="static/images/icon/slot-logo-6.png">
        </router-link>
      </div>
      <div class="games-main">
        <div class="clearfix">
          <v-filter  @search="search"></v-filter>
          <div class="search-form fr">
            <fliter-input :data="allGames"
            @search="searchInput"  @item="selectClk"
            ></fliter-input>
            <div>共有（<span class="green">{{fillterData.length}}</span>）款游戏  </div>
          </div>
        </div>
        <loadding v-show="!showloadding">正在查询数据</loadding>
        <dada-list v-model="showloadding" :data="fillterData" :statusData="statusData">
        </dada-list>
      </div>
    </div>
  </div>
</template>
<script>

  import  vFilter from "./components/fliter"
  import  dadaList from "./components/dada-list"
  import  fliterInput from "./components/fliter-input"
  import  loadding from "components/loadding"
  import  {getAllGames} from "api/show"
  import  {queryGameStatus} from "api/user"
  import Vue from 'vue'
  //判断线条的方法
  function lineIncludes(rang,val){
    val=parseInt(val);
    var r=rang.split('-'),
      start=parseInt(r[0]),
      end=r[1]||'';
    if(end){
      if(start<=val&&val<=end){
        return true;
      }
    }else{
      if(start<=val){
        return true;
      }
    }
    return false;
  }
  export default {
    data() {
      return {
        showloadding:false,//加载中... 相反的 false=显示
        showNoData:false,//是否显示空数据
        allGames:[],//所有的数据
        fillterData:[], //过滤后 的数据
        filter:{ //过滤条件
          category:'', //老虎机平台类型
          type:'',  //老虎机类型 :经典,电动吃角子
          line:'', // 老虎机线性类型
          subType:'', // 第二种类型类型
          tag:'' //热门 最新等
        },
        statusData:[]
      };
    },
    watch:{
      "islogin"(val){
        val&&this.queryGameStatus();
      },
      "$route"(val){
        this.filter.category=val.params.type
        this.search();
      },
      islogin(val){
        if(val){
          this.queryGameStatus()
        }
      }
    },
    methods:{
      selectClk(item){ //下拉框点击事件
        this.showNoData=false;
        this.fillterData=[item];
      },
      notFound(){ //未找到游戏
        this.showNoData=true;
        let hotData=this.allGames.filter(item=>{
          return (item.pic!="")&&item.tag.includes("HOT");
        })
        for(let x=0; x<4; x++){//随机推荐四款热门游戏
          let random=Math.floor(Math.random()*hotData.length-1)
          this.fillterData.push(hotData.splice(random,1)[0])
        }
      },
      search(filter,val){ //过滤数据
        this.showNoData=this.showloadding=false;//显示查询中 //关闭无数据
        if(filter)this.filter[filter]=val; //如果有 赛选的条件 设置一下
        let {tag,category,line}=this.filter; //提前拿出筛选条件
        this.fillterData=this.allGames.filter(item=>{  //过滤数据
          return (category==""||item.category.includes(category)) //平台
            &&(tag==""||item.tag.includes(tag))//热门
            &&(line==""||lineIncludes(line,item.line)) //线
        });
        !this.fillterData.length&&this.notFound(); //如果没有数据...
        setTimeout(()=>{
          this.showloadding=true;//关闭 查询中...
        },0)
      },
      searchInput(val,games){ //val input的值  games下拉框的所有数据
        if(val=="")return;//没有数据不查询
        this.showNoData=this.showloadding=false; //显示查询中 //关闭无数据
        this.fillterData=games; //设置 数据
        !this.fillterData.length&&this.notFound(); //如果没有数据...
        this.showloadding=true; //关闭 查询中...
      },
      queryGameStatus(){ //查询用户收藏状态
        queryGameStatus().then(res=>{
          if(res.success){
            this.statusData=res.data.gameList?JSON.parse(res.data.gameList):[];
          }
        })
      }
    },
    computed:{
      islogin(){
        return  this.$store.getters.islogin;
      }
    },
    created(){
      if(this.$route.params.type){
        this.filter.category=this.$route.params.type;
      }
      getAllGames().then((arr)=>{
        arr.forEach(item=>{
          this.allGames.push(...item.data);
        })
        this.fillterData=this.allGames
        this.search();
      });
    },
    components:{
      vFilter,loadding,dadaList,fliterInput
    }
  };
</script>
<style>

</style>
