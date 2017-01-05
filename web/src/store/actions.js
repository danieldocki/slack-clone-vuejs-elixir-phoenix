import * as TYPES from './types'

export default {
  setFetching({ commit }, obj) {
    commit(TYPES.MAIN_SET_FETCHING, obj)
  },
}
