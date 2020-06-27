<template>
  <div>
    <header-component />
    <flights-calculator />
  </div>
</template>

<script lang="ts">
import HeaderComponent from '@/components/header/HeaderComponent.vue'
import FlightsCalculator from '@/components/FlightsCalculator.vue'

export default {
  components: {
    HeaderComponent,
    FlightsCalculator,
  },
}
</script>
