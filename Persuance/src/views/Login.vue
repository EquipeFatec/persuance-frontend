<template>
  <Toast />
  <div style="height: 100vh; justify-content: center; display: flex; align-items: center;">
    <div class="container">
      <div>
        <img alt="logo" src="../assets/logoo.png" height="80" width="240" />
      </div>
      <br/>

      <div style="width: 100%">
        <InputText type="text" v-model="login" placeholder="Login" />
        <br/>
        <br/>
        <Password v-model="senha" placeholder="Senha" toggleMask></Password>
      </div>

      <div class="p-button-rounded">
        <Button
          label="Entrar"
          class="p-button-outlined p-button-info"
          @click.prevent="entrar"
        />
      </div>
    </div>  
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Card from "primevue/card";
import Panel from "primevue/panel";
import InputText from "primevue/inputtext";
import Menubar from "primevue/menubar";
import { ref } from "vue";
import Image from "primevue/image";
import Button from "primevue/button";
import Word from "@/components/Word.vue";
import Dialog from "primevue/dialog";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import axios from "axios";
import Toast from "primevue/toast";
import Password from 'primevue/password';


export default {
  name: "Login",
  components: {
    HelloWorld,
    Card,
    Panel,
    InputText,
    Menubar,
    Image,
    Button,
    Word,
    Dialog,
    Column,
    DataTable,
    Toast,
    Password
  },
  data() {
    //onde se declara o objetos e variáveis
    return {
      login: '',
      senha: ''
    };
  },

  methods: {
    //todas as funções
    entrar() {
      
      const headers = { 'Content-Type': 'application/json'}

      const body = { 
        username: this.login, 
        password: this.senha 
      }
      axios
        .post("http://localhost:8081/login", body, headers)
        .then(result => {
          if (result.data !== "" && result.status === 200) {
            console.log(result);
            const token = result.headers.token;
            localStorage.setItem('userToken', token);
            
            this.$router.push('/tela-upload');
          }

        })
        .catch((error) => {
          this.$toast.add({
            severity: "error",
            summary: "Erro no servidor",
            life: 10000,
          });
        });
    },
  },
};
</script>

<style scoped>

.container {
  width: 35%;
  box-shadow: 2px 3px 9px 0px rgb(201 201 201);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

::v-deep(.p-password input) {
    width:15rem
}

.p-inputtext {
  width: 15rem;
}
</style> >

