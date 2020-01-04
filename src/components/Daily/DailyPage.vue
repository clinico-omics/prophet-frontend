<template lang="html">
  <el-row class="daily-page">
    <el-row class="daily-container">
      <el-col :xs="20" :sm="20" :md="20" :lg="10">
        <el-row class="slogan">Learn Tumor Knowledges Every Day</el-row>
        <el-input
          placeholder="Search For Knowledge Points By Topic"
          v-model="queryString"
          class="input-with-select"
        >
          <el-button slot="append">Search Daily</el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row class="show-window">
      <el-row class="show-window-header">
        <img class="logo" :src="require('../../assets/img/daily.png')" />
        <el-row class="news">
          <el-row>Today News</el-row>
          <p class="slogan" v-html="news"></p>
        </el-row>
      </el-row>
      <el-row class="card-container" :gutter="30" v-if="dailys.length > 0">
        <el-col
          v-for="(card, index) in dailys"
          :key="index"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="8"
        >
          <card
            :card="card"
            @click.native="showDailyDetail(card.dailyId)"
            :journalMode="false"
          >
          </card>
        </el-col>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
import Card from "../Common/Card";

export default {
  name: "DailyPage",
  props: {},
  data() {
    return {
      queryString: "",
      news: '<a href="http://www.nordata.cn">智汇医圈开启知识新模式</a>',
      dailys: []
    };
  },
  methods: {
    showDailyDetail: function(dailyId) {
      this.$router.push({ name: "daily-detail", params: { dailyId: dailyId } });
    },
    getDailys() {}
  },
  components: {
    Card
  },
  computed: {
    mode: function() {
      return this.$store.state.mode;
    }
  },
  created() {
    this.getDailys();
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/daily-page.less";
</style>
