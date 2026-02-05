<template>
  <div v-if="alertErrorMessage !==''" class="alert alert-danger alert-dismissible" role="alert">
    {{ alertErrorMessage }}

    <button @click="$emit('event-alert-box-closed')" type="button" class="btn-close"
            aria-label="Close"></button>
  </div>

</template>

<script>
export default {
  name: 'AlertError',
  props: {
    alertErrorMessage: String
  }
}
</script>