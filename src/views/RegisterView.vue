<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-8 col-md-6 col-lg-4 d-flex flex-column gap-2">

        <AlertError
            :alert-error-message='alertErrorMessage'
            @event-alert-box-closed='resetAlertMessages'
        />

        <div class="home">
          <img
              class="login-cat"
              src="@/assets/illustrations/cat3.jpeg"
              alt="Cat illustration"
          >
        </div>

        <AlertSuccess
            :alert-success-message='alertSuccessMessage'
            @event-alert-box-closed='resetAlertMessages'
        />

        <form v-if="displayAllFields" @submit.prevent="processRegister" novalidate>
          <div class="form-floating">
            <input
                v-model="userInfo.username"
                type="text"
                class="form-control"
                placeholder="Kasutajanimi"
                required
            >
            <label>Kasutajanimi</label>
          </div>

          <div class="form-floating">
            <input
                v-model="userInfo.email"
                type="email"
                class="form-control"
                placeholder="Email"
                required
            >
            <label>Email</label>
          </div>

          <div class="form-floating">
            <input
                v-model="userInfo.password"
                type="password"
                class="form-control"
                placeholder="Parool (vähemalt 8 tähemärki, 1 number)"
                required
            >
            <label>Parool (vähemalt 8 tähemärki + number)</label>
          </div>

          <div class="form-floating">
            <input
                v-model="passwordRetype"
                type="password"
                class="form-control"
                placeholder="Korda parooli"
                required
            >
            <label>Korda parooli</label>
          </div>

          <div class="d-grid gap-2 mt-3">
            <button
                type="submit"
                class="btn btn-secondary"
                :disabled="isPostingData || !allFieldsHaveInput()"
            >
              <span
                  v-if="isPostingData"
                  class="spinner-border spinner-border-sm me-2"
                  aria-hidden="true"
              ></span>
              Registreeri
            </button>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>


<script>
import AlertError from "@/components/AlertError.vue";
import RegisterService from "@/services/RegisterService";
import AlertSuccess from "@/components/AlertSuccess.vue";
import NavigationService from "@/services/NavigationService";
import navigationService from "@/services/NavigationService";
import {EMAIL_ALREADY_EXISTS, USERNAME_ALREADY_EXISTS} from "@/constants/ErrorCodes";

export default {
  name: 'RegisterView',
  components: {AlertSuccess, AlertError},
  data() {
    return {
      isPostingData: false,
      passwordRetype: '',
      alertErrorMessage: '',
      alertSuccessMessage: '',
      displayAllFields: true,

      userInfo: {
        username: '',
        password: '',
        email: ''
      },

      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },

  methods: {

    processRegister() {
      if (!this.isValidEmail(this.userInfo.email)) {
        this.displayEmailIsNotValidAlert();
      } else if (!this.isValidPassword(this.userInfo.password)) {
        this.displayPasswordNotValidAlert();
      } else if (!this.passwordsAreMatching()) {
        this.displayPasswordsNotMatchingAlert();
      } else {
        this.executeRegister()
      }
    },

    passwordsAreMatching() {
      return this.userInfo.password === this.passwordRetype;
    },

    isValidEmail(email) {
      const emailRegex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(String(email).toLowerCase());
    },


    isValidPassword(password) {
      if (password.length < 8) {
        return false;
      }
      const hasNumber = /\d/;
      return hasNumber.test(password);
    },

    async executeRegister() {
      this.isPostingData = true
      try {
        await RegisterService.sendPostRegisterRequest(this.userInfo)
        this.handleRegisterResponse()
      } catch (error) {
        this.handleRegisterError(error)
      } finally {
        this.isPostingData = false
      }

    },

    handleRegisterResponse() {
      this.alertSuccessMessage = 'Uus kasutaja "' + this.userInfo.username + '" registreeritud!'
      this.displayAllFields = false
      setTimeout(NavigationService.navigateToHomeView, 4000)
    },

    handleRegisterError(error) {
      this.errorResponse = error.response.data
      if (this.userAlreadyExists(error)) {
        this.alertErrorMessage = this.errorResponse.message
      } else if(this.emailAlreadyExists(error)) {
        this.alertErrorMessage = this.errorResponse.message
      } else {
        navigationService.navigateToErrorView()
      }
    },

    userAlreadyExists(error) {
      return error.response.status === 403 && this.errorResponse.errorCode === USERNAME_ALREADY_EXISTS
    },

    emailAlreadyExists(error) {
      return error.response.status === 403 && this.errorResponse.errorCode === EMAIL_ALREADY_EXISTS
    },

    resetAlertMessages() {
      this.alertErrorMessage = ''
      this.alertSuccessMessage = ''
    },

    allFieldsHaveInput() {
      return this.userInfo.username !== '' && this.userInfo.password !== '' && this.userInfo.email !== '' && this.passwordRetype !== '';
    },

    displayEmailIsNotValidAlert() {
      this.alertErrorMessage = 'Palun sisesta toimiv e-mail'
    },

    displayPasswordNotValidAlert() {
      this.alertErrorMessage = 'Parool peab olema vähemalt 8 tähemärki pikk ja sisaldama vähemalt ühte numbrit'
    },

    displayPasswordsNotMatchingAlert() {
      this.alertErrorMessage = 'Sisestatud paroolid ei kattu'
    },


  },

}
</script>

<style scoped>
.login-cat {
  max-width: 300px;
  width: 100%;
  height: auto;
}
</style>