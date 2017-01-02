<template lang="html">
  <div class="sidebar">
    <div class="header">
      <active-rooms :rooms="rooms"></active-rooms>
      <active-users :users="users"></active-users>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ActiveRooms from 'components/ActiveRooms'
import ActiveUsers from 'components/ActiveUsers'

export default {
  name: 'sidebar',

  computed: {
    ...mapState({
      rooms: state => state.rooms.currentUserRooms,
      users: state => state.room.presentUsers,
    }),
  },

  components: {
    ActiveRooms,
    ActiveUsers,
  },
}
</script>

<style lang="scss">
.sidebar {
  color: #ab9ba9;
  background: #4d394b;

  > .header {
    padding: 20px 15px;
    margin-bottom: 10px;
    width: 220px;
  }
}</style>
