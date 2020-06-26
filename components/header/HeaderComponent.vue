<template>
  <div>
    <div class="background">
      <div class="container">
          <h1 class="main-title">Application</h1>
      </div>
    </div>

    <navigation-component />
  </div>
</template>

<script>
  import NavigationComponent from '@/components/header/NavigationComponent.vue'
  
  export default {
    name: 'header-component',
  
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