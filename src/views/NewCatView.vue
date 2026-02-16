<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col-12">

        <AlertError
            :alert-error-message='alertErrorMessage'
            @event-alert-box-closed='resetAlertMessages'
        />

        <AlertSuccess
            :alert-success-message='alertSuccessMessage'
            @event-alert-box-closed='resetAlertMessages'
        />
      </div>
    </div>

    <form v-if="displayAllFields" @submit.prevent novalidate>
      <div class="row">
        <div class="col-12 col-md-4 d-flex align-items-center justify-content-center mb-3">
          <div class="home">
            <img
              class="login-cat img-fluid"
              src="@/assets/illustrations/cat4.jpeg"
              alt="Cat illustration"
            >
          </div>
        </div>

        <div class="col-12 col-md-2 d-flex flex-column gap-2">
          <div class="form-floating">
            <input
                v-model="cat.name"
                type="text"
                class="form-control"
                placeholder="Kassinimi"
                required
                maxlength="50"
            >
            <label>Kassi nimi</label>
          </div>

          <CatStatusDropDown/>

        </div>

        <div class="col-12 col-md-4 d-flex flex-column gap-2">
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
              Lisa
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import AlertError from "@/components/AlertError.vue";
import AlertSuccess from "@/components/AlertSuccess.vue";
import CatStatusDropDown from "@/components/CatStatusDropDown.vue";

export default {
  name: 'NewCatView',
  components: {CatStatusDropDown, AlertSuccess, AlertError},
  data() {
    return {

      userId: Number(sessionStorage.getItem('usedId')),
      isPostingData: false,
      displayAllFields: true,
      alertErrorMessage: '',
      alertSuccessMessage: '',

      cat: {
        name: '',
        statusId: 0,
        arrivedAt: '',
        birthday: '',
        weight: 0,
        sex: '',
        chipNumber: '',
        healthInfo: '',
        otherInfo: '',
        imageData: '',
      },

      catStatuses:
          [
            {
              id: '',
              label: ''
            }
          ],

      errorResponse: {
        message: '',
        errorCode: 0
      },

    }
  },
  methods: {

    resetAlertMessages() {
      this.alertErrorMessage = ''
      this.alertSuccessMessage = ''
    },

  },
  mounted() {
  }
}
</script>