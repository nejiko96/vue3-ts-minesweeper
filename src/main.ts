import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAngleDown, faGear, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import './index.css'
import App from './App.vue'

library.add(faAngleDown)
library.add(faGear)
library.add(faGithub)
library.add(faXmark)

createApp(App).component('fa', FontAwesomeIcon).use(createPinia()).mount('#app')
