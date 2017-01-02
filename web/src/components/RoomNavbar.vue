<template lang="html">
  <nav class="navbar">
    <span class="title channel">#{{room.name}}</span>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  props: {
    room: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.navbar {
  > .channel {
    text-transform: lowercase;
  }
}
</style>
