<template>
  <div class="prophet-container" :class="{ 'pc-container': !isMobile() }">
    <prophet-header
      :logoPath="logoPath"
      :website="website"
      :headerContent="headerContent"
      :isMobile="isMobile()"
    >
    </prophet-header>
    <sidebar v-if="sidebarActive" :headerContent="headerContent"></sidebar>
    <el-row class="prophet">
      <router-view name="contentMgmt"></router-view>
    </el-row>
    <prophet-footer></prophet-footer>
  </div>
</template>

<script>
import Sidebar from "./Sidebar";
import ProphetHeader from "./ProphetHeader";
import ProphetFooter from "./ProphetFooter";

export default {
  name: "Prophet",
  data() {
    return {
      fullscreenLoading: false,
      loading: null
    };
  },
  methods: {},
  components: {
    Sidebar,
    ProphetHeader,
    ProphetFooter
  },
  computed: {
    logoPath: function() {
      return this.$store.state["settings"].logoPath;
    },
    website: function() {
      return this.$store.state["settings"].website;
    },
    headerContent: function() {
      return this.$store.state["settings"].headerContent;
    },
    isMobile: function() {
      return this.$store.state.isMobile;
    },
    sidebarActive: function() {
      return this.$store.state.sidebarActive;
    }
  },
  created() {}
};
</script>

<style lang="less">
@import "../assets/css/prophet.less";
</style>
