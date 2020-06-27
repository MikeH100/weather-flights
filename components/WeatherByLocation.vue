<template>
  <v-card v-if="!isFetching" class="mx-auto" width="400">
    <div class="weather">
      <div class="weather__info">
        <span class="weather__temperature">{{
          weatherData.main && weatherData.main.temp | round
        }}</span>
        <span>&#8451;</span>
        <span class="weather__low">
          <font-awesome-icon class="weather__icon" icon="temperature-low" />
          <span class="weather__icon_text">{{
            weatherData.main && weatherData.main.temp_min | round
          }}</span>
        </span>
        <span class="weather__high">
          <font-awesome-icon class="weather__icon" icon="temperature-high" />
          <span class="weather__icon_text">{{
            weatherData.main && weatherData.main.temp_max | round
          }}</span>
        </span>
        <span class="weather__humidity">
          <font-awesome-icon class="weather__icon" icon="tint" />
          <span class="weather__icon_text">{{
            weatherData.main && weatherData.main.humidity
          }}</span>
        </span>
      </div>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="weather__headline">{{
            weatherData.name
          }}</v-list-item-title>
          <v-list-item-subtitle class="weather__subtitle">{{
            weatherData.weather[0].main
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <div class="weather__icon_main">
        <font-awesome-icon :icon="weatherIcon(weatherData.weather[0].main)" />
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
// To do
// Make responsive.
// Add error handling when calls fail.
import Vue from 'vue'

type DataType = {
  weatherData: {}
  isFetching: boolean
}

export default Vue.extend({
  name: 'WeatherByLocation',
  props: {
    city: {
      type: String,
      default: '',
    },
  },
  data(): DataType {
    return {
      weatherData: {},
      isFetching: true,
    }
  },

  mounted() {
    this.getWeatherData()
  },

  methods: {
    async getWeatherData() {
      try {
        const response = await fetch(`
          http://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&APPID=62ce3e8206a2bff3c06212b3c702bc9f`)
        const responseData = await response.json()

        this.isFetching = false
        this.weatherData = responseData
      } catch (error) {
        // build proper error handling
        console.error(error)
      }
    },
  },
})
</script>

<style lang="scss">
@import '~assets/variables.scss';

.weather {
  background: $secondary-color;
  padding: 20px;

  &__info {
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  &__temperature {
    font-size: 30px;
    font-weight: bold;
    color: $highlight-color;
  }

  &__icon_text {
    color: $white;
  }

  &__icon {
    color: $white;
  }

  &__icon_main svg {
    height: 100px;
    width: 100px !important;
    color: $highlight-color;
  }

  &__headline {
    color: $white;
    font-size: 30px;
  }
}
</style>
