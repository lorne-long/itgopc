import agent from './agent';
import user from './user';
import common from './common';
import {AUTH_NAME} from "@/store/types"//权限名称
let index=(resolve) => resolve(require('views/show/index'));//首页
let history=(resolve) => resolve(require('views/show/history'));
let preferential=(resolve) => resolve(require('views/show/preferential'));
let slotgame=(resolve) => resolve(require('views/show/slotgame'));
export default [
  {
    path:"/index",
    name:"index",
    component:index
  },
  {
    path:"/slotgame/:type?",
    name:"slotgame",
    component:slotgame
  },
  ...agent,
  ...user,
  ...common,
  {
    path:"/",
    redirect:"/index"
  }
]
