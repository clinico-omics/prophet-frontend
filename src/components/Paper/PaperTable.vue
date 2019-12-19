<template lang="html">
  <el-row class="paper-table-container">
    <el-row class="paper-table" v-if="mobileActive">
      Not Support Mobile Phone, Please Access on PC
    </el-row>
    <el-row class="paper-table" v-if="papers.length > 0 && !mobileActive">
      <el-table :data="papers" stripe highlight-current-row style="width: 100%">
        <el-table-column type="expand" fixed>
          <template slot-scope="props">
            <el-row v-html="props.row.paperAbstract" class="abstract"></el-row>
            <el-row class="author-container">
              {{ props.row.paperAuthors }}
            </el-row>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          width="20"
          align="center"
          header-align="center"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="Status"
          sortable
          width="105"
          :filters="filters"
          align="center"
          header-align="center"
          :filter-method="filterStatus"
        >
          <template slot-scope="scope">
            <el-tag :type="getType(scope.row.status)" disable-transitions>
              {{ getStatus(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="paperTitle"
          label="PaperTile"
          min-width="500"
          align="left"
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
          prop="impactFactor"
          label="ImpactFactor"
          width="150"
          align="center"
          header-align="center"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="publishedDate"
          label="ImpactFactor"
          width="150"
          align="center"
          header-align="center"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="paperPMID"
          label="PMID"
          width="120"
          align="center"
          header-align="center"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="paperDOI"
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
              @click.native="downloadPaper(scope.row.source)"
              type="primary"
              size="small"
            >
              FullPaper
            </el-button>
            <el-button
              @click.native="sumbitKnowledge(scope.row.paperPMID)"
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
export default {
  name: "PaperTable",
  data() {
    return {
      currentPage: 1,
      total: null,
      mobileActive: false,
      papers: [],
      filters: [
        {
          text: this.getStatus("unclaimed"),
          value: "unclaimed"
        },
        {
          text: this.getStatus("claimed"),
          value: "claimed"
        }
      ]
    };
  },
  methods: {
    handleSizeChange: function() {},
    handleCurrentChange: function() {},
    downloadPaper: function(source) {
      window.open(source, "_blank");
    },
    sumbitKnowledge: function(paperPMID) {
      this.$router.push({
        name: "knowledge-creator",
        query: { paperPMID: paperPMID }
      });
    },
    filterStatus: function(value, row) {
      return row.status === value;
    },
    getStatus: function(status) {
      if (status === "unclaimed") {
        return "Unclaimed";
      } else if (status === "claimed") {
        return "Claimed";
      }
    },
    getType: function(status) {
      if (status === "unclaimed") {
        return "danger";
      } else if (status === "claimed") {
        return "success";
      }
    },
    getPapers() {}
  },
  computed: {
    isMobile: function() {
      return this.$store.state.isMobile;
    },
    mode: function() {
      return this.$store.state.mode;
    }
  },
  created() {
    if (this.isMobile()) {
      this.mobileActive = true;
    } else {
      this.mobileActive = false;
    }
    this.getPapers();
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
