<template>
  <div id="app">
    <div class="content-container">
      <v-row no-gutters>
        <v-col
          v-for="location in locations"
          :key="location.day"
          cols="12"
          sm="4"
        >
          <weather-by-location class="weather-location" :city="location.city" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
// To do
// Make this a home page and create a weather page
// Cities are hardcoded. Change that.
import WeatherByLocation from '@/components/WeatherByLocation.vue'

type DataType = {
  locations: { id: number; city: string }[]
}

export default {
  components: {
    WeatherByLocation,
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
  margin-top: 30px;
}

.weather-location {
  margin: 0 20px;
}
</style>
