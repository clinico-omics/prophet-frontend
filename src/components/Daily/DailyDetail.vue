<template lang="html">
  <el-row class="daily-detail" v-if="daily">
    <el-row class="summary-container" :gutter="10">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" class="left">
        <el-row class="title">
          {{ daily.title }}
        </el-row>
        <el-row class="detail">
          <el-col class="editor" :span="12">Editor: {{ daily.editor }}</el-col>
          <el-col class="date" :span="12"> Date: {{ daily.date }} </el-col>
        </el-row>
        <el-row class="summary">
          <p v-html="daily.content"></p>
        </el-row>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" class="right">
        <img :src="daily.imageSrc" />
      </el-col>
    </el-row>
    <el-row class="show-window">
      <el-row class="card-container" :gutter="30">
        <el-col
          v-for="(card, index) in daily.knowledges"
          :key="index"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="8"
        >
          <card
            :card="card"
            @click.native="showKnowledgeDetail(card.knowledgeId)"
          ></card>
        </el-col>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
import Card from "../Common/Card";

export default {
  name: "DailyDetail",
  props: {},
  data() {
    return {
      daily: null
    };
  },
  methods: {
    showKnowledgeDetail: function(knowledgeId) {
      this.$router.push({
        name: "knowledge-detail",
        params: { knowledgeId: knowledgeId }
      });
    },
    getDailyById(dailyId) {
      if (this.mode === "dev") {
        var that = this;
        this.$models.dev.getDailyById(dailyId, function(record) {
          console.log("DailyDetail-created", that, record);
          if (record) {
            that.daily = record;
          } else {
            that.$notify({
              title: "警告",
              message: "未找到目标Daily，返回上一级",
              type: "warning"
            });

            that.$router.push({ name: "daily" });
          }
        });
      } else if (this.mode === "production") {
        console.log("Production Mode.");
      }
    }
  },
  computed: {
    mode: function() {
      return this.$store.state.mode;
    }
  },
  components: {
    Card
  },
  created() {
    this.getDailyById(this.$route.params.dailyId);
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/daily-detail.less";
</style>
