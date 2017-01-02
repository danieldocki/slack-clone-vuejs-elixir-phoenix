<template lang="html">
  <div @scroll="handleScroll" class="message-list">
    <div v-show="loadMoreMessages" class="message-loading">
      <button
        @click="handleLoadMore"
        :disabled="loadingOlderMessages"
        class="action btn btn-link btn-sm">
        {{ loadingOlderMessages ? 'Loading' : 'Load more' }}
      </button>
    </div>


    <div v-for="day in messagesByGroupDay" class="message-group">
      <div class="message-divider">
        <span v-if="isToday(day.date)" class="date">Today</span>
        <span v-if="isYesterday(day.date)" class="date">Yesterday</span>
        <span v-if="isOtherDay(day.date)" class="date">{{ day.date }}</span>
        </span>
      </div>

      <message
        v-for="message in day.messages"
        :message="message">
      </message>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import moment from 'moment'
import Message from './Message'

export default {
  name: 'message-list',
  props: {
    messages: {
      type: Array,
      required: true,
    },

    handleLoadMore: {
      type: Function,
      required: true,
    },

    loadMoreMessages: {
      type: Boolean,
      required: true,
    },

    loadingOlderMessages: {
      type: Boolean,
      required: true,
    },

    messagesByGroupDay: {
      type: Array,
      required: true,
    },
  },

  mounted() {
    this.scrollToBottom()
  },

  data() {
    return {
      today: moment().format('MMMM Do'),
      yesterday: moment().subtract(1, 'days').format('MMMM Do'),
      handleScrool: debounce(this.handleScroll, 200),
    }
  },

  watch: {
    messages: 'maybeScrollToBottom',
  },

  methods: {
    isToday(date) {
      return date === this.today
    },

    isYesterday(date) {
      return date === this.yesterday
    },

    isOtherDay(date) {
      return ![this.today, this.yesterday].includes(date)
    },

    maybeScrollToBottom(newVal, oldVal) {
      if (newVal.length !== oldVal.length) {
        if (this.$el.scrollHeight - this.$el.scrollTop <
            this.$el.clientHeight + 50) {
          this.scrollToBottom()
        }
      }
    },

    scrollToBottom() {
      setTimeout(() => {
        this.$el.scrollTop = this.$el.scrollHeight
      })
    },

    handleScroll() {
      if (this.loadMoreMessages && this.$el.scrollTop < 20) {
        this.handleLoadMore()
      }
    },
  },

  components: {
    Message,
  },
}
</script>

<style lang="scss">
.message-list {
  flex: 1;
  padding: 10px 10px 0 10px;
  background: #fff;
  overflow-y: auto;
}

.message-loading {
  text-align: center;

  > .action:hover,
  > .action:focus,
  > .action:active:focus {
    outline: none;
    text-decoration: none;
  }
}

.message-divider {
  & {
    position: relative;
    margin: 1rem 0;
    text-align: center;
    font-weight: 500;
    margin-left: -10px;
    margin-right: -10px;
  }

  > .date {
    z-index: 1;
    position: relative;
    background: #fff;
    padding: 0 12px;
  }

  &:after {
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    height: 1px;
    background: rgb(240,240,240);
    content: "";
  }
}
</style>
