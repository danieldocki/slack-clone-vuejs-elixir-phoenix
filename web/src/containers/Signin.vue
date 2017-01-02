<template lang="html">
  <div class="login">
    <signin-form :login="login"></signin-form>
    <div class="link-actions">
      <router-link to="/signup">Signup</router-link>
      <router-link to="/">Home</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import store from '../store'
import SigninForm from '../components/SigninForm'

export default {
  name: 'signin',

  beforeRouteEnter(to, from, next) {
    store.dispatch('checkUserToken')
    .then(() => {
      next({
        path: from.fullPath,
      })
    })
    .catch(() => {
      next()
    })
  },

  methods: {
    ...mapActions(['login']),
  },

  components: {
    SigninForm,
  },
};
</script>

<style lang="scss">
.login {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
}
</style>
