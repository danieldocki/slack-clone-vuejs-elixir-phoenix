import _ from 'lodash'
import { Socket as PhoenixSocket } from 'phoenix'

const socketUrl = process.env.APP_WEBSOCKET_URL

const socket = new PhoenixSocket(socketUrl, {
  logger: (kind, msg, data) => {
    console.log(`${kind}: ${msg}`, data)
  },
})

export const Socket = {
  connect(token, silent = false) {
    if (this.connClosed()) {
      socket.params.token = token
      socket.connect()
      console.log('Socket connected!')
    } else if (!this.connAvaiable()) {
      socket.connect()
      console.log('Socket reconnected!')
    } else if (!silent) {
      console.warn('Try to connect a connected socket.')
    }
  },

  disconnect() {
    if (this.connClosed()) { return }
    socket.disconnect(() => {
      socket.reconnectTimer.reset()
      console.log('Socket disconnected!')
    })
  },

  connAvaiable() {
    return socket && (socket.connectionState() === 'open' ||
                         socket.connectionState() === 'connecting')
  },

  connClosed() {
    return socket.connectionState() === 'closed'
  },

  findChannel(id, prefix = 'rooms') {
    return new Promise((resolve, reject) => {
      if (this.connClosed()) {
        console.error('No socket connection, please connect first')
        reject('NO_SOCKET_CONNECTION')
      }

      const topicName = `${prefix}:${id}`
      let channel = _.find(socket.channels, ch => ch.topic === topicName)

      if (!channel) {
        channel = socket.channel(topicName, {})
      }

      if (channel.state === 'closed') {
        channel.join()
          .receive('ok', (response) => {
            console.log(`Joined ${channel.topic}`)
            resolve({ channel, response })
          })
          .receive('error', () => {
            console.log(`[Error] Joined ${channel.topic}`)
            reject()
          })
      } else {
        resolve({ channel })
      }
    })
  },

  leaveChannel(id, prefix = 'rooms') {
    return new Promise((resolve, reject) => {
      if (this.connClosed()) {
        console.error('No socket connection, please connect first')
        reject('NO_SOCKET_CONNECTION')
      }

      const topicName = `${prefix}:${id}`
      const channel = _.find(socket.channels, ch => ch.topic === topicName)

      if (channel.state === 'closed') {
        reject()
      } else {
        channel.leave()
          .receive('ok', () => {
            console.log(`Left ${channel.topic}`)
            resolve({ channel })
          })
          .receive('error', () => {
            console.log(`[Error] Left ${channel.topic}`)
            reject({ channel })
          })
      }
    })
  },
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
