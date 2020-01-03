import UserService from "@/services/user.service";
import { httpError } from "@/services/utils";

const user = {
  namespaced: true,
  state: () => ({
    userInfo: {},
    loading: false
  }),
  getters: {
    user(state) {
      return state.userInfo;
    },
    isLogined(state) {
      if (JSON.stringify(state.userInfo) === JSON.stringify({})) {
        return false;
      } else {
        return true;
      }
    }
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    }
  },
  actions: {
    getUser({ commit }) {
      commit("setLoading", true);
      return UserService.getMe()
        .then(response => {
          commit("setUserInfo", response.data);
        })
        .catch(error => {
          httpError(error);
        })
        .finally(() => {
          commit("setLoading", false);
        });
    }
  }
};

export default user;
