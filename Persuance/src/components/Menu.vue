<template>
    <Toast />
    <SplitButton class="menu" id="import" label="Menu" :model="items" style="position: absolute; left: 21px; 
     top: 21px; ">
    </SplitButton>
</template>


<script>
import SplitButton from 'primevue/splitbutton';
import Toast from 'primevue/toast';

export default {
    name: 'Menu',
    components: {
        SplitButton,
        Toast
    },
    data() {
        return {
            items: [
				{
					label: 'Buscar palavra',
					icon: 'pi pi-search',
					command: () => {
						//this.$toast.add({severity:'success', summary:'Updated', detail:'Data Updated', life: 3000});
                        window.location.href= "/";
					}
				},
				{
					label: 'Cadastrar palavra',
					icon: 'pi pi-plus',
					command: () => {
						//this.$toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000});
                         window.location.href= "/#/administrador";
					}
				},
                {
					label: 'Listar palavras',
					icon: 'pi pi-list',
					command: () => {
						//this.$toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000});
                        //window.location.href= "";
						window.location.href="/#/palavra-list";
					}
				},
                {
					label: 'Sair',
					icon: 'pi pi-times',
					command: () => {
						this.$toast.add({ severity: 'success', summary: 'Logout', detail: 'Logout Realizado', life: 3000});
						localStorage.removeItem("userToken");
						window.location.href="/#/home";
					}
				},
			]
        }}}
</script>
