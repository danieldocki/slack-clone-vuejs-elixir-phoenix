<template lang="html">
  <div class="message-item">
    <avatar :email="message.user.email"></avatar>
    <div class="message-details">
      <div class="message-info">
        <span class="username">{{ message.user.username }}</span>
        <time class="time">{{ insertedAt }}</time>
      </div>
      <div class="text">
        {{ message.text }}
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Avatar from './Avatar'

export default {
  name: 'message',
  props: {
    message: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      insertedAt: moment(this.message.inserted_at).format('h:mm A'),
    }
  },

  components: {
    Avatar,
  },
}
</script>

<style lang="scss">
.message-item {
  display: flex;
  margin-bottom: 10px;
  padding-right: 40px;
  padding-left: 6px;
}

.message-details {
  > .text {
    word-wrap: break-word;
    word-break: break-all;
  }
}

.message-info {
  line-height: 1.2;

  > .username {
    margin-right: 8px;
    font-size: 14px;
    font-weight: bold;
  }

  > .time {
    font-size: 12px;
    color: rgb(192,192,192);
  }
}
</style>
