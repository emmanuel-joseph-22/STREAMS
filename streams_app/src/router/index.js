import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '../views/authentication/LogIn.vue'
import HomeView from '../views/HomeView.vue'
import LogIn from '../views/authentication/LogIn.vue'

const router =createRouter({
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes : [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: LogIn
    }
  ]
})


export default router
