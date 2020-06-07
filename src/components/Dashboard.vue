<template>
  <div>
    <p>Hourty Temp Chart</p>
    
    <HourlyTempChart :hourlyTemp="hourlyTemp"/>
    <Highlights :highlights="highlights"/>
  </div>
</template>

<script>
import HourlyTempChart from "./HourlyTempChart";
import Highlights from "./Highlights";
export default {
  components: {
    HourlyTempChart,
    Highlights
  },
  props: ['hourlyTemp', 'highlights']
};
</script>

<style>
.content {
  border: 1px solid black;
  padding: 2px;
}
</style>