import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'bulma'
import './registerServiceWorker'
import lazyload from './util/lazyload.js'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// import * as echarts from 'echarts'


/* import specific icons */
import {
    faCirclePlay, faImage, faBookOpen, faIceCream, faUpload, faEnvelope, faClock, faArrowTrendUp, faEye, faFire,
    faSun, faMoon, faCalendar, faTag, faChevronDown, faBars, faHouse, faChartGantt, faHeart, faCoins, faStar, faComment,
    faGrinStars, faShare, faClone, faSpinner, faEdit, faUser, faHistory, faChartLine
} from '@fortawesome/free-solid-svg-icons'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//import {fas} from "@fortawesome/free-solid-svg-icons";


//library.add(fas)
library.add(faCirclePlay, faImage, faBookOpen, faIceCream, faUpload, faEnvelope
, faClock, faArrowTrendUp, faEye, faFire, faSun, faMoon, faCalendar,faTag, faChevronDown, faBars, faHouse
, faChartGantt, faHeart, faCoins, faStar, faComment,faGrinStars, faShare, faClone, faSpinner, faEdit, faUser,faHistory, faChartLine)

const app = createApp(App).use(store).use(router)
app.use(ElementPlus,{
    locale: zhCn,
})

// app.echarts=echarts

lazyload.install(app)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')





