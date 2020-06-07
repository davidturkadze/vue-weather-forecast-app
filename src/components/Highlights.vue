<template>
  <div>
    <h1>Highlights</h1>
    {{highlights}}
    <UVIndex :highlights="highlights" />
    <Visibility :highlights="highlights" />
    <WindStatus :highlights="highlights" />
  </div>
</template>

<script>
import UVIndex from "./UVIndex.vue";
import Visibility from "./Visibility.vue";
import WindStatus from "./WindStatus.vue";
export default {
  props: ["highlights"],
  components: {
    UVIndex,
    Visibility,
    WindStatus
  }
};
</script>

<style>
</style>