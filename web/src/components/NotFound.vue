<template>
<div class="not-found">
  <p>Page not found</p>
  <p><router-link to="/">Home</router-link></p>
</div>
</template>

<script>
export default {
  name: 'not-found',
};
</script>

<style lang="scss">
.not-found {
  margin: auto;
  text-align: center;
}
</style>
