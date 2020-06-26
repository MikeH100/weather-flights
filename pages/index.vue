<template>
  <div id="app">
    <header-component />
    <div class="content-container">
      <weather-by-location class="weather-location" v-for="location in locations" :key="location.day"
        :city="location.city"
      />
    </div>
  </div>
</template>

<script>
  import WeatherByLocation from '@/components/WeatherByLocation.vue'
  import HeaderComponent from '@/components/header/HeaderComponent.vue'

  export default {
    components: {
      WeatherByLocation,
      HeaderComponent,
    },
    data() {
      return {
        locations: [
          {
            id: 1, 
            city: "Amsterdam"
          }, 
          {
            id: 2, 
            city: "Madrid"
          },
          {
            id: 3, 
            city: "Budapest"
          },
        ],
      }
    },
  }
</script>

<style lang="scss">
  @import '~assets/variables.scss';
  .background {
    background: $primary-color;
  }

  .content-container {
    display: flex;
    margin: 50px;
  }

  .weather-location {
    margin: 0 20px;
  }
</style>