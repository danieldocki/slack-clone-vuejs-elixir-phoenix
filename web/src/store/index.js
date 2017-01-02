import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import * as actions from './actions'
import * as plugin from './plugins'
import * as getters from './getters'

// Vuex Modules
import session from './session'
import rooms from './rooms'
import room from './room'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: [
    plugin.subscribeSetToken,
    plugin.subscribeLogout,
    plugin.subscribeRoom,
  ],
  modules: {
    session,
    rooms,
    room,
  },
  strict: process.env.NODE_ENV !== 'production',
})
