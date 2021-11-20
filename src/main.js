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
import BaseCard from './components/base/BaseCard.vue'
import BasePage from './components/base/BasePage.vue'
import BaseBreadcrumb from './components/base/BaseBreadcrumb.vue'
import BaseBreadcrumbItem from './components/base/BaseBreadcrumbItem.vue'
import BasePageHeader from './components/base/BasePageHeader.vue'

const app = createApp(App)

app.component('BaseInput', BaseInput)
app.component('BaseInputGroup', BaseInputGroup)
app.component('BaseButton', BaseButton)
app.component('BaseCustomTag', BaseCustomTag)
app.component('BaseCard', BaseCard)
app.component('BasePage', BasePage)
app.component('BaseBreadcrumb', BaseBreadcrumb)
app.component('BaseBreadcrumbItem', BaseBreadcrumbItem)
app.component('BasePageHeader', BasePageHeader)

app.use(router)
app.use(createPinia())
app.mount('#app')
