<template>
    <Toast/>
    <div class="aboutTeste">
        <Menu></Menu>
        <div class="card">
            <h2> Cadastro de palavras</h2>
            <input type="text" v-model="palavra" name="Palavra" placeholder="Palavra" id="palavra">
            <input type="text" v-model="word.conjucacao" name="Conjucacao" placeholder="Conjunção" id="conjucacao">
            <input type="text" v-model="word.traducao" name="Tradução" placeholder="Tradução" id="traducao">
            <Dropdown class="dropdown" id="dropdown" v-model="word.aprovada" :options="opcoes" placeholder="Aprovada" optionLabel="name" />
            <input type="text" v-model="word.significado" name="Significado" placeholder="Significado" id="significado">
            <input type="text" v-model="word.exemploAprovado" name="Exemplo aprovado" placeholder="Exemplo aprovado" id="exemplo">
            <Dropdown class="dropdown" id="dropdown" v-model="word.classeGramatical" :options="classesGramaticais" placeholder="Classe gramatical" optionLabel="name" />
            <input type="text" v-model="word.categoria" name="Categoria" placeholder="Categoria" id="categoria">
            <button class="button" :modal="true" @click="buscar">Editar</button>
            <button class="button" :modal="true" @click="salvar">Salvar</button>
            <!-- <button class="button" :modal="true" @click="excluir">Excluir</button> -->
            
        </div>

    </div>

    <Dialog header="Exclusão" v-model:visible="displayDeleteWord" :style="{width: '20vw'}" :modal="true">
        <div :style="{textAlign:'center'}">
            <p> Confirma a exclusão da palavra? </p><br/>
            <Button type="button" label="Sim" @click="confirmarExclusao" :style="{width: '7vw', marginRight: '2px'}" />
            <Button type="button" label="Não" @click="cancelarExclusao" :style="{width: '7vw'}" />
        </div>
    </Dialog> 

</template>

<script>
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import axios from "axios";
import Dropdown from 'primevue/dropdown';
import SplitButton from 'primevue/splitbutton';
import Menu from '../components/Menu.vue';
import Button from 'primevue/button';

export default {
    name: 'AdmView',
    components: {
        Dialog,
        Toast,
        axios,
        Dropdown,
        SplitButton, 
        Button,
        Menu
    },
    data() {
        return {
            word: [{}],
            displayDeleteWord: false,
            palavra: "",
            classesGramaticais: [
                // { name: 'Verbo', code: 'Verbo' },
                // { name: 'Substantivo', code: 'Substantivo' },
                // { name: '', code: '' },
                // { name: '', code: '' },
                // { name: '', code: '' }
            ],
            opcoes: [
                { name: 'Sim', code: 'true' },
                { name: 'Não', code: 'false' },
            ],
		}
	},
    mounted() {
        this.buscarClassesGramaticais()
    },
    methods:{
        buscar() {
            this.word = [];
            this.aprovada = [];

            if (this.palavra == "") {
                this.$toast.add({
                    severity: 'warn', summary: ' Digite uma palavra para continuar a busca', life: 3000});

            } else {
                const headers = {
                "Content-Type": "multipart/form-data",
                 Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                 };
                axios.get("http://localhost:8081/search/" + this.palavra,{},headers)
                    .then((response) => {
                        if (response.data !== "") {
                            this.word = response.data[0];

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
        },
        salvar() {
            if(this.word != []){
                debugger
                this.wordToSave = {
                    id: this.word.id,
                    palavra: this.palavra,
                    aprovada: this.word.aprovada.code,
                    conjucacao: this.word.conjucacao,
                    categoria: this.word.categoria,
                    classeGramatical: this.word.classeGramatical.code,
                    exemploAprovado: this.word.exemploAprovado,
                    revisao: null,
                    significado: this.word.significado,
                    traducao: this.word.traducao,
                };
                debugger;
            }
            axios.post("http://localhost:8081/search/save", this.wordToSave).then(() => {
                this.$toast.add({severity:'sucess', summary:'Palavra ok', life: 3000, detail:'Palavra cadastrada com sucesso'});
                this.resetForm();
            })
                .catch(() => {
                    this.$toast.add({severity:'error', summary:'Erro', detail:'Não foi possível realizar o cadastro'})
                }) 
        }, 
        buscarClassesGramaticais(){
            axios.get("http://localhost:8081/search/classes").then((response) => {
                response.data.forEach(classe => {
                    let c = classe.toLowerCase()
                    this.classesGramaticais.push({name: c[0].toUpperCase() + c.substring(1), code: classe})
                });
            })
        },
        resetForm(){
            this.palavra = '';
            this.word=[];
        }

    }

}

</script>

<style scoped>
@import "../style/Adm.css";
</style>
