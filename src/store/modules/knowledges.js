import KnowledgeService from "@/services/knowledge.service";
import { httpError } from "@/services/utils";
import orderBy from "lodash.orderby";

const knowledges = {
  namespaced: true,
  state: () => ({
    items: [],
    selected: [],
    loading: true,
    current: 0,
    total: 0,
    searchOptions: {
      limit: 10,
      offset: 0,
      q: "",
      isChecked: "",
      filterName: ""
    }
  }),
  getters: {
    isKnowledgeSelected(state) {
      return state.selected.length > 0;
    },
    approved(state) {
      if (state.items[state.current]) {
        return state.items[state.current].status !== "Submitted";
      } else {
        return false;
      }
    },
    currentKnowledge(state) {
      if (state.items[state.current]) {
        return state.items[state.current];
      } else {
        return {};
      }
    }
  },
  mutations: {
    setCurrent(state, payload) {
      state.current = payload;
    },
    setKnowledgeList(state, payload) {
      state.items = orderBy(payload, "liked_num", "desc");
    },
    addKnowledge(state, knowledge) {
      state.items.unshift(knowledge);
    },
    deleteKnowledge(state, knowledgeId) {
      state.items = state.items.filter(item => item.id !== knowledgeId);
    },
    updateSelected(state, selected) {
      state.selected = selected;
    },
    updateKnowledge(state, knowledge) {
      const item = state.items.find(item => item.id === knowledge.id);
      Object.assign(item, knowledge);
    },
    resetSelected(state) {
      state.selected = [];
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setTotalItems(state, payload) {
      state.total = payload;
    },
    updateSearchOptions(state, payload) {
      state.searchOptions = Object.assign(state.searchOptions, payload);
    },
    initSearchOptions(state) {
      state.searchOptions = {
        limit: 10,
        offset: 0,
        q: "",
        isChecked: "",
        filterName: ""
      };
    }
  },
  actions: {
    getKnowledgeList({ commit, state }, payload) {
      commit("setLoading", true);
      payload = Object.assign(payload, state.searchOptions);
      return KnowledgeService.getKnowledgeList(payload)
        .then(response => {
          commit("setKnowledgeList", response.data.results);
          commit("setTotalItems", response.data.count);
        })
        .catch(error => {
          httpError(error);
        })
        .finally(() => {
          commit("setLoading", false);
        });
    },
    addKnowledge({ commit }, data) {
      return KnowledgeService.addKnowledge(data)
        .then(response => {
          commit("addKnowledge", response.data);
        })
        .catch(error => {
          httpError(error);
        });
    },
    updateKnowledge({ commit }, data) {
      KnowledgeService.updateKnowledge(data.id, data)
        .then(response => {
          commit("updateKnowledge", response.data);
        })
        .catch(error => {
          httpError(error);
        });
    },
    deleteKnowledge({ commit, state }) {
      for (const knowledge of state.selected) {
        KnowledgeService.deleteKnowledge(knowledge.id)
          .then(() => {
            commit("deleteKnowledge", knowledge.id);
          })
          .catch(error => {
            httpError(error);
          });
      }
      commit("resetSelected");
    },
    approve({ commit, getters }) {
      const knowledgeId = getters.currentKnowledge.id;
      var status = getters.currentKnowledge.status;
      if (status === "Submitted") {
        status = "Checked";
      }
      const data = {
        status: status
      };
      KnowledgeService.approveKnowledge(knowledgeId, data)
        .then(response => {
          commit("updateKnowledge", response.data);
        })
        .catch(error => {
          httpError(error);
        });
    }
  }
};

export default knowledges;
