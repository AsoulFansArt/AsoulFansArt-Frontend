import {createRouter, createWebHistory} from 'vue-router'
import Space from "../views/account/Space";
import PicDetail from "../views/PicDetail";

const routes = [
  {
    path: '/',
    name:'MainPage',
    component:() => import('../views/MainPage')
  },
  {

    path: '/video',
    name:'Video',
    component:() => import('../views/Video')
  },
  {
    path: '/submit',
    name:'Submit',
    component:() => import('../views/Submit')
  },
  {
    path: '/pic',
    name:'Pic',
    component:() => import('../views/Pic')
  },
  {
    path: '/meme',
    name:'Meme',
    component:() => import('../views/Meme')
  },
  {
    path: '/article',
    name:'Article',
    component:() => import('../views/Article')
  },
  {
    path:'/space/:uid',
    component:Space,
    props:true
  },
  {
    path:'/pic/:dyid',
    component:() => import('../views/PicDetail'),
    props:true
  },
  {
    path: '/asoul/history',
    name:'AsoulHistory',
    component:() => import('../views/AsoulHistory.vue')
  },
  {
    path: '/fans/medal',
    name:'FansMedal',
    component:() => import('../views/FansMedal.vue')
  },
]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
})

export default router