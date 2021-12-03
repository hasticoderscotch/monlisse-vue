import axios from 'axios'
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore({
  id: 'category',

  state: () => ({
    categories: [],
  }),

  actions: {
    fetchCategories() {
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

    uploadCategoryImage(data) {
      return new Promise((resolve, reject) => {
        axios
          .post('/common/category-upload', data)
          .then((response) => {
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

    updateCategory(id, data) {
      return new Promise((resolve, reject) => {
        axios
          .put(`/category/update?categoryId=${id}`, data)
          .then((response) => {
            let pos = this.categories.findIndex(
              (category) => category.id === response.data.data.id
            )
            this.categories[pos] = data
            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    deleteCategory(id) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/category/delete?categoryId=${id}`)
          .then((response) => {
            let index = this.categories.findIndex(
              (category) => category.id === id
            )
            this.categories.splice(index, 1)
            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
})
