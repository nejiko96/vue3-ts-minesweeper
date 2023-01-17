import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import './index.css'
import App from './App.vue'
import { initializeFA } from './core/fa'
import { router } from './core/router'

initializeFA()

createApp(App)
  .component('fa', FontAwesomeIcon)
  .use(createPinia())
  .use(router)
  .mount('#app')
