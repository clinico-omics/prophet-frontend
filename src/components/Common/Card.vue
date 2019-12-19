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
        <el-col :span="12" class="right"> IF: {{ card.impactFactor }} </el-col>
      </el-row>
      <el-row :class="{ 'journal-title': journalMode, title: !journalMode }">
        {{ card.title }}
      </el-row>
    </el-row>
    <el-row class="image" v-if="card.imageSrc">
      <img :src="card.imageSrc" />
    </el-row>
    <el-row class="content">
      {{ card.content }}
    </el-row>
    <el-row class="tag-container">
      <span v-for="tag in card.tags" :key="tag">{{ tag }}</span>
    </el-row>
    <el-row class="detail">
      <el-col :span="12" class="left">{{ card.author || card.editor }}</el-col>
      <el-col :span="12" class="right">{{ card.date }}</el-col>
    </el-row>
  </el-card>
</template>

<script>
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
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/card.less";
</style>
