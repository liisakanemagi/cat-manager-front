<template>

  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h3> Midagi läks valesti :(</h3>
        <img class="error-gif" src="@/assets/illustrations/error.gif" alt="Cat illustration">
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'ErrorView',
}
</script>

<style scoped>
.error-gif {
  max-width: 400px;
  width: 100%;
  height: auto;
}
</style>