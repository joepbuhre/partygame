import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import socket from '@/services/socket.js'

const app = createApp(App).use(store).use(router)

app.config.globalProperties.$socket = socket

app.mount('#app')