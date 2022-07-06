import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import UserView from '../views/UserView.vue'
// import RatingView from '../views/RatingView.vue'
import Fof from '../views/Fof.vue'
// import ThankView from '../views/ThankView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView
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
      component: LoginView
    },
    {
      path: '/user',
      name: 'user',
      component: UserView
    },
    {
      // path: '/rating/:id',
      path: '/rating/',
      component: () => import('../views/RatingView.vue')
    },
    {
      path: '/404',
      name: 'fof',
      component: Fof
    },
    {
      path: '/thank',
      name: 'thank',
      component: () => import('../views/ThankView.vue')
    }
  ]
})

export default router
