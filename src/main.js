import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/reset.css'
import './assets/js/flexible.js'
import './assets/iconfont/iconfont.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import Http from './http/index'
import Loading from './components/loading/loading.js'
import store from './store'
import { Lazyload } from 'vant'

Vue.use(Lazyload)
Vue.use(Vant)
Vue.use(Loading)

const hls = require('videojs-contrib-hls')
Vue.use(hls)

Vue.prototype.$http = Http
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
