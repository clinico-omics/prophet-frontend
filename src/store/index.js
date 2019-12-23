import Vue from "vue";
import Vuex from "vuex";
import state from "./store.js";
import mutations from "./mutations.js";
import auth from "./modules/auth";
import documents from "./modules/documents";
import knowledges from "./modules/knowledges";
import papers from "./modules/papers";
import labels from "./modules/labels";
import members from "./modules/members";
import pagination from "./modules/pagination";
import projects from "./modules/projects";
import roles from "./modules/roles";
import user from "./modules/user";
import statistics from "./modules/statistics";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";
const namespaced = true;

export default new Vuex.Store({
  namespaced,
  modules: {
    auth,
    documents,
    knowledges,
    papers,
    labels,
    members,
    pagination,
    projects,
    roles,
    user,
    statistics
  },
  state: state,
  mutations: mutations,
  getters: {},
  actions: {},
  strict: debug
});
