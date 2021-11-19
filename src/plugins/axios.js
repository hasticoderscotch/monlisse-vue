import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000/'

axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
}
