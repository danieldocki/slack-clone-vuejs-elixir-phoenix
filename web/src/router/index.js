import Vue from 'vue';
import Router from 'vue-router'

import Home from 'containers/Home'
import Room from 'containers/Room'
import Sidebar from 'containers/Sidebar'
import NotFound from 'components/NotFound'
import Signin from 'containers/Signin'
import Signup from 'containers/Signup'
import beforeEach from './beforeEach'

Vue.use(Router)

// Create the router
const router = new Router({
  mode: 'history',
  base: __dirname,
  linkActiveClass: '-active',
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: Home,
        sidebar: Sidebar,
      },
      meta: { requiresAuth: true },
    },
    {
      path: '/rooms/:id',
      name: 'room',
      components: {
        default: Room,
        sidebar: Sidebar,
      },
      meta: { requiresAuth: true },
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin,
      meta: { requiresAuth: false },
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      meta: { requiresAuth: false },
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound,
    },
  ],
})

/**
* Before a route is resolved we check for
* the token if the route is marked as
* requireAuth.
*/
router.beforeEach(beforeEach)

export default router
