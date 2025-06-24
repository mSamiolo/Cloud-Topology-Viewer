import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import MSVueLoader from './index.js'
import './style.css'

const app = createApp(App)

app.use(MSVueLoader)
app.use(router)

app.mount('#app')
