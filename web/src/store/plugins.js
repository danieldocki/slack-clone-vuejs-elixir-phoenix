import localforage from 'localforage'
// plugins and src are alias. see client/build/webpack.base.conf.js
// import { Presence } from 'phoenix'
import { setToken as httpSetToken } from 'plugins/http'
import * as phoenix from 'plugins/socket'
import * as TYPES from './types'

export const subscribeSetToken = (store) => {
  store.subscribe((mutation, { session }) => {
    if (TYPES.SET_TOKEN === mutation.type) {
      // Set the Socket Authorization params with the token
      phoenix.setToken(session.token)
      // Connect the socket
      phoenix.socket.connect()
      // Set the Axios Authorization header with the token
      httpSetToken(session.token)
      // Sets the token to the local storage for auto-login purpose
      localforage.setItem('token', session.token)
    }
  })
}

export const subscribeLogout = (store) => {
  store.subscribe((mutation) => {
    if (TYPES.LOGOUT === mutation.type) {
      // Remove the token to the local storage
      localforage.removeItem('token')
    }
  })
}

export const subscribeRoom = (store) => {
  store.subscribe((mutation, { room }) => {
    if (TYPES.SET_ROOM_ID === mutation.type) {
      const roomId = room.currentRoom.id
      phoenix.setChannel(`rooms:${roomId}`)

      phoenix.getChannel().on('presence_state', (state) => {
        phoenix.syncState(state)
        store.commit(TYPES.ROOM_PRESENCE_UPDATE, phoenix.presenceList())
      })

      phoenix.getChannel().on('presence_diff', (diff) => {
        phoenix.syncDiff(diff)
        store.commit(TYPES.ROOM_PRESENCE_UPDATE, phoenix.presenceList())
      })

      phoenix.getChannel().on('message_created', (message) => {
        store.commit(TYPES.MESSAGE_CREATED, message)
      })

      phoenix.getChannel().join().receive('ok', (response) => {
        store.commit(TYPES.ROOM_CONNECTED_TO_CHANNEL, response)
      })
    }
  })
}
