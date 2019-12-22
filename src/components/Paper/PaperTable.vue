<template lang="html">
  <el-row class="paper-table-container">
    <el-row class="paper-table" v-if="mobileActive">
      Not Support Mobile Phone, Please Access on PC
    </el-row>
    <el-row class="paper-table" v-if="!mobileActive">
      <el-row class="search-bar">
        <el-input
          placeholder="Please Enter PMID/DOI/Title"
          v-model="queryString"
          clearable
          class="input-with-select"
          @change="onSearch"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-row>
      <el-table
        :data="items"
        stripe
        highlight-current-row
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column type="expand" fixed>
          <template slot-scope="props">
            <el-row v-html="props.row.abstract" class="abstract"></el-row>
            <el-row class="author-container">
              {{ props.row.authors }}
            </el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="Paper Title"
          min-width="500"
          align="left"
          header-align="center"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="total_knowledges"
          label="Knowledges"
          width="150"
          align="center"
          header-align="center"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="journal"
          label="Journal"
          width="150"
          align="center"
          header-align="center"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="published_date"
          label="Published Date"
          width="150"
          align="center"
          header-align="center"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="pmid"
          label="PMID"
          width="120"
          align="center"
          header-align="center"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="doi"
          label="DOI"
          width="180"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="Action"
          width="260"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            <el-button
              @click.native="downloadPaper(scope.row.doi)"
              type="primary"
              size="small"
            >
              Full Paper
            </el-button>
            <el-button
              @click.native="sumbitKnowledge(scope.row.id)"
              type="primary"
              size="small"
            >
              Submit Knowledge
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[1, 10, 30, 50, 80, 100]"
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

export default {
  name: "PaperTable",
  data() {
    return {
      queryString: "",
      currentPage: 1,
      pageSize: 10,
      mobileActive: false
    };
  },
  methods: {
    onSearch: function() {
      this.updateSearchOptions({
        limit: this.limit,
        offset: this.offset,
        q: this.queryString
      });
      this.getPaperList({});
    },
    handleSizeChange: function() {
      this.updateSearchOptions({
        limit: this.limit,
        offset: this.offset
      });
      this.getPaperList({});
    },
    handleCurrentChange: function() {
      this.updateSearchOptions({
        limit: this.limit,
        offset: this.offset
      });
      this.getPaperList({});
    },
    downloadPaper: function(doi) {
      const source = "https://sci-hub.tw/" + doi;
      window.open(source, "_blank");
    },
    sumbitKnowledge: function(paperId) {
      this.$router.push({
        name: "knowledge-creator",
        params: {
          paperId: paperId
        }
      });
    },
    ...mapActions("papers", ["getPaperList"]),
    ...mapMutations("papers", ["updateSearchOptions"])
  },
  computed: {
    offset: function() {
      return (this.currentPage - 1) * this.pageSize;
    },
    limit: function() {
      return this.pageSize;
    },
    isMobile: function() {
      return this.$store.state.isMobile;
    },
    ...mapState("papers", ["items", "loading", "total"])
  },
  created() {
    if (this.isMobile()) {
      this.mobileActive = true;
    } else {
      this.mobileActive = false;
    }
    this.getPaperList({});
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/paper-table.less";
</style>

<style lang="less">
.paper-table > .el-pagination .el-input__inner {
  border-radius: 5px;
}
</style>
