//代理 路由
import {AUTH_NAME} from "@/store/types"//权限名称
import master from 'components/master';//首页
let index=(resolve) => resolve(require('views/agent/index'));//首页
let ptcommission=(resolve) => resolve(require('views/agent/ptcommission'));
let subuser=(resolve) => resolve(require('views/agent/subuser'));
let platform=(resolve) => resolve(require('views/agent/platform'));
let creditlog=(resolve) => resolve(require('views/agent/creditlog'));
let profile=(resolve) => resolve(require('views/agent/profile'));
let personal=(resolve) => resolve(require('views/agent/personal'));
let message=(resolve) => resolve(require('views/common/message'));
export default [
  {
    path:"/agent",
    name:'agent',
    component:master,
    redirect:"/agent/index",
    meta:{
      auth:[AUTH_NAME.AGENT] //需要代理用户
    },
    children:[
      {
        path:"index",
        name:"agent_index",
        component:index
      },
      {
        path:"ptcommission",
        name:"agent_ptcommission",
        component:ptcommission,
        meta:{
          headName:"佣金报表"
        }
      },{
        path:"subuser",
        name:"agent_subuser",
        component:subuser,
        meta:{
          headName:"会员列表"
        }
      },{
        path:"platform",
        name:"agent_platform",
        component:platform,
        meta:{
          headName:"会员账务"
        }
      },{
        path:"creditlog",
        name:"agent_creditlog",
        component:creditlog,
        meta:{
          headName:"额度记录"
        }
      },{
        path:"profile",
        name:"agent_profile",
        component:profile,
        meta:{
          headName:"个人中心"
        }
      },{
        path:"agent_personal",
        name:"agent_personal",
        component:personal,
        meta:{
          headName:"绑定银行卡/折号"
        }
      },
      {
        path:"message",
        name:"agent_message",
        component:message,
        meta:{
          headName:"站内消息"
        }
      }
    ]
  }
]
