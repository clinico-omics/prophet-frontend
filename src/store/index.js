import Vue from "vue";
import Vuex from "vuex";
import state from "./store.js";
import mutations from "./mutations.js";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  state,
  mutations,
  strict: debug
});
