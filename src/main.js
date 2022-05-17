import { createApp } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App.vue";
import router from "./router";

// 引用bootstrap Icons
import "bootstrap-icons/font/bootstrap-icons.css";

// 將千分位與時間註冊為全域使用
import { currency, date } from "@/methods/filters";

// Import loading元件
import Loading from "vue3-loading-overlay";
// Import loading stylesheet
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";

// 匯入 vee-validate 主套件
import { Field, Form, ErrorMessage, defineRule, configure } from "vee-validate";
// 匯入 vee-validate 相關規則
import { required, email, min, max } from "@vee-validate/rules";
// 匯入多國語系的功能
import { localize, setLocale } from "@vee-validate/i18n";
// 匯入繁體中文語系檔案
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";

// createApp(App).use(router).mount("#app");
const app = createApp(App);

// 全域設定globalProperties後面方法自行命名建議嘉個$字號去區分
app.config.globalProperties.$filters = {
  currency,
  date,
};

// 定義驗證規則
defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);
// 設定 vee-validate 全域規則
configure({
  generateMessage: localize({ zh_TW: zhTW }),
});
// 設定預設語系
setLocale("zh_TW");

app.use(router);
app.use(VueAxios, axios);
// 全局註冊loading元件
app.component("LoadingA", Loading);
// 全局註冊veeValidate表單元件
app.component("Form", Form);
app.component("Field", Field);
app.component("ErrorMessage", ErrorMessage);

app.mount("#app");
