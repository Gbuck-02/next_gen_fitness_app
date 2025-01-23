import { createRouter, createWebHistory } from 'vue-router';
import LogIn from '../views/LogIn.vue';
import Home from '../views/Home.vue';
import Clients from '../views/jobs/Clients.vue';
import JobDetails from '../views/jobs/JobDetails.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LogIn,
    props: true
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    props: route => ({ // This allows you to pass the username and isCoach from route params
      username: route.params.username,
      isCoach: route.params.isCoach
    })
  },
  {
    path: '/clients',
    name: 'clients',
    component: Clients
  },
  {
    path: '/jobs/:id',
    name: 'JobDetails',
    component: JobDetails,
    props: true
  },
  // redirect
  {
    path: '/all-jobs',
    redirect: '/jobs'
  },
  // catch all 404
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

