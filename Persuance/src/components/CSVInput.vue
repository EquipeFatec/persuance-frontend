<template>
  <div class="flex justify-center">
    <div :class="fileName ? 'file is-centered is-boxed is-success has-name' : 'file is-centered is-boxed is-success'">
      <label class="file-label">
        <input class="file-input" type="file" name="resume" ref="inputCSV" @change="handleCSVChange" />
        <span class="file-cta">
          <span class="file-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </span>
          <span class="file-label">Informe o CSV</span>
        </span>
        <span class="file-name" v-if="fileName"> {{ fileName }} </span>
      </label>
    </div>
    <Button :disabled="!fileName" class="button is-success is-outlined is-small" style="width: 100%; margin-top: 10px" @click="submitFile">{{fileName ? 'Enviar' : 'arquivo não informado'}}</Button>
  </div>
</template>

<style scoped>
.file-label .file-name {
  border-color: #48c78e;
  color: #48c78e;
}

.file-label:hover .file-name {
  border-color: white;
  color: white;
}
</style>

<script>
// import axios from "axios";

export default {
  data: () => ({ file: null, fileName: "" }),

  props: {
    afterSubmit: {
      type: Function,
      default: () => {}
    }
  },

  methods: {
    handleCSVChange() {
      this.fileName = this.$refs.inputCSV.files[0].name;
      this.file = this.$refs.inputCSV.files[0];
    },

    submitFile() {
      const formData = new FormData();

      formData.append("file", this.file);

      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      };

      // axios
      //   .post("http://localhost:8081/api/csv/upload", formData, { headers })
      //   .then((res) => {
      //     res.data.files;
      //     res.status;

      //     if (res.status === 200) {
      //       alert(`O arquivo ${this.fileName} foi enviado com sucesso`);
      //       this.afterSubmit();
      //     } else {
      //       alert(`Deu erro`);
      //     }
      //   });
    },
  },
};
</script>