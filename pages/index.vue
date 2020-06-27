<template>
  <div id="app">
    <header-component />
    <div class="content-container">
      <weather-by-location
        v-for="location in locations"
        :key="location.day"
        class="weather-location"
        :city="location.city"
      />
    </div>
  </div>
</template>

<script lang="ts">
// To do
// Make this a home page and create a weather page
// Cities are hardcoded. Change that.
import WeatherByLocation from '@/components/WeatherByLocation.vue'
import HeaderComponent from '@/components/header/HeaderComponent.vue'

type DataType = {
  locations: { id: number; city: string }[]
}

export default {
  components: {
    WeatherByLocation,
    HeaderComponent,
  },
  data(): DataType {
    return {
      locations: [
        {
          id: 1,
          city: 'Amsterdam',
        },
        {
          id: 2,
          city: 'Madrid',
        },
        {
          id: 3,
          city: 'Budapest',
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
