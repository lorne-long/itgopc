import {AUTH_NAME} from "@/store/types"
import master from 'components/master';//首页
let index=(resolve) => resolve(require('views/user/index'));//首页
let datum=(resolve) => resolve(require('views/user/datum'));//首页

import discount from 'views/user/discount'
let finance=(resolve) => resolve(require('views/user/finance'));//首页
let log=(resolve) => resolve(require('views/user/log'));//首页
let message=(resolve) => resolve(require('views/common/message'));//首页
let security=(resolve) => resolve(require('views/user/security'));//首页

export default [
  {
    path:"/user",
    name:'user',
    component:master,
    redirect:"/user/index",
    meta:{
      auth:[AUTH_NAME.USER]
    },
    children:[
      {
        path:"index",
        name:"user_index",
        component:index
      },{
        path:"datum",
        name:"user_datum",
        component:datum
      },{
        path:"discount",
        name:"user_discount",
        component:discount,
        redirect:"/user/discount/experience",
        children:[
          {path:"experience",component(resolve){return resolve(require('views/user/discount/components/experience-gold'))}},
          {path:"savesend",component(resolve){return resolve(require('views/user/discount/components/save-send'))}},
          {path:"washcode",component(resolve){return resolve(require('views/user/discount/components/wash-code'))}},
          {path:"coupon",component(resolve){return resolve(require('views/user/discount/components/discount-code'))   } },
          {path:"help",component(resolve){return resolve(require('views/user/discount/components//help-gold'))}},
          {path:"vip",component(resolve){return resolve(require('views/user/discount/components/vip-gold'))}},
          {path:"birthday",component(resolve){return resolve(require('views/user/discount/components/birthday-gold'))}},
          {path:"recommend",component(resolve){return resolve(require('views/user/discount/components/recommend-firend'))}}
        ]
      },{
        path:"finance",
        name:"user_finance",
        component:finance
      },{
        path:"log",
        name:"user_log",
        component:log
      },{
        path:"message",
        name:"user_message",
        component:message
      },{
        path:"security",
        name:"user_security",
        component:security
      }
    ]
  }
]
