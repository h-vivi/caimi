// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import 'normalize.css'
// import VueMaterial from 'vue-material'

import App from './App'
import router from './router'
import store from './store'

// import './styles/roboto-italic.less'
// import './styles/vue-material-icon.less'
// import 'vue-material/dist/vue-material.css'
import './styles/basic.less'

sync(store, router)
// Vue.use(VueMaterial)
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
