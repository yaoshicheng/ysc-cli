import { createApp } from "vue";
import lodash from "lodash";
import Antd from "ant-design-vue";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import { message, Modal } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import App from "./App.vue";
import router from "./router";
import "@/common/less/index.less";
import "@/common/less/global.less";

const app = createApp(App);
app.config.globalProperties.$lodash = lodash;
app.config.globalProperties.$message = message;
app.config.globalProperties.$modal = Modal;

app
  .use(Antd)
	.use(ElementPlus)
  .use(lodash)
  .use(router);

app.mount("#app");
