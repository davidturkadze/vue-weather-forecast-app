<template>
  <div>
      <h1>Visibility</h1>
      {{visibility}}
  </div>
</template>

<script>
export default {
    props: ['highlights'],
    data() {
        return {
            visibility: this.highlights.visibility
        }
    }
}
</script>

<style>

</style>