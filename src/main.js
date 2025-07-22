import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import CoreuiVue from '@coreui/vue';
import CIcon from '@coreui/icons-vue';
import { iconsSet as icons } from '@/assets/icons';
import DocsExample from '@/components/DocsExample';
import '@fortawesome/fontawesome-free/css/all.css'; // Font Awesome

const app = createApp(App);

document.title = "MarkWeb"; // Título fijo

app.use(createPinia());
app.use(router);
app.use(CoreuiVue);
app.provide('icons', icons);
app.component('CIcon', CIcon);
app.component('DocsExample', DocsExample);

app.mount('#app');
