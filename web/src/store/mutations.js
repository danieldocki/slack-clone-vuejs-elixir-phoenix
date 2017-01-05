import * as TYPES from './types'

/* eslint-disable no-param-reassign */
export default {
  [TYPES.MAIN_SET_FETCHING](state, obj) {
    state.fetching = obj.fetching
  },
}
