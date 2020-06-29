<template>
  <div class="flight_wrapper">
    <v-text-field
      v-model="departure"
      placeholder="Departure"
      hint="For exampe: AMS, MAD, BUD"
    ></v-text-field>
    <v-text-field
      v-model="destination"
      placeholder="Destination"
      hint="For exampe: AMS, MAD, BUD"
    ></v-text-field>

    <v-progress-circular
      v-if="isFetching"
      indeterminate
      color="red"
    ></v-progress-circular>

    <span class="flight_wrapper__button-style">
      <v-btn large @click="calculate">Calculate</v-btn>
    </span>

    <v-simple-table>
      <thead>
        <tr>
          <th class="flight_wrapper__text_left">Depature</th>
          <th class="flight_wrapper__text_left">Arrival</th>
          <th class="flight_wrapper__text_left">Lowest found price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ departureCity }}</td>
          <td>{{ arrivalCity }}</td>
          <td v-if="lowest !== 0">{{ lowest }}</td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script lang="ts">
// To do
// Get flightsData call is to heavy. Would normally change it to only get the information I need.
// No error handling if user selects wrong airfields.
// Improve ui for selecting airfields. error prone.
// Only selecting dates programatically.
import Vue from 'vue'

type DataType = {
  // using any since we're getting data from an external API. Normally it's best to not use any
  flightData: { [key: string]: any }
  departureCity: string
  arrivalCity: string
  lowest: number
  departure: string
  destination: string
  isFetching: boolean
  todaysDate: Date
  tomorrowsDate: Date
}

export default Vue.extend({
  name: 'FlightsCalculator',
  data: () => ({
    flightData: {},
    departureCity: '',
    arrivalCity: '',
    lowest: 0,
    departure: '',
    destination: '',
    isFetching: false,
    todaysDate: new Date().toLocaleDateString('en-GB'),
    tomorrowsDate: new Date(Date.now() + 1000 * 3600 * 24).toLocaleDateString(
      'en-GB'
    ),
  }),

  methods: {
    calculate() {
      this.lowest = 0
      this.getFlightsData()
    },

    async getFlightsData() {
      try {
        this.isFetching = true
        this.flightData = {}
        this.departureCity = ''
        this.arrivalCity = ''

        const response = await fetch(
          `https://api.skypicker.com/flights?flyFrom=${this.departure}&to=${this.destination}&dateFrom=${this.todaysDate}&dateTo=${this.tomorrowsDate}&partner=picky&v=3`
        )

        const responseData = await response.json()
        this.lowest = this.getLowestPrice(responseData.data)
        this.flightData = responseData
        this.departureCity = responseData.data[0].cityFrom
        this.arrivalCity = responseData.data[0].cityTo
        this.isFetching = false
      } catch (error) {
        // build proper error handling
        this.isFetching = false
        console.error(error)
      }
    },
    getLowestPrice(data: { [key: string]: any }): number {
      let lowest = Number.POSITIVE_INFINITY
      let tmp

      for (let i = data.length - 1; i >= 0; i--) {
        tmp = data[i].price
        if (tmp < lowest) lowest = tmp
      }

      return lowest
    },
  },
})
</script>

<style lang="scss">
@import '~assets/variables.scss';

.flight_wrapper {
  padding: 2em;
  &__text_left {
    text-align: left;
  }

  &__button-style {
    display: inline-block;
    margin: 1em 0;
  }
}

.v-progress-circular {
  margin: 1rem;
  color: $primary-color;
  display: block;
}
</style>
