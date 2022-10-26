import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import getVant from "./plugins/index.js";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);
// 模块化思想（插件太多时建立一个模块去处理，集中化管理）
getVant(app);
app.use(pinia)
app.use(router);
app.mount("#app");
