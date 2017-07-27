// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import 'normalize.css'
import MintUI from 'mint-ui'

import App from './App'
import router from './router'
import store from './store'

// import './styles/roboto-italic.less'
// import './styles/vue-material-icon.less'
import 'mint-ui/lib/style.css'
import './styles/basic.less'

sync(store, router)
Vue.use(MintUI)
Vue.config.productionTip = false

window.$router = router

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
