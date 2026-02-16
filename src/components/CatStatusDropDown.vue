<template>
  <select @change="selectNewCatStatus($event.target.value)" :value= "selectedCatStatus" class="form-select">
    <option selected :value="0">Kassi staatus </option>
    <option v-for="catStatus in catStatuses" :key="catStatus.id" :value="catStatus.id">{{catStatus.label}}</option>
  </select>
</template>

<script>
export default {
  name: 'CatStatusDropDown',
  props: {

    catStatuses: Array,
    selectedCatStatus: {
      type: Number,
      default: 0

    }
  },

  methods: {
    selectNewCatStatus(selectedCatStatus){
      this.$emit('event-new-status-selected', Number(selectedCatStatus))
    }
  }
}
</script>