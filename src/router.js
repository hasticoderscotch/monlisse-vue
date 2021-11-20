import { createRouter, createWebHistory } from 'vue-router'

// Admin

const AdminLayoutLogin = () => import('./admin/layouts/LayoutLogin.vue')
const AdminLayoutBasic = () => import('./admin/layouts/LayoutBasic.vue')

// Login

const Login = () => import('./admin/views/auth/Login.vue')

// Dashboard
const Dashboard = () => import('./admin/views/dashboard/Index.vue')

// Category

const CategoryIndex = () => import('./admin/views/category/Index.vue')
const CategoryCreate = () => import('./admin/views/category/Create.vue')

// Products

const ProductIndex = () => import('./admin/views/product/Index.vue')
const ProductCreate = () => import('./admin/views/product/Create.vue')

const routes = [
  {
    path: '/admin',
    component: AdminLayoutLogin,
    children: [
      {
        path: 'login',
        name: 'login',
        component: Login,
      },
    ],
  },
  {
    path: '/admin',
    component: AdminLayoutBasic,
    children: [
      // Dashboard

      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'dashboard',
        component: Dashboard,
      },

      // Categories

      {
        path: 'categories',
        component: CategoryIndex,
      },
      {
        path: 'categories/create',
        name: 'categories.create',
        component: CategoryCreate,
      },
      {
        path: 'categories/:id/edit',
        name: 'categories.edit',
        component: CategoryCreate,
      },

      // Products

      {
        path: 'products',
        component: ProductIndex,
      },
      {
        path: 'products/create',
        name: 'products.create',
        component: ProductCreate,
      },
      {
        path: 'products/:id/edit',
        name: 'products.edit',
        component: ProductCreate,
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
