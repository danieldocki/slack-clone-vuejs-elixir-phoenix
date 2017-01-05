<template lang="html">
  <form class="card card-login" @submit.prevent="submit">
    <h3 class="title">Login to Sling</h3>
    <div class="form-group">
      <label for="email">E-mail</label>
      <input type="email" class="form-control" id="email" v-model="email">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input type="password" class="form-control" id="password" v-model="password">
    </div>
    <button class="btn btn-primary btn-block" type="submit">Login</button>
  </form>
</template>

<script>
export default {
  name: 'signin-form',
  props: {
    login: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      email: 'user@example.com',
      password: '123123',
    }
  },

  methods: {
    submit() {
      const { email, password } = this
      this.login({ email, password })
      .then(() => {
        this.$router.push({ name: 'home' })
      })
    },

    reset() {
      this.email = ''
      this.password = ''
    },
  },
};
</script>

<style lang="scss">
.card-login {
  & {
    max-width: 500px;
    padding: 3rem 4rem;
    margin: 2rem auto;
  }

  > .title {
    margin-bottom: 2rem;
    text-align: center;
  }
}
</style>
