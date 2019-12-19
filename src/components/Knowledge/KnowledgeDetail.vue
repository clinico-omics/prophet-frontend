<template lang="html">
  <el-row class="knowledge-detail-page" v-if="paper && knowledge">
    <el-row class="title-container" :gutter="10">
      <el-col class="title" :xs="24" :sm="24" :md="14" :lg="18">
        {{ knowledge.title }}
      </el-col>
      <el-col class="button-group" :xs="24" :sm="24" :md="10" :lg="5">
        <el-button
          icon="el-icon-search"
          round
          type="primary"
          @click.native="downloadPaper(paper.source)"
        >
          GetPaper
        </el-button>
        <el-button
          round
          icon="el-icon-star-on"
          v-if="knowledge.liked"
          type="danger"
        >
          Like {{ knowledge.likedNum }}
        </el-button>
        <el-button round icon="el-icon-star-off" v-if="!knowledge.liked">
          Like
        </el-button>
      </el-col>
    </el-row>
    <el-row class="details">
      <span>Author: {{ knowledge.author }}</span>
      <span>Editor: {{ knowledge.editor }}</span>
      <span>{{ knowledge.date }}</span>
    </el-row>
    <el-row class="show-window">
      <el-col class="content" :xs="24" :sm="24" :md="24" :lg="10">
        <el-row class="header" :gutter="10">
          <el-col :span="12">
            <el-select
              v-model="version"
              placeholder="Please Choose Other Version"
              no-data-text="No More Versions"
            >
              <el-option
                v-for="item in knowledgeVersions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-button type="primary">Add New Version</el-button>
          </el-col>
        </el-row>
        <el-row class="paper-content">
          <p v-html="convertContent(knowledge.content)"></p>
        </el-row>
      </el-col>
      <el-col class="image" :xs="24" :sm="24" :md="24" :lg="13">
        <img :src="knowledge.imageSrc" />
      </el-col>
    </el-row>
    <el-row class="show-window">
      <el-col class="detail" :xs="24" :sm="24" :md="24" :lg="5">
        <el-row class="item">
          <el-row class="title">Journal</el-row>
          <el-row>{{ paper.journal }}</el-row>
        </el-row>
        <el-row class="item">
          <el-row class="title">ImpactFactor</el-row>
          <el-row>{{ paper.impactFactor }}</el-row>
        </el-row>
        <el-row class="item">
          <el-row class="title">PublishedDate</el-row>
          <el-row>{{ paper.publishedDate }}</el-row>
        </el-row>
        <el-row class="item">
          <el-row class="title">Keywords</el-row>
          <el-row class="tag-container">
            <span v-for="tag in knowledge.tags" :key="tag">{{ tag }}</span>
          </el-row>
        </el-row>
        <el-row class="item">
          <el-row class="title">EditorComment</el-row>
          <el-row>{{ knowledge.editorComment }}</el-row>
        </el-row>
      </el-col>
      <el-col class="detail" :xs="24" :sm="24" :md="24" :lg="9">
        <el-row class="title">{{ paper.paperTitle }}</el-row>
        <el-row class="author">{{ paper.paperAuthors }}</el-row>
        <el-row class="abstract">{{ paper.paperAbstract }}</el-row>
        <el-row class="keyword"><b>Keywords: </b>{{ paper.keywords }}</el-row>
        <el-row class="link">
          <el-col class="left" :span="12"> PMID: {{ paper.paperPMID }} </el-col>
          <el-col class="right" :span="12">
            {{ paper.paperDOI }}
          </el-col>
        </el-row>
      </el-col>
      <el-col class="detail" :xs="24" :sm="24" :md="24" :lg="9">
        <!-- Comment -->
        <el-row class="title">UserComment</el-row>
        <section
          id="isso-thread"
          ref="isso"
          :data-title="knowledge.knowledgeId"
        ></section>
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
export default {
  name: "KnowledgeDetail",
  props: {},
  data() {
    return {
      notShow: false,
      knowledge: null,
      paper: null,
      knowledgeVersions: [],
      version: ""
    };
  },
  methods: {
    downloadPaper: function(source) {
      window.open(source, "_blank");
    },
    convertContent(content) {
      return content.replace(/([②③④⑤⑥⑦⑧⑨⑩])/g, "<br/><br/>$1");
    },
    getKnowledgeById() {},
    getPaperById() {}
  },
  mounted() {},
  computed: {},
  watch: {},
  components: {},
  created() {
    this.getKnowledgeById(this.$route.params.knowledgeId);
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
