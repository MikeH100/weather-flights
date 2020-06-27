<template>
  <div class="flight-wrapper">
    <v-text-field v-model="departure" placeholder="Departure" hint="For exampe: AMS, MAD, BUD"></v-text-field>
    <v-text-field v-model="destination" placeholder="Destination" hint="For exampe: AMS, MAD, BUD"></v-text-field>

    <v-progress-circular
      v-if="isFetching"
      indeterminate
      color="red"
    ></v-progress-circular>

    <v-btn large v-on:click="calculate">Calculate</v-btn>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Depature</th>
            <th class="text-left">Arrival</th>
            <th class="text-left">Lowest found price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ departureCity }}</td>
            <td>{{ arrivalCity }}</td>
            <td>{{ lowest }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
  // To do
  // getFlightsData call is to heavy. Change it to get only information we want from the server.
  // No handling if user selects wrong airfields.
  // Improve UI for selecting airfields. Error prone.
  export default {
    name: 'flights-calculator',
    data: () => ({
      departureCity: "",
      arrivalCity: "",
      lowest: "",
      departure: "",
      destination: "",
      isFetching: false
    }),

    methods: {
      calculate: function () {
        this.getFlightsData();
      },

      async getFlightsData() {
        try {
          this.isFetching = true;
          const response = await fetch('https://api.skypicker.com/flights?flyFrom=' + this.destination + '&to=' + this.departure + '&dateFrom=18/11/2020&dateTo=12/12/2020&partner=picky&v=3')
          const data = await response.json()
          this.lowest = this.getLowestPrice(data.data);
          this.flightData = data
          this.departureCity = data.data[0].cityFrom;
          this.arrivalCity = data.data[0].cityTo;
          this.isFetching = false;
        } catch (error) {
            // build proper error handling
            console.error(error)
        }
      },

      getLowestPrice(data) {
        var lowest = Number.POSITIVE_INFINITY;
        var highest = Number.NEGATIVE_INFINITY;
        var tmp;
        for (var i = data.length-1; i >= 0; i--) {
            tmp = data[i].price;
            if (tmp < lowest) lowest = tmp;
        }
        return lowest;
      }
    }
  }
</script>

<style lang="scss">
  @import '~assets/variables.scss';

  .text-left {
    text-align: left;
  }

  .v-progress-circular {
    margin: 1rem;
    color: $primary-color;
    display: block;
  }
</style>