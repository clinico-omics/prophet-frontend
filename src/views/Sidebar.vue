<template lang="html">
  <el-row class="el-menu-container">
    <el-menu
      :default-active="activeIndex"
      mode="vertical"
      @select="handleSelect"
      background-color="#4dc0b5"
      text-color="#fff"
      active-text-color="#006ad8"
      :collapse="isCollapse"
      router
    >
      <el-row
        v-for="(item, index) in filteredHeaderContent"
        class="item-container"
        :key="index"
      >
        <el-menu-item v-if="item.href">
          <a :href="item.href" target="_blank">{{ item.name }}</a>
        </el-menu-item>
        <el-menu-item :index="item.route" v-if="item.route && !item.href">
          <span>{{ item.name }}</span>
        </el-menu-item>
        <el-submenu :index="index.toString()" v-if="item.children">
          <template slot="title">{{ item.name }}</template>
          <el-menu-item
            v-for="(subitem, index) in filterSubItem(item.children)"
            :index="subitem.route"
            :key="index"
            @click="toggleSidebar()"
          >
            {{ subitem.name }}
          </el-menu-item>
        </el-submenu>
      </el-row>
      <el-row class="item-container">
        <el-menu-item index="/auth" v-if="!isAuthenticated" class="auth-btn">
          <el-tag effect="plain">SIGN IN</el-tag>
        </el-menu-item>
        <el-menu-item @click.native="signout" v-else class="auth-btn">
          <el-tag effect="plain">SIGN OUT</el-tag>
        </el-menu-item>
      </el-row>
    </el-menu>
  </el-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import filter from "lodash.filter";

export default {
  name: "SideBar",
  props: {
    headerContent: {
      required: true
    }
  },
  data() {
    return {
      activeIndex: "1",
      isCollapse: false
    };
  },
  methods: {
    filterSubItem: function(children) {
      return filter(children, item => {
        return item.route && item.show !== false;
      });
    },
    signout() {
      this.logout();
      this.$router.push("/");
    },
    handleSelect: function() {},
    toggleSidebar: function() {
      this.$store.commit("toggleSidebar");
    },
    ...mapActions("auth", ["logout"])
  },
  computed: {
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
  }
};
</script>
