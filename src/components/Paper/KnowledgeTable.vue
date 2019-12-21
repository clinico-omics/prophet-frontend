<template lang="html">
  <el-row class="knowledge-table-container">
    <el-row class="knowledge-table" v-if="mobileActive">
      Not Support Mobile Phone, Please Access on PC
    </el-row>
    <el-row class="knowledge-table" v-if="items.length > 0 && !mobileActive">
      <el-table :data="items" stripe highlight-current-row style="width: 100%">
        <el-table-column type="expand" fixed>
          <template slot-scope="props">
            <el-row
              v-html="convertContent(props.row.content)"
              class="abstract"
            ></el-row>
            <el-row class="tags-container">
              <el-tag
                v-for="(tag, index) in convertTags(props.row.tags)"
                type="info"
                :key="index"
              >
                {{ tag }}
              </el-tag>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="Status"
          sortable
          :filters="filters"
          align="left"
          header-align="left"
          :filter-method="filterStatus"
          width="105"
        >
          <template slot-scope="scope">
            <el-tag :type="getType(scope.row.status)" disable-transitions>
              {{ getStatus(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="liked_num"
          label="Liked Num"
          min-width="150"
          align="center"
          header-align="center"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="title"
          label="Knowledge Title"
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
          prop="created_at"
          label="Created Time"
          width="250"
          align="center"
          header-align="center"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="owner"
          label="Author"
          min-width="150"
          align="center"
          header-align="center"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="editor"
          label="Editor"
          width="120"
          align="center"
          header-align="center"
          sortable
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="Action"
          width="210"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            <el-button
              @click.native="showKnowledge(scope.row.paper)"
              type="success"
              size="small"
            >
              Check
            </el-button>
            <el-button
              @click.native="downloadPaper(scope.row.doi)"
              type="success"
              size="small"
            >
              Download
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
import sortedUniq from "lodash.sorteduniq";
import { mapActions, mapState } from "vuex";

export default {
  name: "PaperTable",
  data() {
    return {
      currentPage: 1,
      total: null,
      mobileActive: false,
      filters: [
        {
          text: this.getStatus("Submitted"),
          value: "Submitted"
        },
        {
          text: this.getStatus("Checked"),
          value: "Checked"
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
    convertTags: function(tags) {
      return sortedUniq(tags.split(","));
    },
    showKnowledge: function(pmid) {
      this.$router.push({
        name: "knowledge-detail",
        params: { paperId: pmid }
      });
    },
    filterStatus: function(value, row) {
      return row.status === value;
    },
    getStatus: function(status) {
      if (status === "Submitted") {
        return "Submitted";
      } else if (status === "Checked") {
        return "Checked";
      }
    },
    getType: function(status) {
      if (status === "Submitted") {
        return "warning";
      } else if (status === "Checked") {
        return "success";
      }
    },
    convertContent(content) {
      return content.replace(/([②③④⑤⑥⑦⑧⑨⑩])/g, "<br/><br/>$1");
    },
    ...mapActions("knowledges", ["getKnowledgeList"])
  },
  computed: {
    isMobile: function() {
      return this.$store.state.isMobile;
    },
    ...mapState("knowledges", ["items", "loading"])
  },
  created() {
    if (this.isMobile()) {
      this.mobileActive = true;
    } else {
      this.mobileActive = false;
    }
    this.getKnowledgeList({});
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/knowledge-table.less";
</style>

<style lang="less">
.knowledge-table > .el-pagination .el-input__inner {
  border-radius: 5px;
}
</style>
