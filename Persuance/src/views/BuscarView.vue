<template>
    <Toast />
    <div class="buscarView">
        <Button icon="pi pi-user" class="user" style="position: absolute; left: 21px; top: 21px; height: 40px;
        width: 40px;" @click="login"/>
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
            <Button label="Consultar Textos" @click="openModalTexto" class="p-button-outlined p-button-info" />
            <!-- <Button label="Consultar arquivos" class="p-button-outlined p-button-info" /> -->
        </div>


        <Dialog header="Consulta de texto" v-model:visible="displayModalTexto" :style="{width: '50vw'}" :modal="true">
        <div class="grid">
            <div class="col-12 md:col-4 p-5">
                <ScrollPanel style="width: 100%; height: 200px">
                        <h3><b>1.Inserção de dados</b></h3>
                        A inserção de <span class="colorRed">dados</span> tem como objetivo popular o sistema para que seja possível a visualização dos dados através dos gráficos e análises presentes no sistema. Para realizar a inserção de dados, o usuário deve:
                        <p>No menu lateral direito, clicar no  <span class="colorYellow">ícone</span>  “Inserir CSV”, botão “Choose” em <span class="colorYellow">seguida</span> selecionar o arquivo CSV desejado, após a escolha do CSV, clicar no botão Abrir e posteriormente no botão “Upload“.</p>
                        <p>No menu <span class="colorRed">lateral</span> direito, clicar no ícone “Inserir CSV”, abrir o local onde o arquivo CSV se encontra, em seguida arrastar o arquivo CSV para a área indicada “Arraste e solte arquivos para Upload” e posteriormente no botão “Upload“.</p>
                        
                   
                </ScrollPanel>
            </div>
         </div>
        </Dialog> 
        <Dialog class="busca" v-model:visible="displayModalBusca" :style="{ width: '100vw' }" :modal="true">
            <div class="bCard">

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
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';


export default {
    name: 'buscarView',
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
        Splitter,
        SplitterPanel


    },
    data() { //onde se declara o objetos e variáveis
        return {
            displayModalBusca: false,
            displayModalTexto: false,
            word: [{}],
            palavra: "",
            			// 		command: () => {
			// 			this.$toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000});
            //             // window.location.href= "/AdmView";
			// 		}

            //login:[window.location.href="/login"]

        }
    },

    methods: { //todas as funções
        openModalTexto(){
        this.displayModalTexto = true;
        },
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
                            if(response.data[0].aprovada == true){
                                response.data[0].aprovada = "Sim"
                            }
                            else{
                                response.data[0].aprovada = "Não"
                            }
                            this.word = response.data;

                        } else {
                            this.$toast.add({
                                severity: 'error', summary: ' Palavra não encontrada',
                                life: 3000
                            });
                        }
                    }).catch((error) => {
                        this.$toast.add({
                            severity: 'error', summary: 'Palavra não encontrada',
                            life: 10000
                        })

                    })
            }

        }, 
        login(){
                    window.location.href="/#/login"
     
        }
           
        
    }
}

</script>

<style scoped>
@import "../style/Buscar.css";
@import "../style/colors.css";
</style>

