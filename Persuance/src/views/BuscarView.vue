<template>
    <Toast>
        <div class="buscar">
            <div class="menu">
                <MegaMenu :model="items" />
            </div>
            <div class="card">
                        <Card style="width: 100%; height: 100%; margin-bottom: 80%">
                            <template #title> Palavra </template>
                            <template #content>
                                <div class="card">
                                    <div class=".p-input">
                                        <span class="p-float-label">
                                            <InputText type="text" v-model="palavra" placeholder="Palavra" />
                                            <Button label="Editar" type="button" class="buttons"
                                                style="margin-left: 5px" @click="displayModalBusca" />
                                        </span>
                                            <h2> Cadastro de palavras</h2>
                                            <input type="text" name="Palavra" placeholder="Palavra" id="palavra">
                                            <input type="text" name="Conjucacao" placeholder="Conjunção"
                                                id="conjucacao">
                                            <input type="text" name="Tradução" placeholder="Tradução" id="traducao">
                                            <input type="text" name="Aprovada" placeholder="Aprovada" id="aprovada">
                                            <input type="text" name="Significado" placeholder="Significado"
                                                id="significado">
                                            <input type="text" name="Exemplo aprovado" placeholder="Exemplo aprovado"
                                                id="exemplo">
                                            <Dropdown id="dropdown" v-model="value8" :options="cities"
                                                        optionLabel="name" />
                                                    <label for="dropdown"> Classe Gramatical</label>
                                            <input type="text" name="Classe gramatical" placeholder="Classe gramatical"
                                                id="classe">
                                            <input type="text" name="Categoria" placeholder="Categoria" id="categoria">
                                            <button @click="buscar">Cadastrar</button>
                                    </div>
                                </div>
                            </template>
                        </card>
            </div>

        </div>


    </Toast>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Card from 'primevue/card';
import Panel from 'primevue/panel';
import InputText from 'primevue/inputtext';
import Menubar from 'primevue/menubar';
import { ref } from 'vue';
import Image from 'primevue/image';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import axios from 'axios';

export default {
    name: 'BuscarView',
    components: {
        HelloWorld,
        Card,
        Panel,
        InputText,
        Menubar,
        Image,
        Button,
        Dropdown,

    },
    data() {
        return {
            cities: [
                { name: 'Verbo', code: 'Verbo' },
                { name: 'Substantivo', code: 'Substantivo' },
                { name: '', code: '' },
                { name: '', code: '' },
                { name: '', code: '' }
            ],
            items: [
                {
                    label: 'Configurações da conta', icon: 'pi pi-fw pi-cog',
                    items: [
                        [
                            {
                                label: 'Nome',
                                items: [{ label: 'Setting 1.1' }, { label: 'Setting 1.2' }]
                            },
                        ]
                    ]   

                },
                {
                    label: 'Arquivo', icon: 'pi pi-fw pi-cloud-upload',
                    items: [
                        [
                            {
                                label: 'Nome',
                                items: [{ label: 'Setting 1.1' }, { label: 'Setting 1.2' }]
                            }
                        ]
                    ]
                }
            ]
        }
    },
    methods: {
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
        },
        save() {
            axios.post("http://localhost:8081/search/save",this.word).then(() => {
                this.$toast.add({severity:'sucess', summary:'Palavra ok', life: 3000});
                this.resetForm();
            })
                .catch(() => {
                    this.$toast.add({severity:'error', summary:'Erro', detail:'Não foi possível realizar o cadastro'})
                }) 
        }, 
        resetForm(){
            this.palavra = '';
            this.conjucacao = '';
            this.tradutor = '';
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

.buscar {
    background-color: rgba(242, 248, 248, 0.452);
    height: 100vh;
    justify-content: center;
    padding: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 0%;
    margin-right: 50%;
    margin-bottom: 50%;
}

.menu {
    background-color: aqua;

}

.card {
    flex-direction: column;
    width: 35%;
    padding: 20px;
    margin-top: 10%;
}

.p-input {

    width: 90px;
    border-radius: 2px;
    border-color: rgb(39, 39, 88);
}


.mr-2 {
    width: 270px;
    height: auto;
}

.p-input-icon-left {

    margin-top: 10px;

}

.p-inputtext {
    width: 500px;
    border-radius: 9px;
    border-color: rgb(39, 39, 88);
}

.p-button-outlined p-button-info {
    border-color: rgb(70, 70, 175);
}

.buttons {
    margin-top: 20px;
    display: flex;
    width: 100%;
    justify-content: center;
}

.buttons button:nth-child(1) {
    margin-right: 50px;
}

.buttons button {
    width: 150px;
    height: 40px;
    background: #2196F3;
    border: solid 1px #2196F3;
    transition: 0.2s;
    border-radius: 3px;
    color: #fff;
    font-weight: 700;
    font-size: 1rem
}

.buttons button:hover {
    background: #fff;
    color: #2196F3;
}


.p-button.p-component {
    width: 150px;
    height: 40px;
    background: #2196F3;
    border: solid 1px #2196F3;
    transition: 0.2s;
    border-radius: 3px;
    color: #fff;
    font-weight: 700;
    margin-top: 20px;
    padding: 0;
    font-size: 1rem
}

.flex {
    align-items: center;
    justify-content: center;
    width: 150%;
}

.p-card-content {
    align-items: center;
    justify-content: center;
    width: 150%;
}
</style> >

