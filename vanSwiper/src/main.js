// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router';


import axios from 'axios'
Vue.prototype.$axios=axios;

Vue.config.productionTip = false;

import "./utils/rem.js";

// 引用vant-ui
import vant from 'vant' 
import 'vant/lib/index.css';
 
import "./assets/css/main.scss";

Vue.use(vant);

// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper' 
import 'swiper/dist/css/swiper.css'
 
Vue.use(VueAwesomeSwiper)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
