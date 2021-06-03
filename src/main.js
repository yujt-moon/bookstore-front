// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import global_ from './Global'

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.prototype.PUBLIC_PARAM = global_

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
