<template lang="html">
  <img
    :src="uri"
    :alt="email"
    class="avatar" />
</template>

<script>
import md5 from 'md5'

export default {
  name: 'avatar',
  props: {
    email: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      hash: md5(this.email),
      uri: `https://secure.gravatar.com/avatar/${this.hash}`,
    }
  },
}
</script>

<style lang="scss">
.avatar {
  border-radius: 4px;
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
</style>
