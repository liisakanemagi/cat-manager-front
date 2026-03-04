<template>

</template>

<script>
import catService from "@/services/CatService";
import navigationService from "@/services/NavigationService";

export default {
  name: 'CatView',
  data() {
    return {

      catId: Number(this.$route.params.id),

      cat:
          {
            id: 0,
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
          }

    }
  },
  methods: {

    async getCat() {

      try {
        const response = await catService.sendGetCatRequest(this.catId)
        this.cat = response.data
      } catch (error) {
        navigationService.navigateToErrorView()
      }
    }
  },

  mounted() {
    this.getCat()
  }
}
</script>