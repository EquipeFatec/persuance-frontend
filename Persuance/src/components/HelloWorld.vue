<template>
	<div class="hello">
		<div>
			<!-- <img alt="logo" src="../assets/logo_1.png" height="200" class="mr-2"> -->
			<img alt="logo" src="../assets/logoo.png" height="200" class="mr-2">
		</div>
		<div>
			<span class="p-input-icon-left">
				<i class="pi pi-search" />
				<InputText type="text" v-model="value3" placeholder="Search" />
				<!-- <Button icon="pi pi-search" class="p-button-rounded" /> -->
			</span>
		</div>
		<div class="p-button-rounded">
			<Button label="Consultar Textos" class="p-button-outlined p-button-info" />
			<Button label="Consultar arquivos" class="p-button-outlined p-button-info" />
		</div>

	</div>
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


export default {
	name: 'HelloWorld',
	components: {
		HelloWorld,
		Card,
		Panel,
		InputText,
		Menubar,
		Image,
		Button
	},
	data() {
		return {

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
 
 .hello {
 	background-color: rgba(242, 248, 248, 0.452);
 	height: 100vh;
 	justify-content: center;
 	display: flex;
 	align-items: center;
 	flex-direction: column;
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
 
 .p-button-rounded {
 	margin-top: 15px;
 	display: flex;
 	width: 25%;
 	size: 25px;
 	justify-content: space-around;
 	border-radius: 55px;
 }
 
 .p-button-outlined p-button-info {
 	border-color: rgb(70, 70, 175);
 }
 </style> >

