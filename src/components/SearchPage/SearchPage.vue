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
          clearable
          @keyup.enter.native="onSearch"
          class="input-with-select"
        >
          <el-button slot="append" @click="onSearch">Search</el-button>
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
        v-if="knowledges.length > 0"
        v-loading="loading"
      >
        <el-col
          v-for="(card, index) in knowledges"
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
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[6, 12, 24, 30, 60]"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </el-row>
  </el-row>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import Card from "../Common/Card";
import sortedUniqBy from "lodash.sorteduniqby";

export default {
  name: "SearchPage",
  props: {},
  data() {
    return {
      currentPage: 1,
      pageSize: 6,
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
    onSearch: function() {
      this.updateSearchOptions({
        limit: this.limit,
        offset: this.offset,
        q: this.queryString
      });
      this.getKnowledgeList({});
    },
    handleSizeChange: function() {
      this.updateSearchOptions({
        limit: this.limit,
        offset: this.offset
      });
      this.getKnowledgeList({});
    },
    handleCurrentChange: function() {
      this.updateSearchOptions({
        limit: this.limit,
        offset: this.offset
      });
      this.getKnowledgeList({});
    },
    ...mapActions("knowledges", ["getKnowledgeList"]),
    ...mapMutations("knowledges", ["updateSearchOptions"])
  },
  components: {
    Card
  },
  computed: {
    knowledges: function() {
      return sortedUniqBy(this.items, item => {
        return item.paper;
      });
    },
    offset: function() {
      return (this.currentPage - 1) * this.pageSize;
    },
    limit: function() {
      return this.pageSize;
    },
    ...mapState("knowledges", ["items", "loading", "total"])
  },
  created() {
    this.onSearch();
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/search-page.less";
</style>

<style lang="less">
.search-page > .show-window .el-input__inner {
  height: 28px;
}
</style>
