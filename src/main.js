// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import 'normalize.css'
import MintUI from 'mint-ui'
import promiseFinally from 'promise.prototype.finally'
import SmoothPicker from 'vue-smooth-picker'
import FastClick from 'fastclick'
import VueCookie from 'vue-cookie'

import App from './App'
import router from './router'
import store from './store'

// import './styles/roboto-italic.less'
// import './styles/vue-material-icon.less'
import 'mint-ui/lib/style.css'
import './styles/basic.less'

promiseFinally.shim()
sync(store, router)
Vue.use(MintUI)
Vue.use(SmoothPicker)
Vue.use(VueCookie)
Vue.config.productionTip = false
FastClick.attach(document.body)

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
