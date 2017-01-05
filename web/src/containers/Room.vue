<template>
<div class="room-display">
  <div class="room">
    <room-navbar :room="room"></room-navbar>
    <message-list
      :messages="messages"
      :handleLoadMore="handleLoadMore"
      :loadMoreMessages="loadMoreMessages"
      :loadingOlderMessages="loadingOlderMessages"
      :messagesByGroupDay="messagesByGroupDay">
    </message-list>
    <message-form
      :createMessage="createMessage"
      :room="room">
      </message-form>
  </div>
</div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import RoomNavbar from 'components/RoomNavbar'
import MessageList from 'components/MessageList'
import MessageForm from 'components/MessageForm'

export default {
  name: 'room',

  created() {
    this.routeChanged()
  },

  computed: {
    ...mapState({
      room: state => state.room.currentRoom,
      messages: state => state.room.messages,
      route: state => state.route,
      loadMoreMessages: state => state.room.pagination.total_pages >
        state.room.pagination.page_number,
      loadingOlderMessages: state => state.room.loadingOlderMessages,
    }),

    ...mapGetters([
      'messagesByGroupDay',
    ]),
  },

  watch: {
    $route: 'routeChanged',
  },

  beforeRouteLeave(to, from, next) {
    this.leaveChannel(this.route.params.id).then(() => next())
  },

  methods: {
    routeChanged() {
      if (this.route.name === 'room' && !!this.route.from.params.id) {
        this.leaveChannel(this.route.from.params.id).then(() =>
          this.connectToChannel(this.route.params.id)
        )
      } else if (this.route.name === 'room') {
        this.connectToChannel(this.route.params.id)
      } else {
        this.leaveChannel(this.route.params.id)
      }
    },

    handleLoadMore() {
      return this.loadOlderMessages({
        roomId: this.room.id,
        params: { last_seen_id: this.messages[0].id },
      })
    },

    ...mapActions([
      'connectToChannel',
      'leaveChannel',
      'loadOlderMessages',
      'createMessage',
    ]),
  },

  components: {
    RoomNavbar,
    MessageList,
    MessageForm,
  },
};
</script>

<style lang="scss">
.room-display {
  & {
    display: flex;
    height: 100vh;
    width: 100%;
  }

  > .room {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
</style>
