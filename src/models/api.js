"use strict";

import axios from "axios";

var apis = {
  papers: "http://localhost:8081/prophet/api/v1/papers",
  knowledges: "http://localhost:8081/prophet/api/v1/knowledges",
  tags: "http://localhost:8081/prophet/api/v1/tags"
};

console.log(apis);

var prod = {
  getDailyById() {},
  getDailys() {},
  updateDailyById() {},
  deleteDailyById() {},
  getKnowledgeById(apiURL, successHandler, errorHandler) {
    axios({
      method: "get",
      url: apiURL
    })
      .then(res => {
        console.log(res.data);
        var resData = res.data;
        successHandler(resData);
      })
      .catch(error => {
        console.log(error);
        if (errorHandler != undefined) {
          errorHandler(error);
        }
      });
  },
  getKnowledges(apiURL, successHandler, errorHandler) {
    axios({
      method: "get",
      url: apiURL
    })
      .then(res => {
        console.log(res.data);
        var resData = res.data;
        successHandler(resData);
      })
      .catch(error => {
        console.log(error);
        if (errorHandler != undefined) {
          errorHandler(error);
        }
      });
  },
  updateKnowledgeById(apiURL, successHandler, errorHandler) {
    axios({
      method: "put",
      url: apiURL
    })
      .then(res => {
        console.log(res.data);
        var resData = res.data;
        successHandler(resData);
      })
      .catch(error => {
        console.log(error);
        if (errorHandler != undefined) {
          errorHandler(error);
        }
      });
  },
  deleteKnowledgeById(apiURL, successHandler, errorHandler) {
    axios({
      method: "delete",
      url: apiURL
    })
      .then(res => {
        console.log(res.data);
        var resData = res.data;
        successHandler(resData);
      })
      .catch(error => {
        console.log(error);
        if (errorHandler != undefined) {
          errorHandler(error);
        }
      });
  },
  getTags(apiURL, successHandler, errorHandler) {
    axios({
      method: "get",
      url: apiURL
    })
      .then(res => {
        console.log(res.data);
        var resData = res.data;
        successHandler(resData);
      })
      .catch(error => {
        console.log(error);
        if (errorHandler != undefined) {
          errorHandler(error);
        }
      });
  },
  getTagById(apiURL, successHandler, errorHandler) {
    axios({
      method: "get",
      url: apiURL
    })
      .then(res => {
        console.log(res.data);
        var resData = res.data;
        successHandler(resData);
      })
      .catch(error => {
        console.log(error);
        if (errorHandler != undefined) {
          errorHandler(error);
        }
      });
  },
  deleteTagById(apiURL, successHandler, errorHandler) {
    axios({
      method: "delete",
      url: apiURL
    })
      .then(res => {
        console.log(res.data);
        var resData = res.data;
        successHandler(resData);
      })
      .catch(error => {
        console.log(error);
        if (errorHandler != undefined) {
          errorHandler(error);
        }
      });
  },
  getPaperById(apiURL, successHandler, errorHandler) {
    axios({
      method: "get",
      url: apiURL
    })
      .then(res => {
        console.log(res.data);
        var resData = res.data;
        successHandler(resData);
      })
      .catch(error => {
        console.log(error);
        if (errorHandler != undefined) {
          errorHandler(error);
        }
      });
  },
  getPapers(apiURL, successHandler, errorHandler) {
    axios({
      method: "get",
      url: apiURL
    })
      .then(res => {
        console.log(res.data);
        var resData = res.data;
        successHandler(resData);
      })
      .catch(error => {
        console.log(error);
        if (errorHandler != undefined) {
          errorHandler(error);
        }
      });
  },
  updatePaperById(apiURL, successHandler, errorHandler) {
    axios({
      method: "put",
      url: apiURL
    })
      .then(res => {
        console.log(res.data);
        var resData = res.data;
        successHandler(resData);
      })
      .catch(error => {
        console.log(error);
        if (errorHandler != undefined) {
          errorHandler(error);
        }
      });
  },
  deletePaperById(apiURL, successHandler, errorHandler) {
    axios({
      method: "delete",
      url: apiURL
    })
      .then(res => {
        console.log(res.data);
        var resData = res.data;
        successHandler(resData);
      })
      .catch(error => {
        console.log(error);
        if (errorHandler != undefined) {
          errorHandler(error);
        }
      });
  }
};

export default prod;
