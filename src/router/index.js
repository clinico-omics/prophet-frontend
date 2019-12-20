import store from "../store";
import filter from "lodash.filter";
import { Notification } from "element-ui";
import { Loading } from "element-ui";
import { tokenIsExpired } from "@/utils/util";

import Vue from "vue";
import Router from "vue-router";
import SearchPage from "@/components/SearchPage/SearchPage";
import DailyDetail from "@/components/Daily/DailyDetail";
import DailyPage from "@/components/Daily/DailyPage";
import KnowledgeDetail from "@/components/Knowledge/KnowledgeDetail";
import KnowledgeEditor from "@/components/Knowledge/KnowledgeEditor";
import PaperTable from "@/components/Paper/PaperTable";
import PaperSubmitter from "@/components/Paper/PaperSubmitter";
import KnowledgeTable from "@/components/Paper/KnowledgeTable";
import AnnotationPage from "@/components/Annotation/AnnotationPage";
import About from "@/views/About";
import Auth from "@/views/Auth";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "root",
      components: {
        contentMgmt: SearchPage
      },
      meta: { auth: false }
    },
    {
      path: "/auth",
      name: "auth",
      components: {
        contentMgmt: Auth
      },
      meta: { auth: false }
    },
    {
      path: "/knowledge",
      name: "knowledge",
      components: {
        contentMgmt: SearchPage
      },
      meta: { auth: false }
    },
    {
      path: "/papers/knowledge-creator",
      name: "knowledge-creator",
      components: {
        contentMgmt: KnowledgeEditor
      },
      props: {
        contentMgmt: route => ({
          paperPMID: route.query.paperPMID
        })
      },
      meta: { auth: false }
    },
    {
      path: "/papers/knowledges",
      name: "paper-knowledges",
      components: {
        contentMgmt: KnowledgeTable
      },
      props: {
        contentMgmt: route => ({
          paperPMID: route.query.paperPMID
        })
      },
      meta: { auth: false }
    },
    {
      path: "/papers/mypaper",
      name: "papers",
      components: {
        contentMgmt: PaperTable
      },
      meta: { auth: false }
    },
    {
      path: "/papers/submitter",
      name: "paper-submitter",
      components: {
        contentMgmt: PaperSubmitter
      },
      meta: { auth: false }
    },
    {
      path: "/daily",
      name: "daily",
      components: {
        contentMgmt: DailyPage
      },
      meta: { auth: false }
    },
    {
      path: "/daily/:dailyId",
      name: "daily-detail",
      components: {
        contentMgmt: DailyDetail
      },
      props: {
        contentMgmt: true
      },
      meta: { auth: false }
    },
    {
      path: "/knowledge/:knowledgeId",
      name: "knowledge-detail",
      components: {
        contentMgmt: KnowledgeDetail
      },
      props: {
        contentMgmt: true
      },
      meta: { auth: false }
    },
    {
      path: "/about",
      name: "about",
      components: {
        contentMgmt: About
      },
      meta: { auth: false }
    },
    {
      path: "/annotation",
      name: "annotation",
      components: {
        contentMgmt: AnnotationPage
      },
      meta: { auth: false }
    }
  ]
});

const whiteList = [
  "^/$",
  "^/auth$",
  "^/knowledge[/]?.*$",
  "^/daily[/]?.*$",
  "^/about$"
]; // no redirect whitelist

function checkToken() {
  // Token可能过期
  const token = localStorage.getItem("token");
  var tokenIsValid = null;
  if (token) {
    tokenIsValid = !tokenIsExpired(token);
  }
  return tokenIsValid;
}

function loadToken() {
  store.dispatch("auth/initAuth");
}

var loading = undefined;

router.beforeEach((to, from, next) => {
  // 全屏菊花
  loading = Loading.service({ fullscreen: true });

  const matched = filter(whiteList, item => {
    // item as a regex pattern
    return to.path.match(item);
  });

  // Token will be not working When you refresh page.
  loadToken();

  if (matched.length > 0) {
    next();
  } else {
    const tokenIsValid = checkToken();

    if (tokenIsValid) {
      const redirect = decodeURIComponent(from.query.redirect || to.path);
      if (to.path === redirect) {
        // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        next({ ...to, replace: true });
      } else {
        // 跳转到目的路由
        next({ path: redirect });
      }
    } else {
      Notification.error({
        title: "Unauthorized",
        message: "Authorization failed. You need to login firstly.",
        showClose: true
      });
      // 过期清理
      store.dispatch("auth/logout");

      next({ path: "/", query: { redirect: to.fullPath } });
      loading.close();
    }
  }
});

router.afterEach(() => {
  setTimeout(() => {
    loading.close();
  }, 100);
});

export default router;
