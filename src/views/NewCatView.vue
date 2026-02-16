<template>


</template>

<script>
export default {
  name: 'NewCatView',
  data() {
    return {

      userId: Number(sessionStorage.getItem(usedId)),
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
  methods: {},
  mounted() {
  }
}
</script>