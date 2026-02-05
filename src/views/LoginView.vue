<template>
  <div class="container text-center mt-5">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-8 col-md-6 col-lg-4">

        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="username" placeholder="Kasutajanimi">
          <label for="username">Kasutajanimi</label>
        </div>

        <div class="form-floating mb-3">
          <input type="password" class="form-control" id="password" placeholder="Parool">
          <label for="password">Parool</label>
        </div>

        <div class="d-grid gap-2">
          <button type="button" class="btn btn-secondary">
            Logi sisse
          </button>
        </div>

        <div class="mt-3">
          <button type="button" class="btn btn-link">Registreeri</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {}
  },
  methods: {},
  mounted() {
  }
}
</script>