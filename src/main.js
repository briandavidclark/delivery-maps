import {createApp} from 'vue';
import {Quasar} from 'quasar';
import Panzoom from 'panzoom';
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';
import App from './App.vue';

const myApp = createApp(App);

myApp.use(Quasar, {
	plugins: {} // import Quasar plugins and add here
});

myApp.mount('#app');
