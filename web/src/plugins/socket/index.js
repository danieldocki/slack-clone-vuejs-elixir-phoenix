import { Socket, Presence } from 'phoenix'

const socketUrl = process.env.APP_WEBSOCKET_URL
let presences = {}
let channel = null

// allow use socket client without Vue instance
export const socket = new Socket(socketUrl, {
  logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) },
})

// Helper method to set token
export function setToken(token) {
  socket.params.token = token
}

// Helper method to set channel
export function setChannel(_channel) {
  channel = socket.channel(_channel)
  return channel
}

// Helper method to get channel
export function getChannel() {
  return channel
}

// Helper's method's to set presences
export function syncState(state) {
  presences = Presence.syncState(presences, state)
}

export function syncDiff(diff) {
  presences = Presence.syncDiff(presences, diff)
}

export function presenceList() {
  const presentUsers = []
  Presence.list(presences, (id, { metas: [first] }) => first.user)
    .map(user => presentUsers.push(user))
  return presentUsers
}

// receive connection and params by options
// https://vuejs.org/v2/guide/plugins.html
export default function install(Vue) {
  Object.defineProperty(Vue.prototype, '$socket', {
    get() {
      return socket
    },
  })
}
