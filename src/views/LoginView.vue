<template>
  <div class="container text-center mt-3">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-8 col-md-6 col-lg-4">

        <div class="home">
          <img class="login-cat" src="@/assets/illustrations/cat3.jpeg" alt="Cat illustration">
        </div>

        <AlertError :alert-error-message="alertErrorMessage" @event-alert-box-closed="resetAlertMessage"/>

        <div class="form-floating mb-3">
          <input v-model="loginRequest.username" type="text" class="form-control" id="username"
                 placeholder="Kasutajanimi">
          <label for="username">Kasutajanimi</label>
        </div>

        <div class="form-floating mb-3">
          <input v-model="loginRequest.password" type="password" class="form-control" id="password"
                 placeholder="Parool">
          <label for="password">Parool</label>
        </div>

        <div class="d-grid gap-2">
          <button @click="processLogin" type="button" class="btn btn-secondary" :disabled="isFetchingData">
            <span v-if="isFetchingData" class="spinner-border spinner-border-sm me-1" aria-hidden="true"></span>
            Logi sisse
          </button>
        </div>

        <div class="mt-3">
          <button @click="navigateToRegisterView" type="button" class="btn btn-link">Registreeri</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import LoginService from "@/services/LoginService";
import AlertError from "@/components/AlertError.vue";
import NavigationService from "@/services/NavigationService";

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

    processLogin() {
      if (this.allFieldsHaveCorrectInput()) {
        this.executeLogin();
      } else {
        this.displayIncorrectInputAlert();
      }
    },

    allFieldsHaveCorrectInput() {
      return this.loginRequest.username !== '' && this.loginRequest.password !== '';
    },

    executeLogin() {
      this.startSpinner();
      LoginService.sendPostLoginRequest(this.loginRequest.username, this.loginRequest.password)
          .then(response => this.handleLoginResponse(response))
          .catch(error => this.handleLoginError(error))
          .finally(() => this.isFetchingData = false)
    },

    startSpinner() {
      this.isFetchingData = true
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
      return error.response.status === 403 && this.errorResponse.errorCode === 111;
    },

    displayIncorrectInputAlert() {
      this.alertErrorMessage = 'Täida kõik väljad'
    },

    navigateToRegisterView() {
      NavigationService.navigateToRegisterView()
    },

    resetAlertMessage() {
      this.alertErrorMessage = ''
    },

  }
}
</script>

<style scoped>
.login-cat {
  max-width: 400px;
  width: 100%;
  height: auto;
}
</style>