<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-8 col-md-6 col-lg-4 d-flex flex-column gap-2">

        <AlertError
            :alert-error-message= 'alertErrorMessage'
            @event-alert-box-closed='resetAlertMessages'
        />

        <div class="home">
          <img
              class="login-cat"
              src="@/assets/illustrations/cat3.jpeg"
              alt="Cat illustration"
          >
        </div>

        <form @submit.prevent="processRegister" novalidate>
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
                placeholder="Parool"
                required
            >
            <label>Parool</label>
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
                :disabled="isPostingData"
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

export default {
  name: 'RegisterView',
  components: {AlertError},
  data() {
    return {
      isPostingData: false,
      passwordRetype: '',
      alertErrorMessage: '',
      alertSuccessMessage: '',

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
      if (this.userInfo.username === '' && this.userInfo.password === '' && this.userInfo.email === '' && this.passwordRetype === '') {
        this.alertErrorMessage = 'Täida kõik väljad'
      } else if (this.userInfo.password !== this.passwordRetype) {
        this.alertErrorMessage = 'Sisestatud paroolid ei kattu'
      } else if (!this.isValidEmail(this.userInfo.email)) {
        this.alertErrorMessage = 'Palun sisesta korrektne e-mail'
      }
    },

    isValidEmail(email) {
      return String(email)
          .toLowerCase()
          .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    },

    resetAlertMessages(){
      this.alertErrorMessage = ''
      this.alertSuccessMessage = ''
    }

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