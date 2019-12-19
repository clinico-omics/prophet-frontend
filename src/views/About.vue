<template lang="html">
  <el-row class="about">
    <img class="img-title" :src="about.aboutLogo" alt="" />
    <el-row class="abstract">
      <el-row class="title">
        {{ about.title }}
      </el-row>
      <p v-html="about.desc" class="desc"></p>
    </el-row>
    <el-row class="timeline">
      <Timeline>
        <Timeline-item
          v-for="(timelineItem, index) in about.timelineItemList"
          :key="index"
        >
          <p class="time">{{ timelineItem.title }}</p>
          <p class="content">{{ timelineItem.desc }}</p>
        </Timeline-item>
      </Timeline>
    </el-row>
    <el-row
      class="info-section"
      v-for="(info, index) in about.infoList"
      :key="index"
    >
      <el-row class="title">
        {{ info.title }}
      </el-row>
      <el-row class="desc">
        {{ info.desc }}
      </el-row>
      <el-row class="details" v-html="info.details"></el-row>
      <el-row :class="info.style">
        <img :src="info.imageSrc" v-if="info.imageSrc" class="image" />
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
import Timeline from "@/components/Timeline/Timeline";
import TimelineItem from "@/components/Timeline/TimelineItem";

export default {
  name: "About",
  props: {},
  data() {
    return {};
  },
  computed: {
    about: function() {
      return this.$store.state["settings"].about;
    }
  },
  components: {
    Timeline,
    TimelineItem
  }
};
</script>

<style lang="less">
@import "../assets/css/about.less";
@import "../assets/css/timeline.less";
</style>
