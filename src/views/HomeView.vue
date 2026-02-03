<template>
  <div class="home">
    <img class="full-screen-image" src="@/assets/illustrations/cat1.jpeg" alt="Cat illustration">
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {}
  },
  methods: {},
  mounted() {
  }
}
</script>

<style scoped>
.full-screen-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: -1;
}
</style>