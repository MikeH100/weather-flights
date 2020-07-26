import Vue from 'vue'

Vue.mixin({
  filters: {
    round(value) {
      if (!value) {
        return ''
      }

      return Math.round(value)
    },
  },
})
