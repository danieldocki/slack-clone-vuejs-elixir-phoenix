<template lang="html">
  <div class="signup">
    <signup-form :signup="signup"></signup-form>
    <div class="link-actions">
      <router-link to="/signin">Signin</router-link>
      <router-link to="/">Home</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import store from '../store'
import SignupForm from '../components/SignupForm'
import Navbar from '../components/Navbar'

export default {
  name: 'signup',

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
    ...mapActions(['signup']),
  },

  components: {
    SignupForm,
    Navbar,
  },
};
</script>

<style lang="scss">
.signup {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
}
</style>
