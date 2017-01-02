<template>
<div class="home">
  <navbar></navbar>

  <div class="card card-room">
    <h3 class="title">Create a new room</h3>
    <new-room-form :createRoom="createRoom"></new-room-form>
  </div>

  <div v-if="!isEmpty(rooms)" class="card card-room">
    <h3 class="title">Join a room</h3>
    <room-list-item
      v-for="room in rooms"
      :joinRoom="joinRoom"
      :room="room"
      :isJoined="isJoined(room.id)">
    </room-list-item>
  </div>

  <div class="card card-room">
    <button v-on:click="handleLogout" class="btn btn-block btn-danger">Sair</button>
  </div>
</div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { isEmpty } from 'lodash'
import NewRoomForm from 'components/NewRoomForm'
import RoomListItem from 'components/RoomListItem'
import Navbar from 'components/Navbar'

export default {
  name: 'home',

  created() {
    this.fetchRooms()
  },

  computed: {
    ...mapState({
      token: state => state.session.token,
      rooms: state => state.rooms.all,
    }),

    ...mapGetters([
      'currentUserRoomIds',
    ]),
  },

  methods: {
    isEmpty(resource) {
      return isEmpty(resource)
    },

    handleLogout() {
      this.logout().then(() => {
        this.$router.push({ name: 'signin' })
      })
    },

    isJoined(roomId) {
      // console.log(this.currentUserRoomIds.includes(roomId)) // Why call 6 times?
      return this.currentUserRoomIds.includes(roomId)
    },

    ...mapActions(['logout', 'fetchRooms', 'joinRoom', 'createRoom']),
  },

  components: {
    RoomListItem,
    NewRoomForm,
    Navbar,
  },
};
</script>

<style lang="scss">
.home {
  flex: 1 1 0%;
}

.card-room {
  max-width: 500px;
  padding: 3rem 4rem;
  margin: 2rem auto;

  > .title {
    margin-bottom: 2rem;
    text-align: center;
  }
}
</style>
