import { createRouter, createWebHistory } from 'vue-router';
import LogIn from '../views/authentication/LogIn.vue';
import SignUp from '../views/authentication/SignUp.vue';
import Reading from '../views/reading/ReadingView.vue';
import Settings from '../views/AccountSettings/SettingsView.vue';
import Tips from '../views/others/TipsView.vue';
import Events from '../views/dashboard/EventsView.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const routes = [
    {
      path: '/',
      redirect: '/home'
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
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/tips',
      name: 'tips',
      component: Tips
    },
    {
      path: '/events',
      name: 'events',
      component: Events
    },
        /* for unrecognized paths */
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => {'./../views/NotFound.vue'}
    }
]

const router = createRouter({
    //mode: 'history',
    history: createWebHistory(process.env.BASE_URL),
    routes
  })

//gets the current user's info from authentication
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    )
  })
}

// saglet di ko na tanda ung code
router.beforeEach(async (to, from, next) => {
  if(to.matched.some((record) => record.meta.requiresAuth)){
     if(await getCurrentUser()){
      next();
     } else {
      alert("you dont have access!");
      next('/');
     }
  } else {
    next();
  }
});

export default router