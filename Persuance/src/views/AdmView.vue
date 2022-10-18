<!--<template>
    <div class="aboutTeste">
        <div class="card">
            <h2> Cadastro de palavras</h2>
            <input type="text" name="Palavra" placeholder="Palavra" id="palavra">
            <input type="text" name="Conjucacao" placeholder="Conjunção" id="conjucacao">
            <input type="text" name="Tradução" placeholder="Tradução" id="traducao">
            <input type="text" name="Aprovada" placeholder="Aprovada" id="aprovada">
            <input type="text" name="Significado" placeholder="Significado" id="significado">
            <input type="text" name="Exemplo aprovado" placeholder="Exemplo aprovado" id="exemplo">
            <input type="text" name="Classe gramatical" placeholder="Classe gramatical" id="classe">
            <input type="text" name="Categoria" placeholder="Categoria" id="categoria">
            <button>Cadastrar</button>
        </div>
        <div class="card">
            <h2 class="absolute">Alteração de palavras</h2>
            <input type="text" name="Palavra" placeholder="Palavra" id="palavra">
            <input type="text" name="ClasseGramatical" placeholder="Classe Gramatical" id="cGramatical">
            <div class="buttons">
                <button :modal="true" @click="buscar">Editar</button>
            </div>

        </div>

    </div>
</template>

<script>
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import axios from "axios";

export default {
    name: 'AdmView',
    components: {
        Dialog,
        Toast,
        axios

    },
    data() {
        return {
            word: [{}],
            palavra: ""
        }
    },
    methods:{
        buscar() {
            this.word = [{}];

            if (this.palavra == "") {
                this.$toast.add({
                    severity: 'warn', summary: ' Digite uma palavra para continuar a busca', life: 3000});

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
@import "../style/Adm.css";
</style> -->
