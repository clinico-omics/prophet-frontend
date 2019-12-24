<template lang="html">
  <el-row class="footer">
    <el-row class="footer-wrapper">
      <el-col
        v-for="(itemObj, index) in footerContent"
        :key="index"
        :xs="24"
        :md="parseInt(itemObj.span)"
        :sm="parseInt(itemObj.span)"
        :lg="parseInt(itemObj.span)"
      >
        <el-row class="footer-list">
          <h2 class="footer-title">{{ itemObj.title }}</h2>
          <el-row
            v-for="(item, index) in itemObj.contentList"
            :key="index"
            class="footer-item"
          >
            <el-row v-if="item.type == 'link'" class="item">
              <a :href="item.src" :target="item.target">{{ item.title }}</a>
            </el-row>
            <el-row v-if="item.type == 'image'" class="item">
              <el-row>
                <img :src="item.src" />
                <h2>{{ item.title }}</h2>
              </el-row>
            </el-row>
          </el-row>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="navbar-text">
      <el-row>
        <img :src="logoPath" />
      </el-row>
      <el-row>
        <el-row
          >{{ website.name }}{{ website.copyright }}/{{ website.company_name }}
          <a href="http://www.miitbeian.gov.cn/" target="_blank">{{
            website.icp_num
          }}</a>
        </el-row>
        <el-row>Address: {{ website.address }}</el-row>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
export default {
  name: "ProphetFooter",
  computed: {
    logoPath: function() {
      return this.$store.state["settings"].logoPath;
    },
    footerContent: function() {
      return this.$store.state["settings"].footerContent;
    },
    website: function() {
      return this.$store.state["settings"].website;
    }
  },
  created: function() {}
};
</script>

<style scoped lang="less">
@import "../assets/css/footer.less";
</style>
