<template>
  <div>
    <div class="background">
      <div class="background__container">
        <h1 class="background__main-title">Application</h1>
      </div>
    </div>

    <navigation-component />
  </div>
</template>

<script lang="ts">
import NavigationComponent from '@/components/header/NavigationComponent.vue'

export default {
  name: 'HeaderComponent',

  components: {
    NavigationComponent,
  },
}
</script>

<style lang="scss">
@import '~assets/variables.scss';

.background {
  background: $primary-color;
}
</style>
