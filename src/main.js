// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 依赖
import Vue from "vue";
import VueI18n from "vue-i18n";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import enLocale from "element-ui/lib/locale/lang/en";

Vue.use(VueI18n);
Vue.use(ElementUI);

Vue.locale = () => {};
const i18n = new VueI18n({
  locale: "en-US", // 语言标识
  messages: {
    "en-US": enLocale
  }
});

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
  render: h => h(App),
  i18n
});
