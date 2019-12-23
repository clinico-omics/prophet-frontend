import MemberService from "@/services/member.service";
import { httpError } from "@/services/utils";

const members = {
  namespaced: true,
  state: () => ({
    items: [],
    selected: [],
    loading: false
  }),
  getters: {
    isMemberSelected(state) {
      return state.selected.length > 0;
    }
  },
  mutations: {
    setMemberList(state, payload) {
      state.items = payload;
    },
    addMember(state, member) {
      state.items.unshift(member);
    },
    deleteMember(state, userId) {
      state.items = state.items.filter(item => item.id !== userId);
    },
    updateSelected(state, selected) {
      state.selected = selected;
    },
    updateMember(state, member) {
      const item = state.items.find(item => item.id === member.id);
      Object.assign(item, member);
    },
    resetSelected(state) {
      state.selected = [];
    },
    setLoading(state, payload) {
      state.loading = payload;
    }
  },
  actions: {
    getMemberList({ commit }, payload) {
      commit("setLoading", true);
      return MemberService.getMemberList(payload.projectId)
        .then(response => {
          commit("setMemberList", response.data);
        })
        .catch(error => {
          httpError(error);
        })
        .finally(() => {
          commit("setLoading", false);
        });
    },
    addMember({ commit }, data) {
      MemberService.addMember(data.projectId, data.userId, data.role)
        .then(response => {
          commit("addMember", response.data);
        })
        .catch(error => {
          httpError(error);
        });
    },
    updateMemberRole({ commit }, member) {
      MemberService.updateMemberRole(member.projectId, member.id, member.role)
        .then(response => {
          commit("updateMember", response.data);
        })
        .catch(error => {
          httpError(error);
        });
    },
    removeMember({ commit, state }, projectId) {
      for (const member of state.selected) {
        MemberService.deleteMember(projectId, member.id)
          .then(() => {
            commit("deleteMember", member.id);
          })
          .catch(error => {
            httpError(error);
          });
      }
      commit("resetSelected");
    }
  }
};

export default members;
