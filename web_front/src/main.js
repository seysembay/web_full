import { createApp } from 'vue'
import './assets/css/style.css'
import App from './App.vue'
import router from "./router/index.js"
import store from './store'
import setupInterceptors from './services/setupInterceptors'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
library.add(faPaperPlane);


setupInterceptors(store)

const app = createApp(App)
app.use(router)
app.use(store)
app.component('f-icon', FontAwesomeIcon)
app.mount('#app')
