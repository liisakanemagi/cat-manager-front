<template>
  <select v-model="selectedSex" class="form-select">
    <option :value ="null" disabled>Sugu</option>
    <option value="M">Isane</option>
    <option value="F">Emane</option>
  </select>
</template>

<script>
export default {
  name: 'CatSexDropdown',
  data() {

return {
  selectedSex: null
  }
  },

 watch:{
    selectedSex(newValue){
      this.$emit('event-sex-selected', newValue)
    }
  }

}
</script>