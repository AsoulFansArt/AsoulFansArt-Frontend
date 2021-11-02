import { createApp } from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element'
import router from './router'
import './assets/icon/iconfont.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/js/bootstrap.min'
import store from './store'
import './registerServiceWorker'
import VueViewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'



const app = createApp(App).use(store).use(router).use(VueViewer)
installElementPlus(app)
app.mount('#app')





