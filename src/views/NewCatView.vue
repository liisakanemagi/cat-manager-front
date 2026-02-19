<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col-12 col-md-3">

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

    <form @submit.prevent="processAddCat" novalidate>
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
              :key="componentKey"
              :cat-statuses="catStatuses"
              @event-new-status-selected="setNewCatStatusId"
          />

          <CatSexDropdown
              :key="componentKey"
              @event-sex-selected="setCatSex"
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
                v-model="cat.birthday"
                type="date"
                class="form-control"
                placeholder="Sünnipäev"
            >
            <label>Sünnipäev</label>
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

        </div>

        <div class="col-12 col-md-4 d-flex flex-column gap-2">
          <div class="form-floating">
            <input
                v-model="cat.chipNumber"
                type="text"
                class="form-control"
                placeholder="Kiibinumber - 15 numbrit"
                maxlength="15"
                minlength="15"
                @input="validateChipNumber"
            >
            <label>Kiibinumber - 15 numbrit</label>
          </div>

          <div class="form-floating">
              <textarea
                  v-model="cat.healthInfo"
                  class="form-control"
                  placeholder="Terviseinfo"
                  maxlength="500"
                  style="height: 112px"
              ></textarea>
            <label>Terviseinfo</label>
          </div>

          <div class="form-floating">
              <textarea
                  v-model="cat.otherInfo"
                  class="form-control"
                  placeholder="Muu info"
                  maxlength="500"
                  style="height: 112px"
              ></textarea>
            <label>Muu info</label>
          </div>

          <ImageInput
              ref="Image Input"
              :key="componentKey"
              @event-new-image-selected="handleImageSelected"
              @event-chosen-image-cleared="clearImage"
          />

        </div>
      </div>

      <div class="row justify-content-center">
        <div class="d-grid gap-2 mt-3">

          <div class="col-12">
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
import AlertError from "@/components/Alert/AlertError.vue";
import AlertSuccess from "@/components/Alert/AlertSuccess.vue";
import CatStatusDropDown from "@/components/Cat/CatStatusDropDown.vue";
import CatStatusService from "@/services/CatStatusService";
import NavigationService from "@/services/NavigationService";
import navigationService from "@/services/NavigationService";
import CatSexDropdown from "@/components/Cat/CatSexDropdown.vue";
import ImageInput from "@/components/Image/ImageInput.vue";
import CatService from "@/services/CatService";
import {CAT_AlREADY_EXISTS} from "@/constants/ErrorCodes";

export default {
  name: 'NewCatView',
  components: {ImageInput, CatSexDropdown, CatStatusDropDown, AlertSuccess, AlertError},
  data() {
    return {

      userId: Number(sessionStorage.getItem('userId')),
      componentKey: 0,
      isPostingData: false,
      alertErrorMessage: '',
      alertSuccessMessage: '',

      cat: {
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

    processAddCat() {
      this.resetAlertMessages()
      if (this.requiredFieldsHaveInput()) {
        this.executeAddCat();
      }
    },

    requiredFieldsHaveInput() {
      if (this.cat.name === '' || this.cat.statusId === null
          || this.cat.sex === '') {
        this.alertErrorMessage = 'Täida kõik nõutud väljad'
        return false
      }
      return true
    },

    async executeAddCat() {
      this.isPostingData = true
      try {
        await CatService.sendPostCatRequest(this.cat);
        this.handleAddCatResponse()
      } catch(error) {
        this.handleAddCatError(error)
      } finally {
        this.isPostingData = false
      }
    },

    handleAddCatResponse() {
      this.alertSuccessMessage = 'Uus kass lisatud'
      Object.assign(this.cat, this.$options.data().cat)
      this.componentKey += 1
      this.$refs['Image Input'].clearFileInput()
    },

    handleAddCatError(error) {
      this.errorResponse = error.response.data
      if (this.catAlreadyExists()){
        this.alertErrorMessage = this.errorResponse.message
      } else {
        navigationService.navigateToErrorView()
      }
    },

    catAlreadyExists() {
      return this.errorResponse.errorCode === CAT_AlREADY_EXISTS
    },

    async getCatStatuses() {
      try {
        const response = await CatStatusService.sendGetCatStatusesRequest()
        this.catStatuses = response.data
      } catch (error) {
        NavigationService.navigateToErrorView()
      }
    },

    setNewCatStatusId(selectedCatStatusId) {
      this.cat.statusId = selectedCatStatusId
    },

    validateWeight() {
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

    setCatSex(selectedSex) {
      this.cat.sex = selectedSex
    },

    validateChipNumber() {
      if (this.cat.chipNumber) {
        this.cat.chipNumber = this.cat.chipNumber.replace(/[^0-9]/g, '')
      }
    },

    handleImageSelected(imageData) {
      this.cat.imageData = imageData
    },

    clearImage() {
      this.cat.imageData = ''
    },


    resetAlertMessages() {
      this.alertErrorMessage = ''
      this.alertSuccessMessage = ''
    },

  },

  mounted() {
    this.getCatStatuses()
  }
}
</script>