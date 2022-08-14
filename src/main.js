import { createApp } from 'vue'
import BootstrapVue3 from 'bootstrap-vue-3'

import App from './App.vue'
import router from './router'
import vSelect from "vue-select";
import Toast, { POSITION } from "vue-toastification";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import "vue-toastification/dist/index.css";
import "vue-select/dist/vue-select.css";

const options = {
    position: POSITION.BOTTOM_RIGHT,
    timeout: 3000
};

createApp(App)
    .use(router)
    .use(BootstrapVue3)
    .use(Toast, options)
    .component("v-select", vSelect)
    .mount('#app')
