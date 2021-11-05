import { createRouter, createWebHistory } from 'vue-router'

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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router


// {
//   path: '/',
//   name: 'Home',
//   component: Home
// },
