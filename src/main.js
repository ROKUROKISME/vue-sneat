import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import router from './router'
import VueCookies from "vue-cookies";
import App from './App.vue'

const app = createApp(App)

app.use(router)
app.use(VueCookies);
app.use(createPinia())
app.mount('#app')
