import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import 'vant/lib/index.css'
import { Button, CellGroup, Field } from 'vant'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Button)
app.use(Field)
app.use(CellGroup)

app.mount('#app')
