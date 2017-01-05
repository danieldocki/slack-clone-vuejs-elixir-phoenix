// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { sync } from 'vuex-router-sync'

import router from './router'
import store from './store'

import App from './containers/App'

/**
* $http plugin based on axios
*/
import httpPlugin from './plugins/http'

/**
* $socket plugin based on Phoenix
*/
import socketPlugin from './plugins/socket'


import './assets/bootstrap.css'
import './assets/font-awesome.css'
import './assets/app.scss'

// Effortlessly keep vue-router and vuex store in sync.
sync(store, router) // https://github.com/vuejs/vuex-router-sync/tree/next

/**
* Make $http avaible to all components
* Send store and router to httpPlugin (injection)
*/
Vue.use(httpPlugin, { store, router })

/**
* Make $socket avaible to all components
*/
Vue.use(socketPlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
