<template>
  <base-card
    title="Login"
    agree-text="Login"
    :disabled="!valid"
    @agree="tryLogin"
  >
    <el-row slot="content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="login-form"
      >
        <el-form-item label="Username" prop="username">
          <el-input
            clearable
            placeholder="Please Enter Username."
            v-model="ruleForm.username"
            @keyup.enter="tryLogin"
          ></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            type="password"
            clearable
            show-password
            placeholder="Please Enter Password."
            v-model="ruleForm.password"
            @keyup.enter="tryLogin"
          ></el-input>
        </el-form-item>
      </el-form>
    </el-row>
  </base-card>
</template>

<script>
import BaseCard from "@/components/Molecules/BaseCard";

export default {
  components: {
    BaseCard
  },
  props: {
    login: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      valid: false,
      rules: {
        username: [
          { required: true, message: "Username is required", trigger: "blur" },
          {
            min: 3,
            max: 30,
            message: "Username must be less than 30 characters",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "Password is required", trigger: "blur" },
          {
            min: 3,
            max: 30,
            message: "Password must be less than 30 characters",
            trigger: "blur"
          }
        ]
      },
      showError: false,
      ruleForm: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    validate(callback) {
      return this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          callback();
        } else {
          return false;
        }
      });
    },
    tryLogin() {
      this.validate(() => {
        this.login({
          username: this.ruleForm.username,
          password: this.ruleForm.password
        })
          // eslint-disable-next-line no-unused-vars
          .then(result => {
            this.$router.push("/");
          })
          .catch(() => {
            this.$message.error("Oops, invalid username or password.");
          });
      });
    }
  }
};
</script>
