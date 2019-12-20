<template>
  <el-card shadow="always" class="base-card">
    <div slot="header" class="card-header">
      <span class="card-header__title">{{ title }}</span>
    </div>
    <el-row class="card-content">
      <slot name="content" />
    </el-row>
    <el-row class="card-action">
      <el-button type="primary" size="small" v-if="cancelText" @click="cancel">
        {{ cancelText }}
      </el-button>
      <el-button type="primary" size="small" v-if="agreeText" @click="agree">
        {{ agreeText }}
      </el-button>
    </el-row>
  </el-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
      required: true
    },
    cancelText: {
      type: String,
      default: ""
    },
    agreeText: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    agree() {
      this.$emit("agree");
    },
    cancel() {
      this.$emit("cancel");
    }
  }
};
</script>

<style lang="less" scoped>
.base-card {
  width: 100%;
  height: 100%;

  .card-header {
    height: 64px;
    background-color: #1976d2;
    border-color: #1976d2;
    -webkit-box-align: center;
    align-items: center;
    display: -webkit-box;
    display: flex;
    position: relative;
    z-index: 0;
    padding: 4px 16px;

    .card-header__title {
      font-size: 1.25rem;
      line-height: 1.5;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #fff;
    }
  }

  .card-content {
    margin: 30px 30px 10px 10px;
  }

  .card-action {
    display: flex;
    margin-bottom: 30px;
    margin-right: 30px;
    justify-content: flex-end;
  }
}
</style>
