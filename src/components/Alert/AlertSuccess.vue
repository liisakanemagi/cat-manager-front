<template>

  <div v-if="alertSuccessMessage !==''"
       class="alert alert-success alert-dismissible"
       role="alert">
    {{alertSuccessMessage}}

    <button @click="$emit('event-alert-box-closed')"
            type="button" class="btn-close"
            aria-label="Close"></button>

  </div>

</template>

<script>
export default {
  name: 'AlertSuccess',
  props: {
    alertSuccessMessage: String
  }
}
</script>