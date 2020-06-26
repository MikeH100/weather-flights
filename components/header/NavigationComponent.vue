 <template>
    <v-bottom-navigation>
      <v-btn value="weather">
      <nuxt-link to="/">Weather</nuxt-link>
        <v-icon>mdi-weather-cloudy</v-icon>
      </v-btn>

      <v-btn value="flights">
      <nuxt-link to="/flights">Flights</nuxt-link>
      <v-icon>mdi-airplane-takeoff</v-icon>
      </v-btn>
    </v-bottom-navigation>
</template>

<script>
  export default {
    name: 'navigation-component',
  }
</script>