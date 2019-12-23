<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="knowledge-rule-form"
  >
    <el-form-item label="Title" prop="title">
      <el-input
        v-model="ruleForm.title"
        placeholder="Please Enter a Knowledge Title"
      ></el-input>
    </el-form-item>
    <el-form-item label="Language" prop="language" v-if="newPaperMode">
      <el-select
        v-model="ruleForm.language"
        placeholder="Please Choose Language"
      >
        <el-option label="English" value="English"></el-option>
        <el-option label="Chinese" value="Chinese"></el-option>
      </el-select>
    </el-form-item>
    <!-- <el-form-item label="Paper" prop="paper" v-if="newPaperMode">
      <el-select
        v-model="ruleForm.paper"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="Please Enter PMID"
        :remote-method="onSearch"
        :loading="loading"
      >
        <el-option
          v-for="item in papers"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item> -->
    <el-form-item label="Tags" prop="tags">
      <el-input
        v-model="ruleForm.tags"
        placeholder="Please Enter Keywords for the Knowledge"
      ></el-input>
    </el-form-item>
    <el-form-item label="Content" prop="content">
      <el-input
        type="textarea"
        v-model="ruleForm.content"
        rows="8"
        placeholder="Please Enter Content for the Knowledge"
      ></el-input>
    </el-form-item>
    <el-form-item class="form-btn-group">
      <el-button
        type="primary"
        @click="submitForm('ruleForm')"
        v-if="newPaperMode"
      >
        Create
      </el-button>
      <el-button type="primary" @click="updateForm('ruleForm')" v-else>
        Update
      </el-button>
      <el-button @click="resetForm('ruleForm')">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import map from "lodash.map";
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";

export default {
  name: "KnowledgeForm",
  props: {
    knowledge: {
      type: Object,
      required: false
    },
    paper: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      ruleForm: {},
      rules: {
        title: [
          {
            required: true,
            message: "Please Enter Knowledge Title",
            trigger: "blur"
          }
        ],
        content: [
          {
            required: true,
            message: "Please Enter Knowledge Content",
            trigger: "blur"
          }
        ],
        paper: [
          {
            required: true,
            message: "Please Choose the Paper for the Knowledge",
            trigger: "blur"
          }
        ],
        tags: [
          {
            required: true,
            message: "Please Enter Keywords for the Knowledge",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    onSearch: function(query) {
      this.updateSearchOptions({
        limit: this.limit,
        offset: this.offset,
        q: query
      });
      this.getPaperList({});
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("knowledges/addKnowledge", this.ruleForm)
            .then(() => {
              this.$message.success("Add knowledge successfully.");
              this.$emit("close-knowledge-form");
            })
            .catch(() => {
              this.$message.success("Oops, add knowledge error.");
            });
        } else {
          return false;
        }
      });
    },
    updateForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("close-knowledge-form");
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$emit("close-knowledge-form");
    },
    ...mapActions("papers", ["getPaperList"]),
    ...mapMutations("papers", ["updateSearchOptions"])
  },
  computed: {
    newPaperMode: function() {
      if (this.knowledge) {
        return false;
      } else {
        return true;
      }
    },
    papers: function() {
      return map(this.items, item => {
        return {
          label: item.pmid + " | " + item.title,
          value: item.id
        };
      });
    },
    ...mapGetters("user", ["user"]),
    ...mapState("papers", ["items", "loading", "total"])
  },
  created() {
    if (this.knowledge) {
      this.ruleForm = Object.assign(this.ruleForm, this.knowledge);
    }

    this.ruleForm["paper"] = this.paper;
    this.ruleForm["author"] = this.user.id;
    this.ruleForm["liked_num"] = 0;
  }
};
</script>

<style lang="less" scoped>
.knowledge-rule-form {
  width: 50%;
  border-radius: 5px;
  margin: 20px auto;
  padding: 30px 20px 0px;
  border: 1px solid #dcdfe6;
  background-color: #fff;

  .form-btn-group {
    float: right;
  }
}
</style>
