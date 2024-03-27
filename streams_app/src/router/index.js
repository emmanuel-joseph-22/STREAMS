import { createRouter, createWebHistory } from 'vue-router';
import LogIn from '../views/authentication/LogIn.vue';
import SignUp from '../views/authentication/SignUp.vue';
import Reading from '../views/ReadingView.vue';


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
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/home',
      name: 'dashboard',
      component: () => import('../views/dashboard/DashboardView.vue')
    },
    {
      path: '/report',
      name: 'report',
      component: () => import('../views/dashboard/ReportView.vue')
    },
    {
      path: '/map',
      name: 'campus_map',
      component: () => import('../views/dashboard/CampusMapView.vue')
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