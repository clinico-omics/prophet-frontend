<template lang="html">
  <el-row class="knowledge-table-container">
    <el-row class="knowledge-table" v-if="mobileActive">
      Not Support Mobile Phone, Please Access on PC
    </el-row>
    <el-row
      class="knowledge-table"
      v-if="knowledges.length > 0 && !mobileActive"
    >
      <el-table
        :data="knowledges"
        stripe
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-row v-html="convertContent(props.row.content)"></el-row>
            <el-row class="tags-container">
              <el-tag
                v-for="(tag, index) in props.row.tags"
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
          prop="title"
          label="KnowledgeTitle"
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
          prop="date"
          label="Date"
          width="100"
          align="center"
          header-align="center"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="author"
          label="Autor"
          min-width="250"
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
              @click.native="downloadPaper(scope.row.source)"
              type="primary"
              size="small"
            >
              GetPaper
            </el-button>
            <el-button
              @click.native="checkKnowledge(scope.row.knowledgeId)"
              type="success"
              size="small"
            >
              Check
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
      knowledges: [],
      filters: [
        {
          text: this.getStatus("unchecked"),
          value: "unchecked"
        },
        {
          text: this.getStatus("checked"),
          value: "checked"
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
    checkKnowledge: function(knowledgeId) {
      console.log(knowledgeId);
    },
    filterStatus: function(value, row) {
      return row.status === value;
    },
    getStatus: function(status) {
      if (status === "unchecked") {
        return "Unchecked";
      } else if (status === "checked") {
        return "Checked";
      }
    },
    getType: function(status) {
      if (status === "unchecked") {
        return "danger";
      } else if (status === "checked") {
        return "success";
      }
    },
    getKnowledges(lang) {
      console.log(lang);
    },
    convertContent(content) {
      console.log(
        "knowledgeTable-convertContent",
        content.replace(/([②③④⑤⑥⑦⑧⑨⑩])/g, "<br/><br/>$1")
      );
      return content.replace(/([②③④⑤⑥⑦⑧⑨⑩])/g, "<br/><br/>$1");
    }
  },
  computed: {
    isMobile: function() {
      return this.$store.state.isMobile;
    }
  },
  created() {
    if (this.isMobile()) {
      this.mobileActive = true;
    } else {
      this.mobileActive = false;
    }
    this.getKnowledges();
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
