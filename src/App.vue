<template>
  <nav class="d-flex gap-2 justify-content-center">
    <router-link to="/">Home</router-link>
    <router-link v-if="isLoggedIn">Lisa kiisu</router-link>

    <button v-if="isLoggedIn" type="button" class="btn btn-secondary btn-sm ms-3">
      Logi välja
    </button>

    <button v-else @click="navigateToLoginView" type="button" class="btn btn-secondary btn-sm ms-3">
      Logi sisse / registreeri
    </button>
  </nav>
  <router-view @event-user-logged-in ="updateNavMenu" />
</template>
<script>
import navigationService from "@/services/NavigationService";
import SessionStorageService from "@/services/SessionStorageService";

export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
    }
  },

  methods: {

    updateNavMenu(){
      this.isLoggedIn = SessionStorageService.isLoggedIn()
      this.isAdmin = SessionStorageService.isAdmin()
    },

    navigateToLoginView(){
      navigationService.navigateToLoginView()
    }
  }
}
</script>
