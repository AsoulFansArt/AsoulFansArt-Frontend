import {createRouter, createWebHistory} from 'vue-router'
import Space from "../views/account/Space";

const routes = [
  {
    path: '/',
    name:'MainPage',
    component:() => import('../views/MainPage')
  },
  {

    path: '/qa',
    name:'QA',
    component:() => import('../views/QA')
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
    path:'/new',
    name:'New',
    component:() => import('../views/New')
  },
  {
    path:'/space/:uid',
    component:Space,
    props:true
  }
]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
})

export default router


// {
//   path: '/',
//   name: 'Home',
//   component: Home
// },
