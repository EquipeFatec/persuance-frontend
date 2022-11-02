<template>
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
            <Dropdown class="dropdown" id="dropdown" v-model="word.classeGramatical" :options="cities" placeholder="Classe gramatical" optionLabel="name" />
            <input type="text" v-model="word.categoria" name="Categoria" placeholder="Categoria" id="categoria">
            <button class="button" :modal="true" @click="buscar">Editar</button>
            <button class="button" :modal="true" @click="salvar">Salvar</button>
            <button class="button" :modal="true" @click="excluir">Excluir</button>
            
        </div>

    </div>
</template>

<script>
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import axios from "axios";
import Dropdown from 'primevue/dropdown';
import SplitButton from 'primevue/splitbutton';
import Menu from '../components/Menu.vue';

export default {
    name: 'AdmView',
    components: {
        Dialog,
        Toast,
        axios,
        Dropdown,
        SplitButton, 
        Menu

    },
    data() {
        return {
            word: [{}],
            palavra: "",
            cities: [
                { name: 'Verbo', code: 'Verbo' },
                { name: 'Substantivo', code: 'Substantivo' },
                { name: '', code: '' },
                { name: '', code: '' },
                { name: '', code: '' }
            ],
            opcoes: [
                { name: 'Sim', code: 'true' },
                { name: 'Não', code: 'false' },
            ],
            
		}
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
                this.wordToSave = {
                    id: null,
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
            }
            axios.post("http://localhost:8081/search/save", this.wordToSave).then(() => {
                this.$toast.add({severity:'sucess', summary:'Palavra ok', life: 3000, detail:'Palavra cadastrada com sucesso'});
                this.resetForm();
            })
                .catch(() => {
                    this.$toast.add({severity:'error', summary:'Erro', detail:'Não foi possível realizar o cadastro'})
                }) 
        }, 
        excluir(){

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
