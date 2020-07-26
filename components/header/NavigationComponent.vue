<template>
  <v-bottom-navigation>
    <v-btn to="/" nuxt value="weather">
      <span>Weather</span>
      <v-icon>mdi-weather-cloudy</v-icon>
    </v-btn>

    <v-btn to="/flights" nuxt value="flights">
      <span>Flights</span>
      <v-icon>mdi-airplane-takeoff</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
export default {
  name: 'NavigationComponent',
}
</script>
