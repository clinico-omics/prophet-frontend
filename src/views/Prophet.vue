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
      <transition v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter">
        <router-view name="contentMgmt"></router-view>
      </transition>
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
  methods: {
    beforeEnter: function() {
      // 全屏菊花
      this.loading = this.$loading({
        lock: true,
        text: "Loading..."
      });
    },
    afterEnter: function() {
      setTimeout(() => {
        this.loading.close();
      }, 800);
    }
  },
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

<style lang="less" scoped>
@import "../assets/css/prophet.less";
</style>
