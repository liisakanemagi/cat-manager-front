<template>
  <div class="mb-3">

    <input
        id="file-upload"
        ref="fileInput"
        type="file"
        class="d-none"
        @change="handleImage"
        accept="image/x-png,image/jpeg,image/gif"
    >

    <div class="input-group">
      <label for="file-upload"
             class="btn btn-outline-secondary" type="button">
        Vali pilt
      </label>

      <span class="form-control text-start text-truncate">
        {{ selectedFileName || 'Ühtegi pilti pole valitud' }}
      </span>

      <button v-if="selectedFileName"
              class="btn btn-outline-danger"
              type="button" @click="clearFileInput">
        <font-awesome-icon icon="fa-solid fa-trash" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageInput',
  emits: ['event-new-image-selected', 'event-chosen-image-cleared'],
  data() {
    return {

      selectedFileName: ''
    }
  },
  methods: {
    handleImage(event) {
      const files = event.target.files;
      if (files.length === 0) {
        this.clearFileInput();
        return;
      }
      
      const selectedImage = files[0];
      this.selectedFileName = selectedImage.name;
      this.emitBase64(selectedImage);
    },

    emitBase64(fileObject) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataBase64 = reader.result;
        this.$emit('event-new-image-selected', imageDataBase64)
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        alert('Viga faili lugemisel');
      }
      reader.readAsDataURL(fileObject);
    },

    clearFileInput() {
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = '';
      }
      this.selectedFileName = '';
      this.$emit('event-chosen-image-cleared');
    },
  }
}
</script>