<template>
    <Toast />
    <div class="about">
        <Menu></Menu>
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
        <!-- <div class=" p-button-rounded">
            <Button label="Consultar Textos" @click="abreModal()" class="p-button-outlined p-button-info" />
             <Button label="Consultar arquivos" class="p-button-outlined p-button-info" />
        </div> -->


        <button @click="abreModal">Verificar texto</button>
        <!-- <div id="baseModal" class="search-text">
        <div id="modalText" class="search-text-modal">
            <h1>Insira o texto</h1>
            <textarea name="" id="textArea" cols="30" rows="10"></textarea>
            <button class="btn-verifica" @click="verifica()">Verificar</button>
            <button class="btn-verifica" @click="fecharModal()">Fechar</button>
        </div>
        </div> -->

        <Dialog header="Consulta de texto" v-model:visible="abreModal" :style="{width: '50vw'}" :modal="true">
        <div class="grid">
            <div class="col-12 md:col-4 p-5">
                <ScrollPanel style="width: 100%; height: 200px">
                    <div id="baseModal" class="search-text">
                    <div id="modalText" class="search-text-modal">
                        <textarea placeholder= "Insira seu texto aqui" name="" id="textArea" cols="30" rows="10"></textarea>
                        <button class="btn-p-button-outlined p-button-info" @click="verifica()">Verificar</button>
                        <button class="btn-verifica" @click="fecharModal()">Fechar</button>
                    </div>
                    </div>

                 </ScrollPanel>
            </div>
         </div>
        </Dialog> 
    <!-- <Dialog header="Consulta de texto" v-model:visible="displayModalTexto" :style="{width: '50vw'}" :modal="true">
        <div class="grid">
            <div class="col-12 md:col-4 p-5">
                <ScrollPanel style="width: 100%; height: 200px">
                        <Editor v-model="texto" editorStyle="height: 320px">
                            <template #toolbar>
                                <span class="ql-formats">
                                    <button class="pi pi-check-square" @click="buscarTexto"></button>
                                </span>
                            </template>
                        </Editor>
                        
                </ScrollPanel>
            </div>
         </div>
    </Dialog>  -->


        <Dialog class="busca" v-model:visible="displayModalBusca" :style="{ width: '100vw' }" :modal="true">
            <div class="teste">

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
import { ref } from 'vue';
import Image from 'primevue/image';
import Button from 'primevue/button';
import Word from '@/components/Word.vue';
import Dialog from 'primevue/dialog';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import axios from "axios";
import Toast from 'primevue/toast';
import Menu from '../components/Menu.vue';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import Editor from 'primevue/editor';
import Textarea from 'primevue/textarea';

export default {
    name: 'AboutView',
    components: {
        HelloWorld,
        Card,
        Panel,
        InputText,
        Image,
        Button,
        Word,
        Dialog,
        Column,
        DataTable,
        Toast,
        Menu,
        Splitter,
        SplitterPanel,
        Editor,
        Textarea



    },
    data() { //onde se declara o objetos e variáveis
        // console.log(word)
        return {
            displayModalBusca: false,
            // abreModal: false,
           
            word: [{}],
            palavra: "",
            texto: ""

        }
    },

    methods: { //todas as funções
            abreModal: function(){
            document.getElementById("baseModal").style.display = "flex";
            },
            fecharModal: function(){
            document.getElementById("baseModal").style.display = "none";
            },
            verifica: function() {
                debugger
                var textArea = document
                .getElementById("textArea")
                .value.toLowerCase()
                .split(" ");
                axios.get("http://localhost:8081/search/texto/" + this.textoArea).then((response) => {
                debugger
                response.data;
                console.log(response.data);
                response.data.forEach(p => {
                    if(p.aprovada == 0){
                        p.palavra.style.color="red"
                    }
                    this.texto += p.palavra
                });
                console.log(response.data);
            

            })
            var modal = document.getElementById("modalText");
            debugger
            var textArea = document
                .getElementById("textArea")
                .value.toLowerCase()
                .split(" ");
            var cont = 0;
            var palavras = "";
            var aprovadas = [];
            var naoAprovadas = [];

            
            while (cont < textArea.length) {
                if (aprovadas.includes(textArea[cont])) {
                textArea[cont] =
                    "<span style='background:red;'>" + textArea[cont] + "</span>";
                }
                if (naoAprovadas.includes(textArea[cont])) {
                textArea[cont] =
                    "<span style='background:yellow;'>" + textArea[cont] + "</span>";
                }
                palavras += " " + textArea[cont];
                cont++;
            }
            document.getElementById("modalText").innerHTML =
                "<h1>Texto Verificado</h1><p>" + palavras + "</p><button onclick='fecharModal()'>Fechar</button>";
        },
        buscarTexto(){
            axios.get("http://localhost:8081/search/texto/" + this.texto).then((response) => {
                
                this.texto = ""
                response.data.forEach(p => {
                    if(p.aprovada == 0){
                        p.palavra.style.color="red"
                    }
                    this.texto += p.palavra
                });
                console.log(response.data);
            })

                 
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

        }

    }
}

</script>

<style scoped>
@import "../style/AboutView.css";
@import "../style/colors.css";
</style>

