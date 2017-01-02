<template lang="html">
  <div class="active-rooms">
    <div class="room-heading -right">
      <router-link to="/" class="action" exact>
        <span class="title">
          Channels
          <span class="number">({{rooms.length}})</span>
        </span>
      </router-link>
      <router-link to="/" class="action -icon" exact>
        <span class="fa fa-plus-square-o"></span>
      </router-link>
    </div>

    <ul class="room-list">
      <li v-for="room in rooms">
        <router-link
          :to="{ name: 'room', params: { id: room.id }}"
          class="room-action "
          exact>
          <span>{{`# ${room.name}`}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'active-rooms',

  props: {
    rooms: {
      type: Array,
      required: true,
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

  > .action {
    cursor: pointer;
    color: rgba(171, 155, 169, .6);
    font-weight: 500;
  }

  > .action > .title {
    color: rgba(255,255,255,.6);
    font-weight: 600;
  }

  > .action > .title > .number {
    color: rgba(171, 155, 169, .6);
  }

  > .action:hover {
    color: rgba(171, 155, 169, .8);
    text-decoration: none;
  }

  > .action:hover > .title {
    color: rgba(255,255,255,1);
  }

  > .action:hover > .title > .number {
    color: rgba(171, 155, 169, .8);
  }

  > .action:focus {
    color: rgba(255,255,255,.6);
    text-decoration: none;
  }

  > .action.-active,
  > .action.-active > .title {
    color: rgba(255,255,255,1);
  }

  > .action.-icon {
    font-size: 1.5em;
  }

  &.-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.room-list {
  padding-left: 15px;
  list-style: none;
}

.room-action {
  & {
    cursor: pointer;
    color: rgba(255,255,255,.6);
    text-transform: lowercase;
    margin-left: -30px;
    padding-left: 30px;
    display: block;
    font-weight: 500;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  &:hover {
    color: rgba(255,255,255,.6);
    text-decoration: none;
    background-color: #3e313c;
  }

  &:focus {
    color: rgba(255,255,255,.6);
    text-decoration: none;
  }

  &.-active {
    color: rgba(255,255,255,1);
    background-color: #4c9689;
  }
}
</style>
