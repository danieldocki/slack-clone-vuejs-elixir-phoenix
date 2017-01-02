import moment from 'moment'
import { groupBy, mapKeys } from 'lodash'

export const currentUserRoomIds = state =>
  state.rooms.currentUserRooms.map(room => room.id)

export const isAuthenticated = state =>
  state.session.isAuthenticated

export const messagesByGroupDay = (state) => {
  const { messages } = state.room
  messages.map(message => message.day = moment(message.inserted_at).format('MMMM Do')) // eslint-disable-line
  const days = []
  const dayGroups = groupBy(messages, 'day')
  mapKeys(dayGroups, (value, key) => {
    days.push({ date: key, messages: value })
  })

  return days
}
