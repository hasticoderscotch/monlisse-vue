import axios from 'axios'
import Ls from '../services/ls'

axios.defaults.baseURL = 'http://localhost:4000/'

axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
}

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const AUTH_TOKEN = Ls.get('token')

    if (AUTH_TOKEN) {
      config.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`
    }

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
