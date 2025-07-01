import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import SceneManagement from './index.js'
import './style.css'

const app = createApp(App)

app.use(SceneManagement)
app.use(router)

app.mount('#app')
