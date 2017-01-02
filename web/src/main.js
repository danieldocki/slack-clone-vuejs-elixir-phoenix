// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { sync } from 'vuex-router-sync'

import router from './router'
import store from './store'

import App from './containers/App'

import './assets/bootstrap.css'
import './assets/font-awesome.css'
import './assets/app.scss'

// Effortlessly keep vue-router and vuex store in sync.
sync(store, router) // https://github.com/vuejs/vuex-router-sync/tree/next

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
