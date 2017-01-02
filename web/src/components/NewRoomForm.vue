<template lang="html">
  <form @submit.prevent="submit">
    <div class="input-group">
      <input
        type="text"
        autofocus="autofocus"
        class="form-control"
        name="room[name]"
        v-model="room.name">
      <div class="input-group-btn">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'new-room-form',

  props: {
    createRoom: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      room: {
        name: '',
      },
    }
  },

  methods: {
    submit() {
      const { room } = this
      this.createRoom({ room }).then(() => {
        this.reset()
      })
    },

    reset() {
      this.room.name = ''
    },
  },
};
</script>

<style lang="scss">
</style>
