import axios from 'axios'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',

  actions: {
    login(data) {
      return new Promise((resolve, reject) => {
        axios
          .post('/user/loginAdmin', data)
          .then((response) => {
            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
})
