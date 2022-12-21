import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import './index.css'
import { init as initFa } from './fa'
import App from './App.vue'
import { router } from './router'

initFa()

createApp(App)
  .component('fa', FontAwesomeIcon)
  .use(createPinia())
  .use(router)
  .mount('#app')
