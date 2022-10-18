<template>
	<div class="home">
		<div>

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

export default {
	name: 'HomeView',
	components: {
		HelloWorld,
		Card,
		Panel,
		InputText,
		Menubar
	},
	data() {
		return {

		}
	}
}

</script>


<style>
</style>