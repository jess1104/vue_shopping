import { createApp } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App.vue";
import router from "./router";
// 將千分位與時間註冊為全域使用
import { currency, date } from "@/methods/filters";
// Import loading元件
import Loading from "vue3-loading-overlay";
// Import stylesheet
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";

// createApp(App).use(router).mount("#app");
const app = createApp(App);

// 全域設定globalProperties後面方法自行命名建議嘉個$字號去區分
app.config.globalProperties.$filters = {
  currency,
  date,
};

app.use(router);
app.use(VueAxios, axios);
// 全局註冊loading元件
app.component("LoadingA", Loading);
app.mount("#app");
