<template lang="html">
<textarea
  type="text"
  autofocus="true"
  autocomplete="off"
  autocorrect="off"
  spellcheck="true"
  class="form-control message-input"
  name="message[text]"
  rows="1"
  v-model="message.text"
  :placeholder="roomNameFormatted"
  @keydown.enter="handleSubmit">
</template>

<script>
import autosize from 'autosize'
import { mapState } from 'vuex'
import { isEmpty } from 'lodash'

export default {
  name: 'message-input',

  props: {
    roomNameFormatted: {
      type: String,
      required: true,
    },

    createMessage: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      message: {
        text: '',
      },
    }
  },

  mounted() {
    this.handleInput()
  },

  watch: {
    $route: 'routeChanged',
  },

  computed: {
    ...mapState({
      route: state => state.route,
    }),
  },

  methods: {
    routeChanged() {
      this.$el.focus()
    },

    handleInput() {
      const el = this.$el
      el.style.height = '43px'
      autosize(el)
    },

    handleSubmit(e) {
      if (isEmpty(this.message.text)) {
        e.preventDefault()
      } else if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault()
        this.submit()
      }
    },

    submit() {
      const { message } = this
      this.createMessage({
        roomId: this.route.params.id,
        payload: { message },
      }).then(() => {
        this.reset()
        this.handleInput()
      })
    },

    reset() {
      this.message.text = ''
    },
  },
}
</script>

<style lang="scss">
.message-input {
  border-width: 2px !important;
  border-color: rgb(214,214,214) !important;
  border-radius: 6px !important;
  max-height: 185px;
  min-height: 43px;
  padding-top: 10px !important;
  padding-bottom: 10px !important;
  resize: none !important;
  overflow-y: hidden;

  &:focus {
    border-color: #bbbdbf !important;
  }
}
</style>
