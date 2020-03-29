<template>
  <v-app style="margin-top: 0px">
      <v-content>
        <v-container fluid class="pa-0 ma-0" style="background: #fff">
          <router-view></router-view>
        </v-container>
      </v-content>
  </v-app>
</template>

<script>
  export default {
    components: {
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
