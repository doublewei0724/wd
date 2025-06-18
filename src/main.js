import { createApp } from 'vue'
import App from './App.vue'
import './style.css' // TailwindCSS
import 'vant/lib/index.css' // Vant CSS
import { Button, CountDown } from 'vant'

const app = createApp(App)
app.use(Button)
app.use(CountDown)
app.mount('#app')
