<template>
  <div id="app">
    <p>This component’s code is in {{ filename }}</p>
  </div>
</template>

<script>

export default {
  name: "App",
  components: {
    
  },
  data() {
    return {
      filename: 'App.vue'
    }
  },
  methods: {

  },
  computed: {

  }
};
</script>

<style>
  @import './assets/css/style.css';
</style>
