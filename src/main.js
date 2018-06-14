// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vueAwesomeSwiper from 'vue-awesome-swiper'

import store from './store'

import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner'
import Loading from './directives/loading'

import 'swiper/dist/css/swiper.css'
import './assets/sass/common.scss'

Vue.use(VueAxios, axios)
Vue.use(vueAwesomeSwiper)

Vue.use(Loading)

Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})

fontawesome.library.add(brands, solid, regular, faSpinner)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
