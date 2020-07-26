<template>
  <div class="flight_wrapper">
    <v-form v-model="valid">
      <v-text-field
        v-model="dateStart"
        label="Departure Date"
        type="date"
        :rules="dateRules"
        required
      >
      </v-text-field>
      <v-text-field
        v-model="dateEnd"
        label="Arrival Date"
        :min="dateStart"
        type="date"
        :rules="dateRules"
        required
      >
      </v-text-field>

      <v-text-field
        v-model="departure"
        label="Departure Location (Airport code)"
        placeholder="Departure"
        hint="For exampe: AMS, MAD, BUD"
        counter="3"
        :rules="rules"
        required
      ></v-text-field>

      <v-text-field
        v-model="destination"
        label="Arrival Location (Airport code)"
        placeholder="Destination"
        hint="For exampe: AMS, MAD, BUD"
        counter="3"
        :rules="rules"
        required
      ></v-text-field>

      <v-progress-circular
        v-if="isFetching"
        indeterminate
      ></v-progress-circular>

      <span class="flight_wrapper__button-style">
        <v-btn
          :disabled="
            !dateStart ||
            !dateEnd ||
            !departure ||
            !destination ||
            departure.length > 3 ||
            destination.length > 3
          "
          large
          @click="calculate"
          >Calculate</v-btn
        >
      </span>
    </v-form>

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
// No error handling if user selects wrong airfields. Also would change so the user can input airport names. Not airport code.
// Improve ui for selecting airfields. error prone.
// Only selecting dates programatically.
// Create proper handling of error scenario's.
import Vue from 'vue'
import { InputValidationRules } from 'vuetify'

type DataType = {
  // using any since we're getting data from an external API. Normally it's best to not use any
  valid: Boolean
  flightData: { [key: string]: any }
  departureCity: string
  arrivalCity: string
  lowest: number
  departure: string
  destination: string
  isFetching: boolean
  dateStart: string
  dateEnd: string
  dateStartCorrectFormat: string
  dateEndCorrectFormat: string
  dateRules: InputValidationRules
  rules: InputValidationRules
}

export default Vue.extend({
  name: 'FlightsCalculator',
  data: (): DataType => ({
    valid: false,
    flightData: {},
    departureCity: '',
    arrivalCity: '',
    lowest: 0,
    departure: '',
    destination: '',
    isFetching: false,
    dateStart: '',
    dateEnd: '',
    dateStartCorrectFormat: '',
    dateEndCorrectFormat: '',
    dateRules: [(v: String) => !!v || 'Field is required'],
    rules: [
      (v: String) => !!v || 'Field is required',
      (v: String) => v.length <= 3 || 'Max 3 characters',
    ],
  }),

  watch: {
    dateStart() {
      this.dateEnd = ''
    },
  },

  methods: {
    calculate() {
      this.lowest = 0
      this.getFlightsData()
    },

    async getFlightsData() {
      // Temporary solution. Normally would get the date field in the correct format.
      this.dateStartCorrectFormat = new Date(this.dateStart).toLocaleDateString(
        'en-GB'
      )
      this.dateEndCorrectFormat = new Date(this.dateEnd).toLocaleDateString(
        'en-GB'
      )

      try {
        this.isFetching = true
        this.flightData = {}
        this.departureCity = ''
        this.arrivalCity = ''

        const response = await fetch(
          `https://api.skypicker.com/flights?flyFrom=${this.departure}&to=${this.destination}&dateFrom=${this.dateStartCorrectFormat}&dateTo=${this.dateEndCorrectFormat}&partner=picky&v=3`
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
