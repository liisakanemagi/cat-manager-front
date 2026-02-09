<template>
  <div class="container text-center mt-3">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-8 col-md-6 col-lg-4 d-flex flex-column gap-2">

        <div class="home">
          <img
              class="login-cat"
              src="@/assets/illustrations/cat3.jpeg"
              alt="Cat illustration"
          >
        </div>

        <AlertError
            :alert-error-message="alertErrorMessage"
            @event-alert-box-closed="resetAlertMessage"
        />

        <form @submit.prevent="executeLogin" novalidate>
          <div class="form-floating">
            <input
                v-model="loginRequest.username"
                type="text"
                class="form-control"
                placeholder="Kasutajanimi"
                required
            >
            <label>Kasutajanimi</label>
          </div>

          <div class="form-floating">
            <input
                v-model="loginRequest.password"
                type="password"
                class="form-control"
                placeholder="Parool"
                required
            >
            <label>Parool</label>
          </div>

          <div class="d-grid gap-2 mt-3">
            <button
                type="submit"
                class="btn btn-secondary"
                :disabled="isFetchingData || !allFieldsHaveInput()"
            >
              <span
                  v-if="isFetchingData"
                  class="spinner-border spinner-border-sm me-1"
                  aria-hidden="true"
              ></span>
              Logi sisse
            </button>
          </div>
        </form>

        <div class="mt-2">
          <button
              @click="navigateToRegisterView"
              type="button"
              class="btn btn-link"
          >
            Registreeri
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import LoginService from "@/services/LoginService";
import AlertError from "@/components/AlertError.vue";
import NavigationService from "@/services/NavigationService";
import {INVALID_CREDENTIALS_ERROR} from "@/constants/ErrorCodes";

export default {
  name: 'LoginView',
  components: {AlertError},
  data() {
    return {

      isFetchingData: false,
      alertErrorMessage: '',

      loginRequest: {
        username: '',
        password: '',
      },

      loginResponse: {
        userId: 0,
        userRole: '',
        token: '',
      },

      errorResponse: {
        message: '',
        errorCode: 0
      }

    }
  },

  methods: {

    async executeLogin() {
      this.isFetchingData = true;
      try {
        const response = await LoginService.sendPostLoginRequest( this.loginRequest.username, this.loginRequest.password);
        this.handleLoginResponse(response);
      } catch (error) {
        this.handleLoginError(error);
      } finally {
        this.isFetchingData = false;
      }
    },


    handleLoginResponse(response) {
      this.loginResponse = response.data;
      this.setSessionStorageItems();
      this.updateNavMenuUserIsLoggedIn();
      NavigationService.navigateToHomeView()
    },

    setSessionStorageItems() {
      sessionStorage.setItem('userId', this.loginResponse.userId)
      sessionStorage.setItem('userRole', this.loginResponse.userRole)
      sessionStorage.setItem('token', this.loginResponse.token)
    },

    updateNavMenuUserIsLoggedIn() {
      this.$emit('event-user-logged-in')
    },

    handleLoginError(error) {
      if (error.response && error.response.data) {
        this.errorResponse = error.response.data
        if (this.incorrectCredentialsInput(error)) {
          this.alertErrorMessage = this.errorResponse.message
        } else {
          NavigationService.navigateToErrorView()
        }
      }
    },

    incorrectCredentialsInput(error) {
      return error.response.status === 403 && this.errorResponse.errorCode === INVALID_CREDENTIALS_ERROR;
    },

    navigateToRegisterView() {
      NavigationService.navigateToRegisterView()
    },

    allFieldsHaveInput() {
      return this.loginRequest.username !== '' && this.loginRequest.password !== '';
    },

    resetAlertMessage() {
      this.alertErrorMessage = ''
    },

  }
}
</script>

<style scoped>
.login-cat {
  max-width: 300px;
  width: 100%;
  height: auto;
}
</style>