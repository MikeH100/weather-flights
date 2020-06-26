<template>
  <v-card
    class="mx-auto"
    width="400"
    v-if="!isFetching"
  >
  <div class="wrapper-weather">
      <div class="weather_info">
        <span class="temperature">{{ weatherData.main && weatherData.main.temp | round }}</span>
        <span class="low">
          <font-awesome-icon class="icon" icon="temperature-low" /> 
          <span class="icon-text">{{ weatherData.main && weatherData.main.temp_min | round }}</span>
        </span>
        <span class="high">
          <font-awesome-icon class="icon" icon="temperature-high" /> 
          <span class="icon-text">{{ weatherData.main && weatherData.main.temp_max | round }}</span>
        </span>
        <span class="humidity">
          <font-awesome-icon class="icon" icon="tint" /> 
          <span class="icon-text">{{ weatherData.main && weatherData.main.humidity }}</span>
        </span>
      </div>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline">{{weatherData.name}}</v-list-item-title>
          <v-list-item-subtitle class="subtitle">{{weatherData.weather[0].main}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <div class="weather-icon">
        <font-awesome-icon :icon="weatherIcon(weatherData.weather[0].main)" />
      </div>
    </div>
  </v-card>
</template>

<script>
  export default {
    name: 'weather-by-location',
    props: {
      city: String,
    },
    data() {
      return {
        isFetching: true,
      }
    },

    mounted() {
      this.getWeatherData()
    },

    methods: {
      async getWeatherData() {
        try {
          const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=' + this.city + '&units=metric&APPID=62ce3e8206a2bff3c06212b3c702bc9f')
          const data = await response.json()
          this.isFetching = false;
          this.weatherData = data
        } catch (error) {
            // build proper error handling
            console.error(error)
        }
      },
    }
  }
</script>

<style lang="scss">
  @import '~assets/variables.scss';
  .wrapper-weather {
    background: $secondary-color;
    padding: 20px;

    .headline {
      color: $white;
      font-size: 30px;
    }

    .icon {
      color: $white;
    }

    .icon-text {
      color: $white;
    }

    .temperature {
      font-size: 30px;
      font-weight: bold;
      color: $highlight-color; 
    }

    .weather-icon svg {
      height: 100px;
      width: 100px;
      color: $highlight-color; 
    }    

    .weather_info {
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
    }
  }
</style>