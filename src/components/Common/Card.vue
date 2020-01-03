<template lang="html">
  <el-card class="box-card">
    <el-row
      slot="header"
      :class="{
        'journal-card-header': journalMode,
        'card-header': !journalMode
      }"
    >
      <el-row class="journal" v-if="journalMode">
        <el-col :span="12" class="left">
          <el-button type="text">{{ card.journal }}</el-button>
        </el-col>
        <el-col :span="12" class="right">
          IF: {{ card.impactFactor || "Unknown" }}
        </el-col>
      </el-row>
      <el-row :class="{ 'journal-title': journalMode, title: !journalMode }">
        {{ card.title }}
      </el-row>
    </el-row>
    <el-row class="image" v-if="card.image_src">
      <img :src="card.image_src" />
    </el-row>
    <el-row class="content">
      {{ card.content }}
    </el-row>
    <el-row class="tag-container">
      <span v-for="tag in tags" :key="tag">{{ labelTag(tag) }}</span>
    </el-row>
    <el-row class="detail">
      <el-col :span="12" class="left">{{ card.owner || card.editor }}</el-col>
      <el-col :span="12" class="right">{{ createdDate }}</el-col>
    </el-row>
  </el-card>
</template>

<script>
import sortedUniq from "lodash.sorteduniq";

export default {
  name: "Card",
  props: {
    card: {
      required: true
    },
    journalMode: {
      required: false,
      default: true
    }
  },
  methods: {
    labelTag: function(tag) {
      if (tag.length > 0) {
        return tag;
      } else {
        return "No Tag";
      }
    }
  },
  computed: {
    tags: function() {
      return sortedUniq(this.card.tags.split(";"));
    },
    createdDate: function() {
      // 2019-12-20T05:15:28.400124Z --> 2019-12-20
      return this.card.created_at.slice(0, 10);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/card.less";
</style>
