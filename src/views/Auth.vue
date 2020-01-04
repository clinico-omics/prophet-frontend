<template>
  <el-row class="login-container">
    <login-form class="auth-login-form" :login="authenticateUser" />
  </el-row>
</template>

<script>
import { mapActions } from "vuex";
import LoginForm from "@/components/Organizations/auth/LoginForm";

export default {
  components: {
    LoginForm
  },

  methods: {
    ...mapActions("auth", ["authenticateUser"])
  }
};
</script>

<style lang="less" scoped>
.login-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 600px;

  .auth-login-form {
    width: 50%;
    min-width: 300px;
    max-width: 500px;
    height: 300px;
  }
}
</style>
