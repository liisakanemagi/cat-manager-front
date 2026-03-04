<template>
  <nav class="d-flex gap-2 justify-content-center">
    <router-link to="/">Avaleht</router-link>

    <CatDropDown
        v-if="isLoggedIn"
        :cats="cats"
        :selected-cat-id="cats.id"
        @event-new-cat-selected="setNewCatId"
    />

    <router-link to="/cat/new" v-if="isLoggedIn">Lisa kass</router-link>

    <button v-if="isLoggedIn" @click="logOut" type="button" class="btn btn-secondary btn-sm ms-3">
      Logi välja
    </button>

    <button v-else @click="navigateToLoginView" type="button" class="btn btn-secondary btn-sm ms-3">
      Logi sisse / registreeri
    </button>
  </nav>
  <router-view @event-user-logged-in="updateNavMenu"/>
</template>
<script>
import navigationService from "@/services/NavigationService";
import SessionStorageService from "@/services/SessionStorageService";
import CatDropDown from "@/components/Cat/CatDropDown.vue";
import catService from "@/services/CatService";

export default {
  name: 'App',
  components: {CatDropDown},

  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,

      cats: [
        {
          id: 0,
          name: '',
          statusId: 0,
          sex: '',
          arrivedAt: '',
          birthday: '',
          weight: 0,
          chipNumber: '',
          healthInfo: '',
          otherInfo: '',
          imageData: '',
        }
      ],

    }
  },

  methods: {

    logOut() {
      sessionStorage.clear()
      this.updateNavMenu()
      navigationService.navigateToHomeView()
    },

    updateNavMenu() {
      this.isLoggedIn = SessionStorageService.isLoggedIn()
      this.isAdmin = SessionStorageService.isAdmin()
      if (this.isLoggedIn) {
        this.getCats()
      }
    },

    navigateToLoginView() {
      navigationService.navigateToLoginView()
    },

    async getCats() {
      try {
        const response = await catService.sendGetCatsRequest()
        this.cats = response.data
      } catch (error) {
        navigationService.navigateToErrorView()
      }
    },

    setNewCatId(selectedCatId) {
      this.cats.id = selectedCatId
    },
  },

  mounted() {
    this.updateNavMenu()
  }
}
</script>
