import { http } from 'plugins/http'
import { Socket } from 'plugins/socket'
import { getData } from 'utils/get'
import * as TYPES from '../types'

export const connectToChannel = ({ commit }, roomId) =>
  commit(TYPES.SET_ROOM_ID, roomId)

export const leaveChannel = ({ commit }, roomId) =>
  Socket.leaveChannel(roomId)
    .then(() => commit(TYPES.USER_LEFT_ROOM))

export const createMessage = ({ commit }, { roomId, payload }) =>
  new Promise((resolve, reject) => {
    Socket.findChannel(roomId)
      .then(({ channel }) => {
        channel.push('new_message', payload.message)
          .receive('ok', () => resolve())
          .receive('error', () => reject())
      })
  })


export const loadOlderMessages = ({ commit }, { roomId, params }) => {
  commit(TYPES.FETCH_MESSAGES_REQUEST)
  return http.get(`/rooms/${roomId}/messages`, {
    params: { last_seen_id: params.last_seen_id },
  }).then(getData)
    .then(response => commit(TYPES.FETCH_MESSAGES_SUCCESS, response))
    .catch(() => commit(TYPES.FETCH_MESSAGES_FAILURE))
}
