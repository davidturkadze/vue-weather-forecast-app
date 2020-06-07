<template>
  <div>
      <h1>Wind status</h1>
      <p>Speed — {{ speed }}; Direction — {{ direction }}</p>
  </div>
</template>

<script>
export default {
    props: ['highlights'],
    data() {
        return {
            speed: this.highlights.windstatus.speed,
            direction: this.highlights.windstatus.direction
        }
    }
}
</script>

<style>

</style>