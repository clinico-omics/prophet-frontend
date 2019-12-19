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
        v-for="(item, index) in headerContent"
        class="item-container"
        :key="index"
      >
        <el-menu-item
          :index="item.route"
          v-if="item.route"
          @click="toggleSidebar()"
        >
          {{ item.name }}
        </el-menu-item>
        <el-submenu :index="index.toString()" v-if="item.children">
          <template slot="title">{{ item.name }}</template>
          <el-menu-item
            v-for="(subitem, index) in item.children"
            :index="subitem.route"
            :key="index"
            @click="toggleSidebar()"
          >
            {{ subitem.name }}
          </el-menu-item>
        </el-submenu>
      </el-row>
    </el-menu>
  </el-row>
</template>

<script>
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
    handleSelect: function() {},
    toggleSidebar: function() {
      this.$store.commit("toggleSidebar");
    }
  }
};
</script>
