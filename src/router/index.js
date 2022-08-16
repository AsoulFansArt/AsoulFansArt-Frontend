import {createRouter, createWebHistory} from 'vue-router'
import Space from "../views/account/Space";
import PicDetail from "../views/PicDetail";

const routes = [
  {
    path: '/',
    name:'MainPage',
    component:() => import('../views/MainPage'),
    meta:{
      title: "Asoul Fan Art - 一个魂的二创"
    }
  },
  {

    path: '/video',
    name:'Video',
    component:() => import('../views/Video'),
    meta:{
      title: "Asoul Fan Art - 二创视频"
    }
  },
  {
    path: '/submit',
    name:'Submit',
    component:() => import('../views/Submit'),
    meta:{
      title: "Asoul Fan Art - 提交作品"
    }
  },
  {
    path: '/pic',
    name:'Pic',
    component:() => import('../views/Pic'),
    meta:{
      title: "Asoul Fan Art - 二创图片"
    }
  },
  {
    path: '/article',
    name:'Article',
    component:() => import('../views/Article'),
    meta:{
      title: "Asoul Fan Art - 二创专栏"
    }
  },
  {
    path:'/space/:uid',
    component:Space,
    props:true,
    meta:{
      title: "Asoul Fan Art - 个人中心"
    }
  },
  {
    path:'/pic/:dyid',
    component:() => import('../views/PicDetail'),
    props:true,
    meta:{
      title: "Asoul Fan Art - 图片详情"
    }
  },
  {
    path: '/asoul/history',
    name:'AsoulHistory',
    component:() => import('../views/AsoulHistory.vue'),
    meta:{
      title: "Asoul Fan Art - 5.10节奏时间线"
    }
  },
  {
    path: '/fans/medal',
    name:'FansMedal',
    component:() => import('../views/FansMedal.vue'),
    meta:{
      title: "Asoul Fan Art - 粉丝团统计"
    }
  },
]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})


export default router