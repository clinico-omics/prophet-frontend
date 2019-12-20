import RoleService from "@/services/role.service";

const roles = {
  namespaced: true,
  state: () => ({
    items: [],
    loading: false
  }),
  getters: {
    roles(state) {
      return state.items;
    }
  },
  mutations: {
    setRoleList(state, payload) {
      state.items = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    }
  },
  actions: {
    getRoleList({ commit }) {
      commit("setLoading", true);
      return RoleService.getRoleList()
        .then(response => {
          commit("setRoleList", response.data);
        })
        .catch(error => {
          alert(error);
        })
        .finally(() => {
          commit("setLoading", false);
        });
    }
  }
};

export default roles;
