<template lang="html">
  <div class="room-item">
    <span class="name">{{ room.name }}</span>
    <button
      @click="onRoomJoin(room.id)"
      class="btn btn-sm"
      :disabled="isJoined"
    >
    {{ isJoined ? 'Joined' : 'Join' }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'room-list-item',

  props: {
    room: {
      type: Object,
      required: true,
    },

    isJoined: {
      type: Boolean,
      required: true,
    },

    joinRoom: {
      type: Function,
      required: true,
    },
  },

  methods: {
    onRoomJoin(roomId) {
      this.joinRoom(roomId)
    },
  },
}
</script>

<style lang="scss">
.room-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  > .name {
    margin-right: 8px;
  }
}
</style>
