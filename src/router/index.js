import { createRouter, createWebHistory } from 'vue-router'
// layout
import MainLayout from '@/layouts/MainLayout.vue'
import LoginLayout from '@/layouts/LoginLayout.vue'
// View
import HomeView from '@/views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'
import AboutView from '@/views/AboutView.vue'
// Auth
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
// Data
import UsersView from '@/views/Users/Index.vue'
import UserCreateView from '@/views/Users/Create.vue'
import UserEditView from '@/views/Users/Edit.vue'

// MIDDLEWARE
import Authentication from '@/middlewares/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      meta: { requiresAuth: true },
      beforeEnter: Authentication,
      children: [
        {
          path: 'home',
          name: 'home',
          component: HomeView,
          meta: { requiresAuth: false },
          beforeEnter: Authentication
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: DashboardView,
          meta: { requiresAuth: true },
          beforeEnter: Authentication
        },
        {
          path: 'about',
          name: 'about',
          component: AboutView,
        },
        {
          path: '/users',
          meta: { requiresAuth: true },
          beforeEnter: Authentication,
          children: [
            {
              path: '',
              name: 'users.index',
              component: UsersView
            },
            {
              path: 'create',
              name: 'user.create',
              component: UserCreateView
            },
            {
              path: 'edit/:id',
              name: 'user.edit',
              component: UserEditView,
              props: true,
            },
          ]
        },
      ]
    },
    {
      path: '/',
      component: LoginLayout,
      children: [
        {
          path: 'login',
          name: 'login',
          component: LoginView,
          meta: { requiresAuth: false },
          beforeEnter: Authentication
        },
        {
          path: 'register',
          name: 'registerlogin',
          component: RegisterView,
          meta: { requiresAuth: false },
          beforeEnter: Authentication
        },
      ]
    },
  ]
})

export default router
