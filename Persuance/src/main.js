import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import router from './router'
import store from './store'
import 'primevue/resources/themes/saga-blue/theme.css'     //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'                          //icons
import FileUpload from 'primevue/fileupload'
import ToastService from 'primevue/toastservice';

const app = createApp(App)
app.use(PrimeVue)
app.use(router)
app.use(ToastService)
app.component('FileUpload', FileUpload);
app.mount('#app');

