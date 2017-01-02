<template lang="html">
  <form class="form-message" >
    <div class="input-group">
      <message-input
        :roomNameFormatted="roomNameFormatted"
        :createMessage="createMessage">
      </message-input>
    </div>
  </form>
</template>

<script>
import MessageInput from './MessageInput'

export default {
  name: 'message-form',

  props: {
    createMessage: {
      type: Function,
      required: true,
    },

    room: {
      type: Object,
      required: true,
    },
  },

  computed: {
    roomNameFormatted() {
      return `Message #${this.room.name}`
    },
  },

  components: {
    MessageInput,
  },
}
</script>

<style lang="scss">
.form-message {
  padding: 0px 10px 10px 10px;
  background: #fff;
}

.message-button {
  color: rgb(80,80,80);
  background: rgb(214,214,214);
  border-width: 2px;
  border-color: rgb(214,214,214);
}
</style>
