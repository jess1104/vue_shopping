import { createApp } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App.vue";
import router from "./router";

// createApp(App).use(router).mount("#app");
const app = createApp(App);

app.use(router);
app.use(VueAxios, axios);

app.mount("#app");
