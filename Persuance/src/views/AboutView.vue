<template>
    <Toast />
    <div class="about">
        <Menu></Menu>
        <div>           
         
            <img alt="logo" src="../assets/logoo.png" height="200" class="mr-2">
        </div>
        <div>
            <span class="p-float-label">
                <!-- <i class="pi pi-search" /> -->
                <InputText type="text" v-model="palavra" placeholder="Buscar" />
                <Button type="button" icon="pi pi-search" class="search" style="margin-left: 5px" @click="buscar" />

            </span>
        </div>
        <div class="p-button-rounded">
            <Button label="Consultar Textos" v-on:click="abreModal = true" class="p-button-outlined p-button-info" />
        </div>

        <Dialog header="Consulta de texto" v-model:visible="abreModal" :style="{ width: '50vw'}" :modal="true">
            <div class="grid">
                
                <InputText id="inputSearchWord" v-model="palavra" placeholder="Pesquisar palavra" :style="{ width:'200px !important', marginLeft: '60%'}"/>
                <Button id="buttonSearchWord" type="button" icon="pi pi-search" class="search" style="margin-left: 5px" @click="buscar" />
                
                <div class="col-12 md:col-4 p-5">
                    <ScrollPanel style="width: 100%; height: 500px">
                        <div id="baseModal" class="search-text">
                            <div id="modalText" class="search-text-modal">
                                <textarea placeholder="Insira seu texto aqui" name="" id="textArea" cols="70"
                                    rows="30"></textarea><br />
                            </div>
                        </div>
                        <div id="diVerificar">
                            <Button id="btnVerificar" label="Verificar" v-on:click="verifica()"
                                class="btn-p-button-outlined p-button-info" ></Button>
                        </div>
                        <div id="diVoltar">
                            <Button id="btnVoltar" label="Voltar" v-on:click="voltar()"
                                class="btn-p-button-outlined p-button-info" style="display: none"></Button>
                        </div>
                    </ScrollPanel>
                </div>
            </div>
        </Dialog>

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
import HelloWorld from "@/components/HelloWorld.vue";
import Card from "primevue/card";
import Panel from "primevue/panel";
import InputText from "primevue/inputtext";
import Image from "primevue/image";
import Button from "primevue/button";
import Word from "@/components/Word.vue";
import Dialog from "primevue/dialog";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import axios from "axios";
import Toast from "primevue/toast";
import Menu from "../components/Menu.vue";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import Editor from "primevue/editor";
import Textarea from "primevue/textarea";

export default {
    name: "AboutView",
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
        Textarea,
    },
    data() {
        //onde se declara o objetos e variáveis
        // console.log(word)
        return {
            displayModalBusca: false,
            abreModal: false,            

            word: [{}],
            palavra: "",
            texto: "",
            textos: [],
            testes: "",
        };
    },

    methods: {
       
        fecharModal: function () {
            document.getElementById("baseModal").style.display = "none";
        },

        verifica() {
            
            var aprovadas = [];
            var naoAprovadas = [];
            var duvidas = [];
            var textoInicial = document
                .getElementById("textArea")
                .value.toLowerCase();
            this.testes = textoInicial;

           

            if (textoInicial == "") {
                this.$toast.add({
                    severity: "warn",
                    summary: "Digite uma palavra para continuar a busca",
                    life: 3000,
                });
            } else {
                axios
                    .get("http://localhost:8081/search/texto/" + textoInicial)
                    .then((response) => {
                        var cont = 0;
                        var textArea = document
                            .getElementById("textArea")
                            .value.toLowerCase()
                            .trim()
                            .split(/\s+/);

                        //adiciona nos arrays
                        while (cont < response.data.length) {
                            if (response.data[cont].aprovada == 0) {
                                naoAprovadas.push(response.data[cont].palavra);
                            } else if (response.data[cont].aprovada == 1) {
                                aprovadas.push(response.data[cont].palavra);
                            } else {
                                duvidas.push(response.data[cont].palavra);
                            }
                            cont++;
                        }

                        cont = 0;
                        var palavras = "";

                        console.log(naoAprovadas);
                        while (cont < textArea.length) {
                            if (naoAprovadas.includes(textArea[cont])) {
                                textArea[cont] =
                                    "<span style='background:#ff9999;'>" +
                                    textArea[cont] +
                                    "</span>";
                            }
                            if (duvidas.includes(textArea[cont])) {
                                textArea[cont] =
                                    "<span style='background:yellow;'>" +
                                    textArea[cont] +
                                    "</span>";
                            }
                            palavras += " " + textArea[cont];
                            cont++;
                        }
                        document.getElementById("modalText").innerHTML =
                "<h1>Texto Verificado</h1><p>" +
                palavras +"<br><br>"

                //retira o botão da tela
                document.getElementById("btnVerificar").style.display = "none";
                document.getElementById("btnVoltar").style.display = "block";

                    })
                    .catch((error) => {
                        this.$toast.add({
                            severity: "error",
                            summary: "",
                            life: 10000,
                        });
                    });
            }
        },
        voltar() {
            document.getElementById("btnVerificar").style.display="block";
            document.getElementById("btnVoltar").style.display="none";

            document.getElementById("modalText").innerHTML =
               "<textarea id = 'textArea' style='width:100%; height:450px;'>"+ this.testes +"</textarea>"
                ;
        },
        buscar() {
            this.word = [{}];
            if (this.palavra == "") {
                this.$toast.add({
                    severity: "warn",
                    summary: " Digite uma palavra para continuar a busca",
                    life: 3000,
                });
            } else {
                axios
                    .get("http://localhost:8081/search/" + this.palavra)
                    .then((response) => {
                        if (response.data !== "") {
                            this.displayModalBusca = true;
                            if (response.data[0].aprovada == true) {
                                response.data[0].aprovada = "Sim";
                            } else {
                                response.data[0].aprovada = "Não";
                            }

                            this.word = response.data;
                        } else {
                            this.$toast.add({
                                severity: "error",
                                summary: " Palavra não encontrada",
                                life: 3000,
                            });
                        }
                    })
                    .catch((error) => {
                        this.$toast.add({
                            severity: "error",
                            summary: "Palavra não encontrada",
                            life: 10000,
                        });
                    });
            }
        },
    },
};
</script>

<style scoped>
@import "../style/AboutView.css";
@import "../style/colors.css";
</style>
