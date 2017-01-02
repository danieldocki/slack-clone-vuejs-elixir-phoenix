import { http } from 'plugins/http'
import { getData } from 'utils/get'
import * as TYPES from '../types'

export const fetchRooms = ({ commit }) =>
  http.get('/rooms')
  .then(getData)
  .then(({ data }) => {
    commit(TYPES.FETCH_ROOMS_SUCCESS, data)
    // return data // keep promise chain
  })

export const fetchUserRooms = ({ commit }, userId) =>
  http.get(`/users/${userId}/rooms`)
  .then(getData)
  .then(({ data }) => {
    commit(TYPES.FETCH_USER_ROOMS_SUCCESS, data)
    // return data  // keep promise chain
  })

export const createRoom = ({ commit }, payload) =>
  http.post('/rooms', payload)
  .then(getData)
  .then(({ data }) => {
    commit(TYPES.CREATE_ROOM_SUCCESS, data)
    // return data  // keep promise chain
  })

export const joinRoom = ({ commit }, roomId) => {
  http.post(`/rooms/${roomId}/join`)
  .then(getData)
  .then(({ data }) => {
    commit(TYPES.ROOM_JOINED, data)
    // return data  // keep promise chain
  })
}
