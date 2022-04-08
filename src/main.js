import { createApp } from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element'
import router from './router'
import './assets/icon/iconfont.css'
import store from './store'
import './registerServiceWorker'
import 'bulma'



const app = createApp(App).use(store).use(router)
installElementPlus(app)
app.mount('#app')





