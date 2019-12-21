<template lang="html">
  <el-row class="paper-table-container">
    <el-row class="paper-table" v-if="mobileActive">
      Not Support Mobile Phone, Please Access on PC
    </el-row>
    <el-row class="paper-table" v-if="items.length > 0 && !mobileActive">
      <el-table :data="items" stripe highlight-current-row style="width: 100%">
        <el-table-column type="expand" fixed>
          <template slot-scope="props">
            <el-row v-html="props.row.abstract" class="abstract"></el-row>
            <el-row class="author-container">
              {{ props.row.authors }}
            </el-row>
          </template>
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
          prop="title"
          label="PaperTile"
          min-width="500"
          align="left"
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
              FullPaper
            </el-button>
            <el-button
              @click.native="sumbitKnowledge(scope.row.pmid)"
              type="success"
              size="small"
            >
              SubmitKnowledge
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 30, 50, 80, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-row>
  </el-row>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "PaperTable",
  data() {
    return {
      currentPage: 1,
      total: null,
      mobileActive: false
    };
  },
  methods: {
    handleSizeChange: function() {},
    handleCurrentChange: function() {},
    downloadPaper: function(doi) {
      const source = "https://sci-hub.tw/" + doi;
      window.open(source, "_blank");
    },
    sumbitKnowledge: function(paperPMID) {
      this.$router.push({
        name: "knowledge-creator",
        query: { paperPMID: paperPMID }
      });
    },
    ...mapActions("papers", ["getPaperList"])
  },
  computed: {
    isMobile: function() {
      return this.$store.state.isMobile;
    },
    ...mapState("papers", ["items", "loading"])
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
