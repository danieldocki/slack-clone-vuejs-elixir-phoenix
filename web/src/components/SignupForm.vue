<template lang="html">
  <form class="card card-login" @submit.prevent="submit">
    <h3 class="title">Signup to Sling</h3>
    <div class="form-group">
      <label for="username">Username</label>
      <input type="text" class="form-control" id="username" v-model="user.username">
    </div>
    <div class="form-group">
      <label for="email">E-mail</label>
      <input type="email" class="form-control" id="email" v-model="user.email">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="form-control" id="password" v-model="user.password">
    </div>
    <button class="btn btn-primary btn-block" type="submit">Login</button>
  </form>
</template>

<script>
export default {
  name: 'signup-form',
  props: {
    signup: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
      },
    }
  },

  methods: {
    submit() {
      const { user } = this
      this.signup({ user })
      .then(() => {
        this.$router.push({ name: 'home' })
      })
    },

    reset() {
      this.user.username = ''
      this.user.email = ''
      this.user.password = ''
    },
  },
};
</script>

<style lang="scss">
</style>
