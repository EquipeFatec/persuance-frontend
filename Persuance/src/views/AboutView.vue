<template>
    <Toast />
    <div class="about">
        <div>
            <!-- <img alt="logo" src="../assets/logo_1.png" height="200" class="mr-2"> -->
            <img alt="logo" src="../assets/logoo.png" height="200" class="mr-2">
        </div>
        <div>
            <span class="p-float-label">
                <!-- <i class="pi pi-search" /> -->
                <InputText type="text" v-model="palavra" placeholder="Buscar" />
                <Button type="button" icon="pi pi-search" class="search" style="margin-left: 5px" @click="buscar" />

            </span>
        </div>
        <div class=" p-button-rounded">
            <Button label="Consultar Textos" class="p-button-outlined p-button-info" />
            <Button label="Consultar arquivos" class="p-button-outlined p-button-info" />
        </div>

        <Dialog class="busca" v-model:visible="displayModalBusca" :style="{ width: '100vw' }" :modal="true">
            <div class="card">

                <DataTable :value="word" sortMode="multiple" responsiveLayout="scroll">
                    <Column field="palavra" header="Palavra" :sortable="true"></Column>
                    <Column field="conjucacao" header="Conjugação" :sortable="true"></Column>
                    <Column field="traducao" header="Tradução" :sortable="true"></Column>
                    <Column field="aprovada" header="Aprovação" :sortable="true"></Column>
                    <Column field="significado" header="Significado" :sortable="true"></Column>
                    <Column field="exemploAprovado" header="Exemplo Aprovado" :sortable="true"></Column>
                    <Column field="classeGramatical" header="Classe gramatical" :sortable="true"></Column>
                    <Column field="categoria" header="Categoria dos nomes técnicos" :sortable="true"></Column>

                </DataTable>
            </div>
        </Dialog>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import Card from 'primevue/card';
import Panel from 'primevue/panel';
import InputText from 'primevue/inputtext';
import Menubar from 'primevue/menubar';
import { ref } from 'vue';
import Image from 'primevue/image';
import Button from 'primevue/button';
import Word from '@/components/Word.vue';
import Dialog from 'primevue/dialog';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import axios from "axios";
import Toast from 'primevue/toast';


export default {
    name: 'AboutView',
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
        Toast


    },
    data() { //onde se declara o objetos e variáveis
        return {
            displayModalBusca: false,
            word: [{}],
            palavra: ""

        }
    },

    methods: { //todas as funções
        buscar() {
            this.word = [{}];

            if (this.palavra == "") {
                this.$toast.add({
                    severity: 'warn', summary: ' Digite uma palavra para continuar a busca',
                    life: 3000
                });

            } else {
                axios.get("http://localhost:8081/search/" + this.palavra)
                    .then((response) => {
                        if (response.data !== "") {
                            this.displayModalBusca = true;
                            this.word = response.data;
                        } else {
                            this.$toast.add({
                                severity: 'error', summary: ' Palavra não encontrada',
                                life: 3000
                            });
                        }
                    }).catch((error) => {
                        this.$toast.add({
                            severity: 'error', summary: 'Erro no servidor',
                            life: 10000
                        })

                    })
            }

        }

    }
}

</script>

<style>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.about {
    background-color: rgba(242, 248, 248, 0.452);
    height: 100vh;
    justify-content: center;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.mr-2 {
    width: 270px;
    height: auto;
}

.p-float-label {

    margin-top: 10px;
}

.p-inputtext {
    width: 500px;
    border-radius: 9px;
    border-color: rgb(39, 39, 88);
}

.p-button-rounded {
    margin-top: 15px;
    display: flex;
    width: 25%;
    size: 25px;
    justify-content: space-around;
    border-radius: 55px;
}

.p-button-outlined p-button-info {
    border-color: rgb(70, 70, 175);
}

.search {
    margin-top: 15px;
    display: flex;
    width: 25%;
    size: 25px;
    justify-content: space-around;
    border-radius: 55px;

}
</style> >

