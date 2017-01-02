<template lang="html">
  <div v-if="users" class="active-rooms">
    <div class="room-heading">
      <span class="title">Active Users</span>
    </div>

    <ul class="room-list">
      <li v-for="user in users" class="user-active">
        <span>{{ user.username }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'active-users',

  props: {
    users: {
      type: Array,
    },
  },
}
</script>

<style lang="scss">
.room-heading {
  & {
    margin-left: 15px;
    margin-bottom: 5px;
    font-size: 13px;
    text-transform: uppercase;
  }

  > .title {
    font-weight: 600;
  }
}

.room-list {
  padding-left: 15px;
  list-style: none;
}

.user-active {
  & {
    position: relative;
    padding-left: 20px;
    font-size: 16px;
    font-weight: 300;
  }

  &:after {
    position: absolute;
    top: 7px;
    left: 0;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgb(64,151,141);
    content: "";
  }
}
</style>
