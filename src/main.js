import { createApp } from 'vue'
import App from './App.vue'
import './styles.css';
import router from './router';
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options = {
    pauseOnHover: false,
};

createApp(App).use(router).use(Toast,options).mount('#app')
