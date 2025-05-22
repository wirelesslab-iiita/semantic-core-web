// src/main.js

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

loadFonts()

createApp(App)
  .use(vuetify)
  .use(createPinia())
  .use(Vue3Toastify, {
    autoClose: 3000,
    position: 'top-right'
  })
  .mount('#app')
