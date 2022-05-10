import { createApp } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App.vue";
import router from "./router";
// Import component
import Loading from "vue3-loading-overlay";
// Import stylesheet
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";

// createApp(App).use(router).mount("#app");
const app = createApp(App);

app.use(router);
app.use(VueAxios, axios);
// 全局註冊
app.component("LoadingA", Loading);
app.mount("#app");
