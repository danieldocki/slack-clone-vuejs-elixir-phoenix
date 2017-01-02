import * as TYPES from '../types'

/* eslint-disable no-param-reassign */
export default {
  [TYPES.SET_ROOM_ID](state, value) {
    state.currentRoom.id = value
  },
  [TYPES.ROOM_CONNECTED_TO_CHANNEL](state, { room, messages, pagination }) {
    state.currentRoom = room
    state.messages = messages.reverse()
    state.pagination = pagination
  },
  [TYPES.USER_LEFT_ROOM](state) {
    state.presentUsers = null
  },
  [TYPES.ROOM_PRESENCE_UPDATE](state, presentUsers) {
    state.presentUsers = presentUsers
  },
  [TYPES.MESSAGE_CREATED](state, value) {
    state.messages = [...state.messages, value]
  },
  [TYPES.FETCH_MESSAGES_REQUEST](state) {
    state.loadingOlderMessages = true
  },
  [TYPES.FETCH_MESSAGES_SUCCESS](state, { data, pagination }) {
    state.messages = [...data.reverse(), ...state.messages]
    state.loadingOlderMessages = false
    state.pagination = pagination
  },
  [TYPES.FETCH_MESSAGES_FAILURE](state) {
    state.loadingOlderMessages = false
  },
}
