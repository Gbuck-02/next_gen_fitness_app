import { createRouter, createWebHistory } from 'vue-router';
import LogIn from '../views/LogIn.vue';
import Home from '../views/Home.vue';
import Clients from '../views/Clients.vue';
import NotFound from '../views/NotFound.vue';
import NewUser from '../views/NewUser.vue';
import AddMeal from '../views/AddMeal.vue';
import AddPreviousMeal from '../views/AddPreviousMeal.vue';
import EditMeal from '../views/EditMeal.vue';
import AddCoach from '../views/AddCoach.vue';
import ClientStats from '../views/ClientStats.vue';
import ClientEdit from '../views/ClientEdit.vue';

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
    path: '/addold',
    name: 'addold',
    component: AddPreviousMeal,
    props: route => ({
      username: route.params.username,
      isCoach: route.params.isCoach,
      coach: route.params.coach
    })
  },
  {
    path: '/editmeal',
    name: 'editmeal',
    component: EditMeal,
    props: route => ({
      username: route.params.username,
      isCoach: route.params.isCoach,
      coach: route.params.coach,
      date: route.params.date,
      meal: route.query.meal
    })
  },
  {
    path: '/clients',
    name: 'clients',
    component: Clients,
    props: route => ({
      username: route.params.username,
      isCoach: route.params.isCoach,
      coach: route.params.coach
    })
  },
  {
    path: '/addcoach',
    name: 'addcoach',
    component: AddCoach,
    props: route => ({
      username: route.params.username,
      isCoach: route.params.isCoach,
      coach: route.params.coach
    })
  },
  {
    path: '/clientstats',
    name: 'clientstats',
    component: ClientStats,
    props: route => ({
      username: route.params.username,
      isCoach: route.params.isCoach,
      coach: route.params.coach
    })
  },
  {
    path: '/editmealclient',
    name: 'editmealclient',
    component: ClientEdit,
    props: route => ({
      username: route.params.username,
      isCoach: route.params.isCoach,
      coach: route.params.coach
    })
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

