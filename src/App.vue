<template>
  <nav class="d-flex gap-2 justify-content-center">
    <router-link to="/">Home</router-link>
    <router-link v-if="isLoggedIn" to="/locations/new">Lisa kiisu</router-link>

    <button v-if="isLoggedIn" type="button" class="btn btn-secondary btn-sm ms-3">
      Logi välja
    </button>

    <button v-else type="button" class="btn btn-secondary btn-sm ms-3">
      Logi sisse / registreeri
    </button>
  </nav>
  <router-view />
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
    }
  }
}
</script>
