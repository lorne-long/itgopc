import agent from './agent';
import user from './user';
import common from './common';
import {AUTH_NAME} from "@/store/types"//权限名称
let index = (resolve) => resolve(require('views/show/index'));//首页
let history = (resolve) => resolve(require('views/show/history'));
let preferential = (resolve) => resolve(require('views/show/preferential'));
let slotgame = (resolve) => resolve(require('views/show/slotgame'));
let promo = (resolve) => resolve(require('views/show/promo'));

let agentarea = require('views/show/agent-area');
let agentarea_joinplan = (resolve) => resolve(require('views/show/agent-area/components/join-plan'));
let agentarea_applicationprocess = (resolve) => resolve(require('views/show/agent-area/components/application-process'));
let agentarea_brandadvantage = (resolve) => resolve(require('views/show/agent-area/components/brand-advantage'));
let agentarea_commonproblems = (resolve) => resolve(require('views/show/agent-area/components/common-problems'));


let aboutUs = require('views/show/about-us');
let aboutUs_aboutus = (resolve) => resolve(require('views/show/about-us/components/about-us'));
let aboutUs_question = (resolve) => resolve(require('views/show/about-us/components/question'));
let aboutUs_contactus = (resolve) => resolve(require('views/show/about-us/components/contact-us'));
let aboutUs_agreement = (resolve) => resolve(require('views/show/about-us/components/agreement'));
let aboutUs_duty = (resolve) => resolve(require('views/show/about-us/components/duty'));

export default [
  {
    path: "/index",
    name: "index",
    component: index
  },
  {
    path: "/promo",
    name: "promo",
    component: promo
  },
  {
    path: "/slotgame/:type?",
    name: "slotgame",
    component: slotgame
  },
  {
    path: "/agentarea", //代理专区
    name: "agentarea",
    component: agentarea,
    redirect: "/agentarea/joinplan",
    children: [
      {
        path: "joinplan",//加盟计划
        component: agentarea_joinplan
      },
      {
        path: "brandadvantage", //品牌优势
        component: agentarea_brandadvantage
      },
      {
        path: "commonproblems",//常见问题
        component: agentarea_commonproblems
      },
      {
        path: "applicationprocess",//申请流程
        component: agentarea_applicationprocess
      }
    ]
  },
  {
    path: "/aboutus",
    name: "aboutUs",
    component: aboutUs,
    redirect: "/aboutUs/aboutus",
    children: [
      {
        path: "aboutus",
        component: aboutUs_aboutus
      },{
        path: "question",
        component: aboutUs_question
      }, {
        path: "contactus",
        component: aboutUs_contactus
      }, {
        path: "agreement",
        component: aboutUs_agreement
      },{
        path: "duty",
        component: aboutUs_duty
      },
    ]
  },
  ...agent,
  ...user,
  ...common,
  {
    path: "/",
    redirect: "/index"
  }
]
