import _ from 'lodash'
import { Socket as PhoenixSocket } from 'phoenix'

const socketUrl = process.env.APP_WEBSOCKET_URL

const socketInstance = new PhoenixSocket(socketUrl, {
  logger: (kind, msg, data) => {
    console.log(`${kind}: ${msg}`, data)
  },
})

export const Socket = {
  connect(token, silent = false) {
    if (this.connClosed()) {
      socketInstance.params.token = token
      socketInstance.connect()
      console.log('Socket connected!')
    } else if (!this.connAvaiable()) {
      socketInstance.connect()
      console.log('Socket reconnected!')
    } else if (!silent) {
      console.warn('Try to connect a connected socket.')
    }
  },

  disconnect() {
    if (this.connClosed()) { return }
    socketInstance.disconnect(() => {
      socketInstance.reconnectTimer.reset()
      console.log('Socket disconnected!')
    })
  },

  connAvaiable() {
    return socketInstance && (socketInstance.connectionState() === 'open' ||
                         socketInstance.connectionState() === 'connecting')
  },

  connClosed() {
    return socketInstance.connectionState() === 'closed'
  },

  findChannel(id, prefix = 'rooms') {
    return new Promise((resolve, reject) => {
      if (this.connClosed()) {
        console.error('No socket connection, please connect first')
        reject('NO_SOCKET_CONNECTION')
      }

      const topicName = `${prefix}:${id}`
      let channel = _.find(socketInstance.channels, ch => ch.topic === topicName)

      if (!channel) {
        channel = socketInstance.channel(topicName, {})
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
      const channel = _.find(socketInstance.channels, ch => ch.topic === topicName)

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
      return socketInstance
    },
  })
}
