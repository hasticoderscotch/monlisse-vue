import axios from 'axios'
import { defineStore } from 'pinia'

export const useProductStore = defineStore({
  id: 'product',

  state: () => ({
    products: [],
  }),

  actions: {
    fetchProducts() {
      return new Promise((resolve, reject) => {
        axios
          .get(`/product/list`)
          .then((response) => {
            this.products = response.data.data
            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    addProduct(data) {
      return new Promise((resolve, reject) => {
        axios
          .post('/product/add', data)
          .then((response) => {
            this.products.push(response.data.data)
            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    updateProduct(id, data) {
      return new Promise((resolve, reject) => {
        axios
          .put(`/product/update?productId=${id}`, data)
          .then((response) => {
            let pos = this.products.findIndex(
              (product) => product.id === response.data.data.id
            )
            this.products[pos] = data
            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    deleteProduct(id) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/product/delete?productId=${id}`)
          .then((response) => {
            let index = this.products.findIndex((product) => product.id === id)
            this.products.splice(index, 1)
            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
})
