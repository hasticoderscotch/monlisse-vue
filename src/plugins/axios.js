import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000/'

axios.defaults.headers.common = {
  Authorization: `Bearer ${window.localStorage.getItem('token')}`,
  'X-Requested-With': 'XMLHttpRequest',
}
