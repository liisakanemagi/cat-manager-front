<template>
  <select @change="selectNewCatStatus($event.target.value)" :value= "selectedCatStatusId" class="form-select">
    <option selected :value="0" disabled>Kassi staatus*</option>
    <option v-for="catStatus in catStatuses" :key="catStatus.id" :value="catStatus.id">{{catStatus.label}}</option>
  </select>
</template>

<script>
export default {
  name: 'CatStatusDropDown',
  emits: ['event-new-status-selected'],
  props: {

    catStatuses: Array,
    selectedCatStatusId: {
      type: Number,
      default: 0

    }
  },

  methods: {
    selectNewCatStatus(selectedCatStatusId){
      this.$emit('event-new-status-selected', Number(selectedCatStatusId))
    }
  }
}
</script>