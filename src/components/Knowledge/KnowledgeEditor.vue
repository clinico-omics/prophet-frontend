<template lang="html">
  <el-row class="knowledge-editor">
    <el-row class="control-panel">
      <el-col class="project-btn-group" :span="12">
        <el-button
          @click="returnPaperList"
          type="primary"
          icon="el-icon-arrow-left"
          circle
        ></el-button>
      </el-col>
      <el-col class="anno-btn-group" :span="12">
        <el-tooltip class="item" content="Show Knowledges" placement="top">
          <el-button
            type="primary"
            icon="el-icon-view"
            circle
            @click="showPreview(currentPaper.pmid)"
          ></el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          content="Add/Edit Knowledge (English)"
          placement="top"
        >
          <el-button
            type="success"
            icon="el-icon-edit"
            circle
            @click="editKnowledge('English')"
          ></el-button>
        </el-tooltip>
        <el-tooltip
          class="item"
          content="Add/Edit Knowledge (Chinese)"
          placement="top"
        >
          <el-button
            type="danger"
            icon="el-icon-edit"
            circle
            @click="editKnowledge('Chinese')"
          ></el-button>
        </el-tooltip>
        <el-tooltip class="item" content="Download Paper" placement="top">
          <el-button
            type="success"
            icon="el-icon-download"
            circle
            @click="downloadPaper(currentPaper.doi)"
          ></el-button>
        </el-tooltip>
      </el-col>
    </el-row>
    <el-row class="summary">
      <el-col class="left" :xs="24" :sm="24" :md="24" :lg="5">
        <el-row class="info">
          <el-row>
            <span><b>Journal: </b></span>
            <span>{{ currentPaper.journal }}</span>
          </el-row>
          <el-row>
            <span><b>ImpactFactor: </b></span>
            <span>{{ impactFactor }}</span>
          </el-row>
          <el-row>
            <span><b>PMID: </b></span>
            <span>{{ currentPaper.pmid }}</span>
          </el-row>
          <el-row>
            <span><b>DOI: </b></span>
            <span>{{ currentPaper.doi }}</span>
          </el-row>
          <el-row>
            <span><b>Keywords: </b></span>
            <span>{{ currentPaper.keywords }}</span>
          </el-row>
          <el-row>
            <span><b>PublishedDate: </b></span>
            <span>{{ currentPaper.pubdate }}</span>
          </el-row>
          <el-row>
            <span><b>Author: </b></span>
            <span>{{ currentPaper.authors }}</span>
          </el-row>
        </el-row>
      </el-col>
      <el-col class="separator" :lg="1">
        <img :src="require('../../assets/img/separator.png')" />
      </el-col>
      <el-col class="right" :xs="24" :sm="24" :md="24" :lg="18">
        <el-row class="content">
          <el-row class="title">{{ currentPaper.title }}</el-row>
          <el-row class="abstract">{{ currentPaper.abstract }}</el-row>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="knowledge-creator" v-if="knowledgeCreatorActive">
      <knowledge-form
        :knowledge="currentVersion"
        :paper="paper"
        :language="language"
        @close-knowledge-form="closeForm"
      ></knowledge-form>
    </el-row>
    <el-row class="preview-container" v-if="knowledgeActive">
      <el-row class="header">
        <el-col class="title" :lg="18" :xs="24" :sm="24" :md="24">
          <p v-html="currentKnowledge.title"></p>
        </el-col>
        <el-col class="button-group" :lg="6" :xs="24" :sm="24" :md="24">
          <el-select
            v-model="version"
            placeholder="Please Choose Other Version"
            no-data-text="No More Versions"
            @change="selectKnowledge"
          >
            <el-option
              v-for="(item, index) in knowledgeVersions"
              :key="item"
              :label="item"
              :value="index"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="body">
        <el-col class="content" :lg="12" :xs="24" :sm="24" :md="24">
          <p v-html="knowledge"></p>
        </el-col>
        <el-col class="image" :lg="12" :xs="24" :sm="24" :md="24">
          <img :src="currentKnowledge.image_src" />
        </el-col>
      </el-row>
    </el-row>
    <div
      class="mask-window"
      @click="hidePreview()"
      v-if="knowledgeActive || knowledgeCreatorActive"
    ></div>
  </el-row>
</template>

<script>
import map from "lodash.map";
import find from "lodash.find";
import KnowledgeForm from "./KnowledgeForm";
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";

export default {
  name: "KnowledgeEditor",
  props: {},
  data() {
    return {
      version: "",
      paper: 0,
      language: "English",
      currentVersion: {},
      knowledgeActive: false,
      knowledgeCreatorActive: false
    };
  },
  computed: {
    knowledgeVersions: function() {
      return map(this.items, item => {
        const language = item.language.toLowerCase();
        return item.pmid + " - " + item.owner + " - " + language;
      });
    },
    knowledge: function() {
      const content = this.currentKnowledge.content;
      if (content) {
        return content.replace(/([②③④⑤⑥⑦⑧⑨⑩])/g, "<br/><br/>$1");
      } else {
        return "";
      }
    },
    impactFactor: function() {
      if (this.currentPaper.impactFactor) {
        return this.currentPaper.impactFactor;
      } else {
        return "Unknown";
      }
    },
    ...mapGetters("papers", ["currentPaper"]),
    ...mapGetters("knowledges", ["currentKnowledge"]),
    ...mapState("knowledges", ["items", "loading"])
  },
  mounted() {
    if (this.knowledgeVersions.length > 0) {
      this.version = this.knowledgeVersions[0];
    }
  },
  methods: {
    editKnowledge: function(language) {
      const knowledge = find(this.items, function(o) {
        return o.language === language;
      });

      if (JSON.stringify(knowledge) !== "undefined") {
        this.currentVersion = knowledge;
      } else {
        this.currentVersion = {};
      }

      this.paper = this.currentPaper.pmid;
      this.knowledgeCreatorActive = true;
      this.language = language;
    },
    closeForm: function() {
      this.knowledgeCreatorActive = false;
    },
    returnPaperList: function() {
      this.$router.push({
        name: "papers"
      });
    },
    hidePreview: function() {
      this.knowledgeActive = false;
    },
    showPreview: function() {
      if (this.items.length > 0) {
        this.knowledgeActive = true;
      } else {
        this.$message.warning("Oops, no knowledges, please add new knowledge.");
      }
    },
    selectKnowledge: function(value) {
      this.setLoading(true);
      this.setCurrent(value);
      setTimeout(() => {
        this.setLoading(false);
      }, 500);
    },
    ...mapActions("papers", ["setCurrentPaper", "downloadPaper"]),
    ...mapActions("knowledges", ["getKnowledgeList"]),
    ...mapMutations("knowledges", ["setCurrent", "setLoading"])
  },
  components: {
    KnowledgeForm
  },
  created() {
    const paperId = this.$route.params.paperId;
    this.setCurrentPaper(paperId);
    this.getKnowledgeList({ paper: paperId });
  }
};
</script>

<style lang="less">
@import "../../assets/css/knowledge-editor.less";
</style>
