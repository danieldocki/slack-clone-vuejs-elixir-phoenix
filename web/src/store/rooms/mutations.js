import * as TYPES from '../types'

/* eslint-disable no-param-reassign */
export default {
  [TYPES.FETCH_ROOMS_SUCCESS](state, value) {
    state.all = value
  },
  [TYPES.FETCH_USER_ROOMS_SUCCESS](state, value) {
    state.currentUserRooms = value
  },
  [TYPES.CREATE_ROOM_SUCCESS](state, value) {
    state.all = [value, ...state.all]
    state.currentUserRooms = [...state.currentUserRooms, value]
  },
  [TYPES.ROOM_JOINED](state, value) {
    state.currentUserRooms = [...state.currentUserRooms, value]
  },
}
