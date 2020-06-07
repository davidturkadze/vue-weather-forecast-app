<template>
  <div>
      <h1>UV index</h1>
      {{uvindex}}
  </div>
</template>

<script>
export default {
    props: ['highlights'],
    data() {
        return {
            uvindex: this.highlights.uvindex
        }
    }
}
</script>

<style>

</style>