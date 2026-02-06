<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-8 col-md-6 col-lg-4">
        <div class="d-grid gap-2 mt-3">

          <div class="home">
            <img class="login-cat" src="@/assets/illustrations/cat3.jpeg" alt="Cat illustration">
          </div>

          <div class="form-floating">
            <input type="text" class="form-control" placeholder="Kasutajanimi">
            <label>Kasutajanimi</label>
          </div>

          <div class="form-floating">
            <input type="text" class="form-control" placeholder="Email">
            <label>Email</label>
          </div>

          <div class="form-floating">
            <input type="password" class="form-control" placeholder="Parool">
            <label>Parool</label>
          </div>

          <div class="form-floating">
            <input type="password" class="form-control" placeholder="Korda parooli">
            <label>Korda parooli</label>
          </div>

          <button class="btn btn-secondary" :disabled="isPostingData">
            <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
            Registreeri
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',
  data() {
    return {}
  },
  methods: {},
  mounted() {
  }
}
</script>

<style scoped>
.login-cat {
  max-width: 300px;
  width: 100%;
  height: auto;
}
</style>