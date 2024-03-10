import { createRouter, createWebHistory } from 'vue-router';
import LogIn from '../views/authentication/LogIn.vue';

const routes = [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LogIn
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })

export default router