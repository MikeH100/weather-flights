import Vue from 'vue'

Vue.mixin({
    filters: {
        round: function (value) {
            if (!value) {
              return ''
            }
      
            return Math.round(value)
        }
    }
})