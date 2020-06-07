<template>
  <div class="hourly">
      <p>Temperature Information:</p>
      {{hourlyTemp.hourly[1]}}
  </div>
</template>

<script>
export default {
    props: ['hourlyTemp'],
}
</script>

<style>

</style>