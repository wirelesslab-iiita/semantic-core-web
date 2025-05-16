import { createApp } from 'vue'
<<<<<<< HEAD
<<<<<<< HEAD
import { createPinia } from 'pinia'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
const pinia = createPinia()
loadFonts()

createApp(App)
  .use(vuetify)
  .use(pinia)
  .use(Vue3Toastify, {
    autoClose: 3000,
    position: "top-right",
  })
  .mount('#app')
=======
=======
import { createPinia } from 'pinia'
>>>>>>> d956f21 (Added Semantic Communication - Backend)
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
const pinia = createPinia()
loadFonts()

<<<<<<< HEAD
createApp(App).mount('#app')
>>>>>>> 22abc74 (init)
=======
createApp(App)
  .use(vuetify)
  .use(pinia)
  .use(Vue3Toastify, {
    autoClose: 3000,
    position: "top-right",
  })
  .mount('#app')
>>>>>>> d956f21 (Added Semantic Communication - Backend)
