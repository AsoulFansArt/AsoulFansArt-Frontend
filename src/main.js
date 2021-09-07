import { createApp } from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element'
import router from './router'
import './assets/icon/iconfont.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/js/bootstrap.min'
import store from './store'



const app = createApp(App).use(store).use(router)
installElementPlus(app)
app.mount('#app')





