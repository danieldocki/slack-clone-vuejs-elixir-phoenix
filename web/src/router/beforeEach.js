import store from '../store'

const needAuth = auth => auth === true

const beforeEach = (to, from, next) => {
  const requiresAuth = !(to.meta.requiresAuth === false) // default true

  if (!needAuth(requiresAuth)) {
    next()
    return // return to prevent the code from continuing in its flow
    // With this flow `else` or `else if` is not necessary
  }

  store.dispatch('checkUserToken')
  .then(() => {
    next()
  })
  .catch(() => {
    next('/signin')
  })
}

export default beforeEach
