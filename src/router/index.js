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

Vue.use(Router);

export default new Router({
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
