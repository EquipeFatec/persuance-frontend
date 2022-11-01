<template>
  <div class="list">
    <h1 class="titulo">Tela de Filtros</h1>
    <DataTable
      :value="words"
      :paginator="true"
      :rows="5"
      :rowHover="true"
      v-model:filters="filters"
      :loading="loading"
      :rowsPerPageOptions="[5, 10, 25, 50]"
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
      <Column field="palavra" header="palavra" sortable style="min-width: 14rem">
        <template #body="{ data }">
          {{ data.palavra }}
        </template>
        <template #filter="{ filterModel }">
          <InputText
            type="text"
            v-model="filterModel.value"
            class="p-column-filter"
            placeholder="Search by name"
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
            placeholder="Search by name"
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
            placeholder="Search by name"
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
            placeholder="Search by name"
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
            placeholder="Search by name"
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
            placeholder="Search by name"
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
            placeholder="Search by name"
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
            placeholder="Search by name"
          />
        </template>
      </Column>
    </DataTable>
  </div>
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

export default {
  name: "PalavraListView",
  components: {
    DataTable,
    Column,
    InputText,
    ColumnGroup,
    Row,
    Dropdown
  },
  data() {
    return {
      loading: true,
      words: null,
      filters: {
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'palavra': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'traducao': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'aprovada': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'significado': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'conjucacao': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'exemploAprovado': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'classeGramatical': { value: null, matchMode: FilterMatchMode.EQUALS },
        'categoria': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'revisao': { value: null, matchMode: FilterMatchMode.CONTAINS },
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
};
</script>

<style>

@import "../style/PalavraList.css"

</style>