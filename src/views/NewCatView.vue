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

        <div class="col-12 col-md-3 d-flex flex-column gap-2">
          <div class="form-floating">
            <input
                v-model="cat.name"
                type="text"
                class="form-control"
                placeholder="Kassinimi"
                required
                maxlength="50"
            >
            <label>Kassi nimi*</label>
          </div>

          <CatStatusDropDown
              :cat-statuses="catStatuses"
              @even-new-status-selected="setNewCatStatusId"
          />

          <div class="form-floating">
            <input
                v-model="cat.arrivedAt"
                type="date"
                class="form-control"
                placeholder="Saabumise aeg"
            >
            <label>Saabumise aeg</label>
          </div>

          <div class="form-floating">
            <input
                v-model="cat.weight"
                type="number"
                class="form-control"
                placeholder="Kaal"
                step="0.01"
                min="0"
                max="99.99"
                @input="validateWeight"
            >
            <label>Kaal</label>
          </div>

          <CatSexDropdown
              @event-sex-selected="setCatSex"
          />

          <div class="form-floating">
            <input
                v-model="cat.chipNumber"
                type="text"
                class="form-control"
                placeholder="Kiibinumber - 15 numbrit"
                required
                maxlength="15"
                minlength="15"
                @input ="validateChipNumber"
            >
            <label>Kiibinumber - 15 numbrit</label>
          </div>
        </div>

        <div class="col-12 col-md-4 d-flex flex-column gap-2">
          <div class="d-grid gap-2 mt-3">

            <div class="form-floating">
              <input
                  v-model="cat.name"
                  type="text"
                  class="form-control"
                  placeholder="Kassinimi"
                  required
                  maxlength="50"
              >
              <label>Kassi nimi*</label>
            </div>

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
import CatStatusService from "@/services/CatStatusService";
import NavigationService from "@/services/NavigationService";
import CatSexDropdown from "@/components/CatSexDropdown.vue";

export default {
  name: 'NewCatView',
  components: {CatSexDropdown, CatStatusDropDown, AlertSuccess, AlertError},
  data() {
    return {

      userId: Number(sessionStorage.getItem('userId')),
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

    setCatSex(selectedSex) {
      this.cat.sex = selectedSex
    },


    validateWeight(){
      if (!this.cat.weight) return

      let value = String(this.cat.weight)

      if (value.includes('.')) {
        const parts = value.split('.')
        if (parts[0].length > 2) parts[0] = parts[0].slice(0, 2)

        if (parts[1].length > 2) parts[1] = parts[1].slice(0, 2)

        this.cat.weight = parts.join('.')
      } else {
        if (value.length > 2) {
          this.cat.weight = value.slice(0, 2)
        }
      }
    },

    validateChipNumber(){
      if(this.cat.chipNumber){
        this.cat.chipNumber = this.cat.chipNumber.replace(/[^0-9]/g, '')
      }

    },

    setNewCatStatusId(selectedCatStatusId) {
      this.cat.statusId = selectedCatStatusId
    },

    resetAlertMessages() {
      this.alertErrorMessage = ''
      this.alertSuccessMessage = ''
    },

    async getCatStatuses() {
      try {
        const response = await CatStatusService.sendGetCatStatusesRequest()
        this.catStatuses = response.data
      } catch (error) {
        NavigationService.navigateToErrorView()
      }
    },
  },


  mounted() {

    this.getCatStatuses()
  }
}
</script>