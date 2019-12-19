// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 依赖
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

// 生成数据，初始化数据库
import models from "./models/index.js";
Vue.prototype.$models = models;

// 自定义
import App from "./App";
import router from "./router";
import store from "./store/index.js";

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
});
