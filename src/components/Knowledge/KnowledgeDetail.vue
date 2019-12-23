<template lang="html">
  <el-row class="knowledge-detail-page" v-loading="loading">
    <el-row class="title-container" :gutter="10">
      <el-col class="title" :xs="24" :sm="24" :md="14" :lg="18">
        {{ currentKnowledge.title }}
      </el-col>
      <el-col class="button-group" :xs="24" :sm="24" :md="10" :lg="5">
        <el-tooltip
          class="item"
          content="Sync to Annotation Tool"
          placement="top"
        >
          <el-button
            icon="el-icon-upload"
            circle
            disabled
            type="warning"
            @click.native="pushKnowledge(currentKnowledge)"
          ></el-button>
        </el-tooltip>
        <el-tooltip class="item" content="Download Paper" placement="top">
          <el-button
            icon="el-icon-download"
            circle
            type="primary"
            @click.native="downloadPaper(currentPaper.doi)"
          ></el-button>
        </el-tooltip>
        <el-tooltip class="item" content="Like the Paper" placement="top">
          <el-button
            round
            icon="el-icon-star-on"
            v-if="currentKnowledge.liked_num"
            type="danger"
          >
            Like {{ currentKnowledge.liked_num }}
          </el-button>
          <el-button
            round
            icon="el-icon-star-off"
            v-if="!currentKnowledge.liked_num"
          >
            Like
          </el-button>
        </el-tooltip>
      </el-col>
    </el-row>
    <el-row class="details">
      <span>Author: {{ currentKnowledge.owner }}</span>
      <span>Editor: {{ currentKnowledge.editor }}</span>
      <span>{{ currentKnowledge.date }}</span>
    </el-row>
    <el-row class="show-window">
      <el-col class="content" :xs="24" :sm="24" :md="24" :lg="10">
        <el-row class="header" :gutter="10">
          <el-col :span="12">
            <el-select
              filterable
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
          <el-col :span="12">
            <el-button type="primary" disabled>Add New Version</el-button>
          </el-col>
        </el-row>
        <el-row class="paper-content">
          <p v-html="Knowledge"></p>
        </el-row>
      </el-col>
      <el-col class="image" :xs="24" :sm="24" :md="24" :lg="13">
        <img :src="currentKnowledge.image_src" />
      </el-col>
    </el-row>
    <el-row class="show-window">
      <el-col class="detail" :xs="24" :sm="24" :md="24" :lg="5">
        <el-row class="item">
          <el-row class="title">Journal</el-row>
          <el-row>{{ currentPaper.journal }}</el-row>
        </el-row>
        <el-row class="item">
          <el-row class="title">Impact Factor</el-row>
          <el-row>{{ impactFactor }}</el-row>
        </el-row>
        <el-row class="item">
          <el-row class="title">Published Date</el-row>
          <el-row>{{ currentPaper.pubdate }}</el-row>
        </el-row>
        <el-row class="item">
          <el-row class="title">Created Date</el-row>
          <el-row>{{ createdDate }}</el-row>
        </el-row>
        <el-row class="item">
          <el-row class="title">Status</el-row>
          <el-row>{{ currentKnowledge.status }}</el-row>
        </el-row>
        <el-row class="item">
          <el-row class="title">Keywords</el-row>
          <el-row class="tag-container">
            <span v-for="keyword in keywords" :key="keyword">
              {{ keyword }}
            </span>
          </el-row>
        </el-row>
      </el-col>
      <el-col class="detail" :xs="24" :sm="24" :md="24" :lg="9">
        <el-row class="title">{{ currentPaper.title }}</el-row>
        <el-row class="author">{{ currentPaper.authors }}</el-row>
        <el-row class="abstract">{{ currentPaper.abstract }}</el-row>
        <el-row class="keyword">
          <b>Keywords: </b>{{ currentPaper.keywords }}
        </el-row>
        <el-row class="link">
          <el-col class="left" :span="12">
            PMID: {{ currentPaper.pmid }}
          </el-col>
          <el-col class="right" :span="12">
            {{ currentPaper.doi }}
          </el-col>
        </el-row>
      </el-col>
      <el-col class="detail" :xs="24" :sm="24" :md="24" :lg="9">
        <el-row class="title">Recommendation</el-row>
      </el-col>
    </el-row>
    <el-row class="data-visulization" v-if="notShow">
      <el-col class="summary" :xs="24" :sm="24" :md="24" :lg="5"> </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="18" class="container"> </el-col>
    </el-row>
    <el-row class="recommendation" v-if="notShow">
      <el-col class="summary" :xs="24" :sm="24" :md="24" :lg="5"> </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="18" class="container"> </el-col>
    </el-row>
  </el-row>
</template>

<script>
import sortedUniq from "lodash.sorteduniq";
import map from "lodash.map";
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";

export default {
  name: "KnowledgeDetail",
  props: {},
  data() {
    return {
      notShow: false,
      version: ""
    };
  },
  methods: {
    downloadPaper: function(doi) {
      const source = "https://sci-hub.tw/" + doi;
      window.open(source, "_blank");
    },
    selectKnowledge: function(value) {
      this.setLoading(true);
      this.setCurrent(value);
      setTimeout(() => {
        this.setLoading(false);
      }, 500);
    },
    ...mapActions("papers", ["setCurrentPaper"]),
    ...mapActions("knowledges", ["getKnowledgeList"]),
    ...mapMutations("knowledges", ["setCurrent", "setLoading"])
  },
  mounted() {
    if (this.knowledgeVersions.length > 0) {
      this.version = this.knowledgeVersions[0];
    }
  },
  computed: {
    knowledgeVersions: function() {
      return map(this.items, item => {
        const language = item.language.toLowerCase();
        return item.pmid + " - " + item.owner + " - " + language;
      });
    },
    Knowledge: function() {
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
    createdDate: function() {
      if (this.currentPaper.created_at) {
        return this.currentPaper.created_at.slice(0, 10);
      } else {
        return "Unknown";
      }
    },
    keywords: function() {
      if (this.currentPaper.keywords) {
        return sortedUniq(this.currentPaper.keywords.split(";"));
      } else {
        return ["Unknown"];
      }
    },
    ...mapGetters("papers", ["currentPaper"]),
    ...mapGetters("knowledges", ["currentKnowledge"]),
    ...mapState("knowledges", ["items", "loading"])
  },
  watch: {},
  components: {},
  created() {
    const paperId = this.$route.params.paperId;
    this.setCurrentPaper(paperId);
    this.getKnowledgeList({ paper: paperId });
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/knowledge-detail.less";
</style>

<style lang="less">
.show-window .el-input__inner {
  height: 40px;
  width: 100%;
}

.show-window .el-select {
  width: 100%;
}

.show-window .el-button {
  width: 100%;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
}
</style>
