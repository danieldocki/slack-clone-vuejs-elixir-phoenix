import localforage from 'localforage'
import { Presence } from 'phoenix'
import { isEmpty } from 'lodash'
import { http } from 'plugins/http'
import { getData } from 'utils/get'
import * as TYPES from '../types'

export const login = ({ dispatch }, payload) =>
  http.post('/sessions', payload)
  .then(getData)
  .then(({ data, meta }) => {
    dispatch('setUser', data)
    dispatch('setToken', meta)
    dispatch('fetchUserRooms', data.id)
    return data // keep promise chain
  })

export const signup = ({ dispatch }, payload) =>
  http.post('/users', payload)
  .then(getData)
  .then(({ data, meta }) => {
    dispatch('setUser', data)
    dispatch('setToken', meta)
    dispatch('fetchUserRooms', data.id)
    return data // keep promise chain
  })

export const authenticate = ({ dispatch }) =>
  http.post('/sessions/refresh')
  .then(getData)
  .then(({ data, meta }) => {
    dispatch('setUser', data)
    dispatch('setToken', meta)
    dispatch('fetchUserRooms', data.id)
    return data  // keep promise chain
  })
  .catch(() => {
    dispatch('unauthenticate')
    return Promise.reject('FAIL_IN_LOAD_USER') // keep promise chain
  })

export const logout = ({ dispatch }) =>
  http.delete('/sessions')
  .then(() => {
    dispatch('unauthenticate')
  })

export const checkUserToken = ({ dispatch, state }) => {
  if (!isEmpty(state.token)) {
    return Promise.resolve(state.token)
  }

  return localforage.getItem('token')
    .then((token) => {
      if (isEmpty(token)) {
        // Token is not saved in localstorage
        return Promise.reject('NO_TOKEN') // Reject promise
      }

      // Put the token in the vuex store
      return dispatch('setToken', token) // keep promise chain
    })
    // With the token in hand, retrieves the user's data, validating the token
    .then(() => dispatch('authenticate'))
}

export const syncPresentUsers = ({ commit }, presences) => {
  const presentUsers = [];
  Presence.list(presences, (id, { metas: [first] }) => first.user)
          .map(user => presentUsers.push(user))
  commit(TYPES.ROOM_PRESENCE_UPDATE, presentUsers)
}

export const setUser = ({ commit }, user) => {
  // Commit the mutations
  commit(TYPES.AUTHENTICATION_SUCCESS, user)

  return Promise.resolve(user)  // keep promise chain
}

export const setToken = ({ commit }, payload) => {
  // prevent if payload is a object
  const token = (isEmpty(payload)) ? null : payload.token || payload

   // Commit the mutations
  commit(TYPES.SET_TOKEN, token)

  return Promise.resolve(token) // keep promise chain
}

export const unauthenticate = ({ commit }) => commit(TYPES.LOGOUT)
