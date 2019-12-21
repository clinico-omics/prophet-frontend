<template lang="html">
  <el-row class="search-page">
    <el-row class="search-container">
      <el-col :xs="20" :sm="20" :md="20" :lg="10">
        <el-row class="slogan">
          Bridge the Gap Between Literature and Knowledge
        </el-row>
        <el-input
          placeholder="Search For Tumor Knowledge Points"
          v-model="queryString"
          class="input-with-select"
        >
          <el-button slot="append">Search</el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row class="show-window">
      <el-row class="show-window-header">
        <img
          class="logo"
          :src="require('../../assets/img/knowledge-point.png')"
        />
        <el-row class="news">
          <el-row>Today News</el-row>
          <p class="slogan" v-html="news"></p>
        </el-row>
      </el-row>
      <el-row
        class="card-container"
        :gutter="30"
        v-if="items.length > 0"
        v-loading="loading"
      >
        <el-col
          v-for="(card, index) in items"
          :key="index"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="8"
        >
          <card
            :card="card"
            @click.native="showKnowledgeDetail(card.paper)"
          ></card>
        </el-col>
      </el-row>
      <el-row class="not-found" v-else>
        <span>No any knowledges.</span>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Card from "../Common/Card";

export default {
  name: "SearchPage",
  props: {},
  data() {
    return {
      queryString: "",
      news: "<a href='http://datains.3steps.cn'>智汇医圈开启知识新模式</a>"
    };
  },
  methods: {
    showKnowledgeDetail: function(paperId) {
      this.$router.push({
        name: "knowledge-detail",
        params: {
          paperId: paperId
        }
      });
    },
    ...mapActions("knowledges", ["getKnowledgeList"])
  },
  components: {
    Card
  },
  computed: {
    ...mapState("knowledges", ["items", "loading"])
  },
  created() {
    this.getKnowledgeList({});
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/search-page.less";
</style>
