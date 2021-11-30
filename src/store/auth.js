import axios from 'axios'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',

  state: () => ({
    token: window.localStorage.getItem('token'),
    verify: false,
  }),

  getters: {
    isAuthenticated: (state) => state.token,
    isVerifyToken: (state) => state.verify,
  },

  actions: {
    login(data) {
      return new Promise((resolve, reject) => {
        axios
          .post('/user/loginAdmin', data)
          .then((response) => {
            this.token = response.data.token
            window.localStorage.setItem('token', this.token)
            resolve(response)
          })
          .catch((err) => {
            window.localStorage.removeItem('token')
            reject(err)
          })
      })
    },

    verifyToken() {
      const router = useRouter()
      return new Promise((resolve, reject) => {
        axios
          .get('/user/verifyToken')
          .then((response) => {
            if (response.data.code !== 200) {
              window.localStorage.removeItem('token')
              router.push('/admin/login')
            }
            resolve(response)
          })
          .catch((err) => {
            window.localStorage.removeItem('token')
            router.push('/admin/login')
            reject(err)
          })
      })
    },
  },
})
