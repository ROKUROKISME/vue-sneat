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
// ADMIN
import AdminView from '@/views/Admin/Index.vue'
import AdminCreateView from '@/views/Admin/Create.vue'
import AdminEditView from '@/views/Admin/Edit.vue'
// PETUGAS
import PetugasView from '@/views/Petugas/Index.vue'
import PetugasCreateView from '@/views/Petugas/Create.vue'
import PetugasEditView from '@/views/Petugas/Edit.vue'
// BARANG
import BarangView from '@/views/Barang/Index.vue'
import BarangCreateView from '@/views/Barang/Create.vue'
import BarangEditView from '@/views/Barang/Edit.vue'
// TRANSAKSI
import TransaksiView from '@/views/Transaksi/Index.vue'
// LAPORAN
import LaporanView from '@/views/Laporan/Index.vue'

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
          path: '/petugas',
          meta: { requiresAuth: true },
          beforeEnter: Authentication,
          children: [
            {
              path: '',
              name: 'petugas.index',
              component: PetugasView
            },
            {
              path: 'create',
              name: 'petugas.create',
              component: PetugasCreateView
            },
            {
              path: 'edit/:id',
              name: 'petugas.edit',
              component: PetugasEditView,
              props: true,
            },
          ]
        },
        {
          path: '/admin',
          meta: { requiresAuth: true },
          beforeEnter: Authentication,
          children: [
            {
              path: '',
              name: 'admin.index',
              component: AdminView
            },
            {
              path: 'create',
              name: 'admin.create',
              component: AdminCreateView
            },
            {
              path: 'edit/:id',
              name: 'admin.edit',
              component: AdminEditView,
              props: true,
            },
          ]
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
        {
          path: '/barang',
          meta: { requiresAuth: true },
          beforeEnter: Authentication,
          children: [
            {
              path: '',
              name: 'barang.index',
              component: BarangView
            },
            {
              path: 'create',
              name: 'barang.create',
              component: BarangCreateView
            },
            {
              path: 'edit/:id',
              name: 'barang.edit',
              component: BarangEditView,
              props: true,
            },
          ]
        },
        {
          path: '/transaksi',
          meta: { requiresAuth: true },
          beforeEnter: Authentication,
          children: [
            {
              path: '',
              name: 'transaksi.index',
              component: TransaksiView
            },
          ]
        },
        {
          path: '/laporan-transaksi',
          meta: { requiresAuth: true },
          beforeEnter: Authentication,
          children: [
            {
              path: '',
              name: 'laporan.index',
              component: LaporanView
            },
          ]
        }
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
