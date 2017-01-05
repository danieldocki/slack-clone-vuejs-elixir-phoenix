import localforage from 'localforage'
import { Presence } from 'phoenix'
import { setToken as httpSetToken } from 'plugins/http'
import { Socket } from 'plugins/socket'
import * as TYPES from './types'

export const subscribeSetToken = (store) => {
  store.subscribe((mutation, { session }) => {
    if (TYPES.SET_TOKEN === mutation.type) {
      // Connect the socket
      Socket.connect(session.token)
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
      // Disconnect the socket
      Socket.disconnect()
      // Remove the token to the local storage
      localforage.removeItem('token')
    }
  })
}

export const subscribeRoom = (store) => {
  store.subscribe((mutation, { room }) => {
    if (TYPES.SET_ROOM_ID === mutation.type) {
      const roomId = room.currentRoom.id
      let presences = {}

      Socket.findChannel(roomId)
        .then(({ channel, response }) => {
          channel.on('presence_state', (state) => {
            presences = Presence.syncState(presences, state)
            store.dispatch('syncPresentUsers', presences)
          })

          channel.on('presence_diff', (diff) => {
            presences = Presence.syncDiff(presences, diff)
            store.dispatch('syncPresentUsers', presences)
          })

          channel.on('message_created', (message) => {
            console.log('Message created!')
            store.commit(TYPES.MESSAGE_CREATED, message)
          })

          store.commit(TYPES.ROOM_CONNECTED_TO_CHANNEL, response)
        })
    }
  })
}
