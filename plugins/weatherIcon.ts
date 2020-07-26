import Vue from 'vue'

Vue.mixin({
  methods: {
    weatherIcon(weatherState) {
      switch (weatherState) {
        case 'Clear':
          return 'sun'
        case 'Clouds':
          return 'cloud'
        case 'Rain':
          return 'cloud-showers-heavy'
        case 'Thunderstorm':
          return 'bolt'
        case 'Snow':
          return 'cloud-meatball'
        case 'Drizzle':
          return 'cloud-rain'
        case 'Smoke':
        case 'Ash':
        case 'Sand':
        case 'Haze':
        case 'Fog':
        case 'Dust':
        case 'Mist':
          return 'smog'
        case 'Tornado':
        case 'wind':
          return 'wind'
        default:
          return 'question'
      }
    },
  },
})
