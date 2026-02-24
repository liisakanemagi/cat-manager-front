<template>
  <select id="catdropdown" @change="selectNewCat($event.target.value)" :value="selectedCatId" class="form-select">
    <option selected :value="0" disabled>Minu kassid</option>
    <option v-for="cat in cats" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
  </select>
</template>

<script>
export default {
  name: 'CatListDropDown',
  emits: ['event-new-cat-selected'],
  props: {

    cats: Array,
    selectedCatId: {
      type: Number,
      default: 0

    }
  },

  methods: {

    selectNewCat(selectedCatId) {
      this.$emit('event-new-cat-selected', Number(selectedCatId))
    }
  }
}
</script>

<style scoped>
.form-select {
  width: 140px;
}
</style>