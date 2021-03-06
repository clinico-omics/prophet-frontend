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
          <el-popover placement="right" width="500" trigger="click">
            <el-table :data="filteredProject" v-loading="loading">
              <el-table-column
                width="150"
                property="name"
                label="Project Name"
              ></el-table-column>
              <el-table-column
                width="300"
                property="description"
                label="Description"
              ></el-table-column>
              <el-table-column width="100" label="Status">
                <template slot-scope="scope">
                  <el-button type="success" size="small">
                    fetchDocument({{ scope.row.id }})
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="Action" width="80">
                <template slot-scope="scope">
                  <el-button
                    @click="syncToProject(currentKnowledge, scope.row)"
                    type="warning"
                    size="small"
                  >
                    Sync
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button
              icon="el-icon-upload"
              circle
              :disabled="disableSyncBtn"
              @click.native="fetchProjects"
              type="warning"
              slot="reference"
            ></el-button>
          </el-popover>
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
        <img
          :src="currentKnowledge.image_src"
          v-if="currentKnowledge.image_src"
        />
        <span>Comming Soon...</span>
      </el-col>
    </el-row>
    <el-row class="show-window">
      <el-col class="detail" :xs="24" :sm="24" :md="24" :lg="5">
        <el-row class="item">
          <el-row class="title">Journal</el-row>
          <el-row>{{ currentPaper.journal }}</el-row>
        </el-row>
        <el-row class="item">
          <el-row class="title">PMID</el-row>
          <el-row>{{ currentPaper.pmid }}</el-row>
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
      <el-col class="summary" :xs="24" :sm="24" :md="24" :lg="5"></el-col>
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
import filter from "lodash.filter";
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";

export default {
  name: "KnowledgeDetail",
  props: {},
  data() {
    return {
      notShow: false
    };
  },
  methods: {
    selectKnowledge: function(value) {
      this.setLoading(true);
      this.setCurrent(value);
      setTimeout(() => {
        this.setLoading(false);
      }, 500);
    },
    async syncToProject(currentKnowledge, currentProject) {
      const data = {
        reference_id: currentKnowledge.id,
        reference_type: "Knowledge",
        text: currentKnowledge.content,
        meta: JSON.stringify(currentKnowledge)
      };

      const payload = {
        projectId: currentProject.id,
        refid: currentKnowledge.id,
        reftype: "Knowledge"
      };

      await this.addOrUpdateDocument({ payload, data });
    },
    async fetchProjects() {
      await this.getProjectList();
    },
    ...mapActions("papers", ["setCurrentPaper", "downloadPaper"]),
    ...mapActions("projects", ["getProjectList"]),
    ...mapActions("knowledges", ["getKnowledgeList"]),
    ...mapActions("documents", ["addOrUpdateDocument", "getDocumentList"]),
    ...mapMutations("knowledges", ["setCurrent", "setLoading"])
  },
  mounted() {},
  computed: {
    version: function() {
      if (this.knowledgeVersions.length > 0) {
        return this.knowledgeVersions[0];
      } else {
        return undefined;
      }
    },
    disableSyncBtn: function() {
      if (this.isLogined) {
        return false;
      } else {
        return true;
      }
    },
    knowledgeVersions: function() {
      return map(this.items, item => {
        const language = item.language.toLowerCase();
        return item.pmid + " - " + item.owner + " - " + language;
      });
    },
    loading: function() {
      if (this.filteredProject.length == 0) {
        return true;
      } else {
        return false;
      }
    },
    filteredProject: function() {
      return filter(this.projects, item => {
        return (
          item.users.includes(this.userInfo.id) || this.userInfo.is_superuser
        );
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
    keywords: function() {
      if (this.currentPaper.keywords) {
        return sortedUniq(this.currentPaper.keywords.split(";"));
      } else {
        return ["Unknown"];
      }
    },
    ...mapGetters("papers", ["currentPaper"]),
    ...mapGetters("knowledges", ["currentKnowledge"]),
    ...mapState("knowledges", ["items", "loading"]),
    ...mapState("projects", ["projects"]),
    ...mapState("user", ["userInfo"]),
    ...mapState("documents", ["total"]),
    ...mapGetters("user", ["isLogined"])
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
