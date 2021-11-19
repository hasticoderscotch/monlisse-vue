import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/index.css'
import router from './router.js'
import { createPinia } from 'pinia'
import './plugins/axios.js'
import BaseInput from './components/base/BaseInput.vue'
import BaseInputGroup from './components/base/BaseInputGroup.vue'
import BaseButton from './components/base/BaseButton.vue'
import BaseCustomTag from './components/base/BaseCustomTag.vue'

const app = createApp(App)

app.component('BaseInput', BaseInput)
app.component('BaseInputGroup', BaseInputGroup)
app.component('BaseButton', BaseButton)
app.component('BaseCustomTag', BaseCustomTag)
app.use(router)
app.use(createPinia())
app.mount('#app')
