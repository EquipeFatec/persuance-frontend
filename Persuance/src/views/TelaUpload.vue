<template>
  <Toast />
  <main>
    <div id="painelRedefinir">
      <h3 style="font-size: 30px">Importação de dados</h3>
      <div style="display: flex; justify-content: center; margin: 30px">
        <FileUpload mode="basic" name="file" accept=".csv" url="http://localhost:8081/api/csv/upload"
          :maxFileSize="1000000" @upload="onUpload" :auto="true" multiple="false">
          <template #empty>
            <p>Drag and drop files to here to upload.</p>
          </template>
        </FileUpload>
      </div>
    </div>
  </main>
</template>

<script>
// import axios from "axios";
import { onBeforeMount } from "@vue/runtime-core";
import FileUpload from "primevue/fileupload";
import Toast from "primevue/toast";
import Button from "primevue/button";

export default {
  data() {
    return {
      modoVisualizacao: "",
      listaCSV: [],
    };
  },
  name: "TelaUpload",
  components: {
    FileUpload,
    Button,
    Toast
  },

  methods: {
    onUpload(event) {
      this.$toast.add({
        severity: "success",
        summary: "Success",
        detail: "Upload concluído",
        life: 3000,
      });
    },
  },
};
</script>


<style scoped>
main {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
}

#painelRedefinir {
  width: 100%;
  min-width: 20%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  background-color: rgb(48, 46, 54);
  padding: 20px;
  border-radius: 10px;
}
</style>