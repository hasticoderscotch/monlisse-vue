import axios from 'axios'
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore({
  id: 'category',

  state: () => ({
    categories: [],
  }),

  actions: {
    fetchCategory() {
      return new Promise((resolve, reject) => {
        axios
          .get(`/category/list`)
          .then((response) => {
            this.categories = response.data.data
            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    addCategory(data) {
      return new Promise((resolve, reject) => {
        axios
          .post('/category/add', data)
          .then((response) => {
            this.categories.push(response.data.data)
            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
})
