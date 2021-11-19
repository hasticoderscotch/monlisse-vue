import { createRouter, createWebHistory } from 'vue-router'

// Admin

const AdminLayout = () => import('./admin/layouts/LayoutBasic.vue')

const Login = () => import('./admin/views/auth/Login.vue')
const Dashboard = () => import('./admin/views/dashboard/Index.vue')

const routes = [
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: '/',
        component: Login,
      },
      {
        path: 'login',
        name: 'login',
        component: Login,
      },
      {
        path: '/dashboard',
        component: Dashboard,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes,
})

export default router
