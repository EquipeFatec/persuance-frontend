<template>
  <div class="list">
    <Menu></Menu>

    <h1 class="titulo">Tela de Filtros</h1>
    <DataTable
      :value="words"
      :paginator="true"
      :rows="5"
      :rowHover="true"
      v-model:filters="filters"
      :loading="loading"
      :rowsPerPageOptions="[2, 5, 10, 25, 50]"
      :globalFilterFields="['palavra','traducao']"
      dataKey="id"
      showGridLines
      filterDisplay="menu"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      currentPageReportTemplate="Exibindo {first} à {last} do total de {totalRecords} registros"
      responsiveLayout="scroll"
    >
      <template #header>
        <div class="flex justify-content-center align-items-center">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters['global'].value" placeholder="Buscar palavra-chave" />
          </span>
        </div>
      </template>
      <template #empty>Nenhuma palavra disponivel na base de dados</template>
      <template #loading>Carregando palavras</template>
      <Column field="palavra" header="Palavra" sortable style="min-width: 14rem">
        <template #body="{ data }">
          {{ data.palavra }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            placeholder="Pesquisar por letra"
          />
        </template>
      </Column>
      <Column field="traducao" sortable header="Tradução">
        <template #body="{ data }">
          {{ data.traducao }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            placeholder="Pesquisar"
          />
        </template>
      </Column>
      <Column field="aprovada" sortable header="Aprovada">
        <template #body="{ data }">
          <span :class="'badge status' + (data.aprovada === 'sim' ? '-aprovado' : '')">
            {{ data.aprovada }}
          </span>
        </template>
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            placeholder="Pesquisar"
          />
        </template>
      </Column>
      <Column field="significado" sortable header="Significado">
        <template #body="{ data }">
          {{ data.significado }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            placeholder="Pesquisar"
          />
        </template>
      </Column>
      <Column field="conjucacao" sortable header="Conjugação">
        <template #body="{ data }">
          {{ data.conjucacao }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            placeholder="Pesquisar"
          />
        </template>
      </Column>
      <Column field="exemploAprovado" sortable header="Exemplo de uso">
        <template #body="{ data }">
          {{ data.exemploAprovado }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            placeholder="Pesquisar"
          />
        </template>
      </Column>
      <Column field="classeGramatical" sortable header="Classe Gramatical">
        <template #body="{ data }">
          {{ data.classeGramatical }}
        </template>
        <template #filter="{ filterModel }">
          <Dropdown v-model="filterModel.value" :options="classesGramaticais" placeholder="Any" class="p-column-filter" :showClear="true">
        </Dropdown>
        </template>
      </Column>
      <Column field="categoria" sortable header="Categoria">
        <template #body="{ data }">
          {{ data.categoria }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            placeholder="Pesquisar"
          />
        </template>
      </Column>
      <Column field="revisao" sortable header="Revisão">
        <template #body="{ data }">
          {{ data.revisao }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            placeholder="Pesquisar"
          />
        </template>
      </Column>
      <Column :exportable="false" style="min-width:8rem">
        <template #body="slotProps">
          <Button icon="pi pi-trash" class="p-button-rounded" @click="excluir(slotProps.data)" />
        </template>
      </Column>
    </DataTable>
  </div>

  <Dialog header="Exclusão" v-model:visible="displayDeleteWord" :style="{width: '10vw'}" :modal="true">
    <div :style="{textAlign:'center'}">
      <p> Confirma a exclusão da palavra? </p><br/>
      <Button type="button" label="Sim" @click="confirmarExclusao" :style="{width: '7vw', marginRight: '2px'}" />
      <Button type="button" label="Não" @click="cancelarExclusao" :style="{width: '7vw'}" />
    </div>
  </Dialog> 

</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup"; //optional for column grouping
import Row from "primevue/row"; //optional for row
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import axios from "axios";
import { FilterMatchMode } from "primevue/api";
import PalavraService from "../services/PalavraService";
import Menu from '../components/Menu.vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

export default {
  name: "PalavraListView",
  components: {
    DataTable,
    Column,
    InputText,
    ColumnGroup,
    Row,
    Dropdown,
    Menu,
    Button,
    Dialog
  },
  data() {
    return {
      loading: true,
      words: null,
      wordToDelete: null,
      displayDeleteWord: false,
      filters: {
        'global': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'palavra': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'traducao': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'aprovada': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'significado': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'conjucacao': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'exemploAprovado': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'classeGramatical': { value: null, matchMode: FilterMatchMode.EQUALS },
        'categoria': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'revisao': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
      classesGramaticais:[
        "Substantivo",
        "Advérbio",
        "Adjetivo",
        "Preposição",
        "Verbo",
        "Conjunção",
        "Pronome",
        "Artigo"
      ]
    };
  },
  palavraService: null,
  created() {
    this.palavraService = new PalavraService();
  },
  mounted() {
    this.palavraService.getPalavras().then(data => {
      this.words = data;
    }).finally(() => {
      this.loading = false;
    });
  },
  methods:{
    excluir(palavra){
      this.wordToDelete = palavra;
      console.log(this.wordToDelete)
      this.displayDeleteWord = true;
    },
    confirmarExclusao(){
            axios.delete("http://localhost:8081/search/deleta/" + this.wordToDelete.id).then(() => {
                this.displayDeleteWord = false;
                this.$toast.add({severity:'sucess', summary:'Palavra excluída com sucesso', life: 3000});
                this.loading = true;
                this.palavraService.getPalavras().then(data => {
                    this.words = data;
                  }).finally(() => {
                    this.loading = false;
                  });
            }).catch(() => {
                this.displayDeleteWord = false;
                this.$toast.add({severity:'error', summary:'Erro', detail:'Não foi possível realizar a exclusão'})
            })
        },
        cancelarExclusao(){
            this.displayDeleteWord = false;
        },
  }
};
</script>

<style>

@import "../style/PalavraList.css"

</style>