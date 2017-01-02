import * as TYPES from '../types'

/* eslint-disable no-param-reassign */
export default {
  [TYPES.AUTHENTICATION_SUCCESS](state, value) {
    state.currentUser = value
  },

  [TYPES.LOGOUT](state) {
    state.isAuthenticated = false
    state.currentUser = {}
    state.token = null
    state.socket = null
  },

  [TYPES.SET_TOKEN](state, value) {
    state.isAuthenticated = true
    state.token = value
  },
  [TYPES.SOCKET_CONNECTED](state, value) {
    state.socket = value
  },
}
