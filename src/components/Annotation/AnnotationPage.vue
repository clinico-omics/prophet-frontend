<template lang="html">
  <el-row class="control-panel">
    <el-col class="project-btn-group" :span="12">
      <el-button-group style="margin-right: 30px;">
        <el-button type="primary" size="small">Project List</el-button>
        <el-button type="primary" size="small">Add Project</el-button>
      </el-button-group>
      <el-tag effect="plain">
        <a href="/">ProjectName: {{ projectName }}</a>
      </el-tag>
    </el-col>
    <el-col class="anno-btn-group" :span="12" v-if="projectActive">
      <el-tooltip class="item" content="Add Paper" placement="top">
        <el-button type="primary" icon="el-icon-refresh" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" content="Annotation" placement="top">
        <el-button type="success" icon="el-icon-edit" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" content="Label" placement="top">
        <el-button type="info" icon="el-icon-collection-tag" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" content="Guideline" placement="top">
        <el-button type="warning" icon="el-icon-help" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" content="Statistics" placement="top">
        <el-button type="danger" icon="el-icon-s-data" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" content="Export" placement="top">
        <el-button type="success" icon="el-icon-download" circle></el-button>
      </el-tooltip>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "AnnotationPage",
  props: {},
  data() {
    return {
      projectName: "Test"
    };
  },
  methods: {},
  components: {},
  computed: {
    projectActive: function() {
      return this.projectName && this.projectName.length !== 0;
    }
  },
  created() {}
};
</script>

<style lang="less" scoped>
@import "../../assets/css/annotation-page.less";
</style>
