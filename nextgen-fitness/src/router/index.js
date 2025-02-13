import { createRouter, createWebHistory } from 'vue-router';
import LogIn from '../views/LogIn.vue';
import Home from '../views/Home.vue';
import Clients from '../views/jobs/Clients.vue';
import NotFound from '../views/NotFound.vue';
import NewUser from '../views/NewUser.vue';
import AddMeal from '../views/AddMeal.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LogIn,
    props: true
  },
  {
    path: '/newuser',
    name: 'newuser',
    component: NewUser,
    props:true
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    props: route => ({ //this allows you to pass objects from route params
      username: route.params.username,
      isCoach: route.params.isCoach,
      coach: route.params.coach
    })
  },
  {
    path: '/addmeal',
    name: 'addmeal',
    component: AddMeal,
    props: route => ({
      username: route.params.username,
      isCoach: route.params.isCoach,
      coach: route.params.coach
    })
  },
  {
    path: '/clients',
    name: 'clients',
    component: Clients
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

