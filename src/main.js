import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import store from './store'
import vClickOutside from 'v-click-outside'
import "./assets/icon/iconfont.css";

import { appStore, userStore } from '@/utils/appStore'

Vue.use(ElementUI);
Vue.use(vClickOutside)

Vue.config.productionTip = false
Vue.prototype.$appStore = appStore
Vue.prototype.$userStore = userStore

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
