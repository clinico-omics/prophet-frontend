import PaperService from "@/services/paper.service";
import { httpError } from "@/services/utils";

const papers = {
  namespaced: true,
  state: () => ({
    items: [],
    selected: [],
    loading: false,
    current: 0,
    total: 0,
    paper: {},
    searchOptions: {
      limit: 10,
      offset: 0,
      q: "",
      isChecked: "",
      filterName: ""
    }
  }),
  getters: {
    isPaperSelected(state) {
      return state.selected.length > 0;
    },
    approved(state) {
      if (state.items[state.current]) {
        return state.items[state.current].status !== "Submitted";
      } else {
        return false;
      }
    },
    currentPaper(state) {
      return state.paper;
    }
  },
  mutations: {
    setCurrent(state, payload) {
      state.current = payload;
    },
    setPaper(state, payload) {
      state.paper = payload;
    },
    setPaperList(state, payload) {
      state.items = payload;
    },
    addPaper(state, paper) {
      state.items.unshift(paper);
    },
    deletePaper(state, paperId) {
      state.items = state.items.filter(item => item.pmid !== paperId);
    },
    updateSelected(state, selected) {
      state.selected = selected;
    },
    updatePaper(state, paper) {
      const item = state.items.find(item => item.pmid === paper.pmid);
      Object.assign(item, paper);
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
    getPaperList({ commit, state }, payload) {
      commit("setLoading", true);
      payload = Object.assign(payload, state.searchOptions);
      return PaperService.getPaperList(payload)
        .then(response => {
          commit("setPaperList", response.data.results);
          commit("setTotalItems", response.data.count);
        })
        .catch(error => {
          httpError(error);
        })
        .finally(() => {
          commit("setLoading", false);
        });
    },
    setCurrentPaper({ commit }, paperId) {
      return PaperService.fetchPaperById(paperId)
        .then(response => {
          commit("setPaper", response.data);
        })
        .catch(error => {
          httpError(error);
        });
    },
    updatePaper({ commit }, data) {
      PaperService.updatePaper(data.id, data)
        .then(response => {
          commit("updatePaper", response.data);
        })
        .catch(error => {
          httpError(error);
        });
    },
    deletePaper({ commit, state }) {
      for (const paper of state.selected) {
        PaperService.deletePaper(paper.pmid)
          .then(() => {
            commit("deletePaper", paper.pmid);
          })
          .catch(error => {
            httpError(error);
          });
      }
      commit("resetSelected");
    },
    approve({ commit, getters }) {
      const paperId = getters.currentPaper.pmid;
      var status = getters.currentPaper.status;
      if (status === "Submitted") {
        status = "Checked";
      }
      const data = {
        status: status
      };
      PaperService.approvePaper(paperId, data)
        .then(response => {
          commit("updatePaper", response.data);
        })
        .catch(error => {
          httpError(error);
        });
    }
  }
};

export default papers;
