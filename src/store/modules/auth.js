import Cookie from "js-cookie";
import ApiService from "@/services/api.service";
import AuthService from "@/services/auth.service";
import store from "@/store";

const auth = {
  namespaced: true,
  state: () => ({
    token: null
  }),
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = null;
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.token != null;
    }
  },
  actions: {
    authenticateUser({ commit }, authData) {
      return AuthService.postCredential(authData).then(result => {
        commit("setToken", result.data.token);
        localStorage.setItem("token", result.data.token);
        Cookie.set("jwt", result.data.token);
        ApiService.setHeader(result.data.token);
      });
    },
    initAuth({ commit, dispatch }, req) {
      dispatch;
      let token;
      if (req) {
        if (!req.headers.cookie) {
          return;
        }
        const jwtCookie = req.headers.cookie
          .split(";")
          .find(c => c.trim().startsWith("jwt="));
        if (!jwtCookie) {
          return;
        }
        token = jwtCookie.split("=")[1];
      } else {
        token = localStorage.getItem("token");
      }
      commit("setToken", token);
      ApiService.setHeader(token);
    },
    logout({ commit }) {
      store.commit("user/setUserInfo", {});
      commit("clearToken");
      Cookie.remove("jwt");
      localStorage.removeItem("token");
    }
  }
};

export default auth;
