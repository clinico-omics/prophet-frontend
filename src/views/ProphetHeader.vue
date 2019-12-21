<template lang="html">
  <el-row class="header">
    <nav class="navbar">
      <el-col :xs="9" :sm="8" :md="6" :lg="4">
        <a :href="website.href" target="_blank" class="logo">
          <img :src="logoPath" />
        </a>
      </el-col>
      <el-col :xs="15" :sm="16" :md="18" :lg="20" class="menu">
        <el-row :class="{ 'mobile-list': isMobile, hidden: !isMobile }">
          <button @click="toggleSidebar">
            <img :src="require('../assets/img/hamburger.png')" />
          </button>
        </el-row>
        <el-row :class="{ hidden: isMobile, 'pc-list': !isMobile }">
          <el-menu
            :default-active="currentRoute"
            mode="horizontal"
            @select="handleSelect"
            background-color="#4dc0b5"
            text-color="#fff"
            active-text-color="#006ad8"
            router
          >
            <el-row
              v-for="(item, index) in filteredHeaderContent"
              class="item-container"
              :key="index"
            >
              <el-menu-item :index="item.route" v-if="item.route">
                <span>{{ item.name }}</span>
              </el-menu-item>
              <el-submenu :index="index.toString()" v-if="item.children">
                <template slot="title">{{ item.name }}</template>
                <el-menu-item
                  v-for="(subitem, index) in filterSubItem(item.children)"
                  :index="subitem.route"
                  :key="index"
                >
                  {{ subitem.name }}
                </el-menu-item>
              </el-submenu>
            </el-row>
            <el-row class="item-container">
              <el-menu-item
                index="/auth"
                v-if="!isAuthenticated"
                class="auth-btn"
              >
                <el-tag effect="plain">SIGN IN</el-tag>
              </el-menu-item>
              <el-menu-item @click.native="signout" v-else class="auth-btn">
                <el-tag effect="plain">SIGN OUT</el-tag>
              </el-menu-item>
            </el-row>
          </el-menu>
        </el-row>
      </el-col>
    </nav>
  </el-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import filter from "lodash.filter";

export default {
  name: "ProphetHeader",
  props: {
    logoPath: {
      required: true
    },
    website: {
      required: true
    },
    headerContent: {
      required: true
    },
    isMobile: {
      required: true
    }
  },
  data() {
    return {
      currentRoute: "/" + "home"
    };
  },
  methods: {
    toggleSidebar: function() {
      this.$store.commit("toggleSidebar");
    },
    handleSelect: function() {},
    keepMenuIndex: function() {
      this.currentRoute = "/" + this.$route.name;
    },
    filterSubItem: function(children) {
      return filter(children, item => {
        return item.route && item.show !== false;
      });
    },
    ...mapActions("auth", ["logout"]),
    signout() {
      this.logout();
      this.$router.push("/");
    }
  },
  computed: {
    getClientWidth: function() {
      return this.$store.state.getClientWidth;
    },
    filteredHeaderContent: function() {
      return filter(this.headerContent, item => {
        if (this.isAuthenticated) {
          return item.show !== false;
        } else {
          return item.show !== false && item.auth !== true;
        }
      });
    },
    ...mapGetters("auth", ["isAuthenticated"])
  },
  components: {},
  activated() {},
  created: function() {
    this.keepMenuIndex();
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/header.less";
</style>
