import { createRouter, createWebHistory } from 'vue-router';
import LogIn from '../views/authentication/LogIn.vue';
import Reading from '../views/authentication/ReadingView.vue'

const routes = [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LogIn
    },
    {
      path: '/reading',
      name: 'reading',
      component: Reading
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })

export default router