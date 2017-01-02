<template lang="html">
  <nav class="navbar">
    <router-link to="/" class="title action" exact>Home</router-link>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
}
</script>

<style lang="scss">
.navbar {
  & {
    display: flex;
    align-items: center;
    padding: 0 1rem;
    height: 70px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    border-radius: 0 !important;
  }

  > .title {
    color: #555459;
    font-size: 22px;
    font-weight: 500;
  }

  > .action:hover {
    text-decoration: none;
  }

  > .action:focus {
    text-decoration: none;
  }
}
</style>
