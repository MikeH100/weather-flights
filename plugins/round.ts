import Vue from 'vue'

Vue.mixin({
  filters: {
    round(value: number) {
      if (!value) {
        return 0
      }

      return Math.round(value)
    },
  },
})
