import ApiService from "@/services/api.service";

class KnowledgeService {
  constructor() {
    this.request = ApiService;
  }

  getKnowledgeList({ limit, offset, q = "", isChecked = "", filterName = "" }) {
    return this.request.get(
      `/knowledges?limit=${limit}&offset=${offset}&q=${q}&${filterName}=${isChecked}`
    );
  }

  addKnowledge(payload) {
    return this.request.post(`/knowledges`, payload);
  }

  deleteKnowledge(knowledgeId) {
    return this.request.delete(`/knowledges/${knowledgeId}`);
  }

  updateKnowledge(knowledgeId, payload) {
    return this.request.patch(`/knowledges/${knowledgeId}`, payload);
  }

  fetchKnowledgeById(knowledgeId) {
    return this.request.get(`/knowledges/${knowledgeId}`);
  }
}

export default new KnowledgeService();
