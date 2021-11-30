import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from './store/auth'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())

const authStore = useAuthStore()

// import auth from './middleware/auth'
// import log from './middleware/log'

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
    meta: { redirectIfAuthenticated: true },
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
    meta: { requiresAuth: true },
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

router.beforeEach((to, from, next) => {
  console.log(authStore.token, 'authStore.isAuthenticated')
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!authStore.token) {
      next({
        path: '/admin/login',
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }

  if (
    to.matched.some((record) => record.meta.redirectIfAuthenticated) &&
    authStore.token
  ) {
    next({
      path: '/admin/dashboard',
    })
  }
})

export default router
