import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect:'/pic'
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
