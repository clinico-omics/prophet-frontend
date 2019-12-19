<template lang="html">
  <el-row class="knowledge-editor">
    <el-row class="search-bar">
      <el-input
        placeholder="Please Enter PMID/DOI/Title"
        v-model="queryString"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-row>
    <el-row class="summary" v-if="paperActive">
      <el-col class="left" :xs="24" :sm="24" :md="24" :lg="5">
        <el-row class="button-group">
          <el-button
            type="primary"
            size="small"
            @click.native="downloadPaper(paper.source)"
          >
            GetPaper
          </el-button>
          <el-button
            type="primary"
            size="small"
            @click.native="showPreview(paper.paperPMID)"
          >
            See All Versions
          </el-button>
        </el-row>
        <el-row class="info">
          <el-row>
            <span><b>Journal: </b></span>
            <span>{{ paper.journal }}</span>
          </el-row>
          <el-row>
            <span><b>ImpactFactor: </b></span>
            <span>{{ paper.impactFactor }}</span>
          </el-row>
          <el-row>
            <span><b>PMID: </b></span>
            <span>{{ paper.paperPMID }}</span>
          </el-row>
          <el-row>
            <span><b>DOI: </b></span>
            <span>{{ paper.paperDOI }}</span>
          </el-row>
          <el-row>
            <span><b>Keywords: </b></span>
            <span>{{ paper.keywords }}</span>
          </el-row>
          <el-row>
            <span><b>PublishedDate: </b></span>
            <span>{{ paper.publishedDate }}</span>
          </el-row>
          <el-row>
            <span><b>Author: </b></span>
            <span>{{ paper.paperAuthors }}</span>
          </el-row>
        </el-row>
      </el-col>
      <el-col class="separator" :lg="1">
        <img :src="require('../../assets/img/separator.png')" />
      </el-col>
      <el-col class="right" :xs="24" :sm="24" :md="24" :lg="18">
        <el-row class="content">
          <el-row class="title">{{ paper.paperTitle }}</el-row>
          <el-row class="abstract">{{ paper.paperAbstract }}</el-row>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="editor-container">
      <el-row class="editor">
        <el-col class="content" :lg="12" :xs="24" :sm="24" :md="24">
          <el-input
            placeholder="Please Enter Title"
            v-model="newKnowledge.title"
            clearable
          >
          </el-input>
          <el-input
            type="textarea"
            placeholder="Please Enter Content"
            v-model="newKnowledge.content"
            resize="none"
          >
          </el-input>
        </el-col>
        <el-col class="separator" :lg="1">
          <img :src="require('../../assets/img/separator.png')" />
        </el-col>
        <el-col class="image" :lg="11" :xs="24" :sm="24" :md="24">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="newKnowledge.imageSrc"
              :src="newKnowledge.imageSrc"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </el-row>
      <el-row class="button-group">
        <el-button type="primary" size="small">Cancel</el-button>
        <el-button type="primary" size="small" :disabled="!paperActive">
          Save
        </el-button>
      </el-row>
    </el-row>
    <el-row class="preview-container" v-if="knowledgeActive">
      <el-row class="header">
        <el-col class="title" :lg="20" :xs="24" :sm="24" :md="24">
          <p v-html="knowledge.title"></p>
        </el-col>
        <el-col class="button-group" :lg="4" :xs="24" :sm="24" :md="24">
          <el-select
            v-model="version"
            placeholder="Please Choose Other Version"
          >
            <el-option
              v-for="item in knowledgeVersions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="body">
        <el-col class="content" :lg="12" :xs="24" :sm="24" :md="24">
          <p v-html="knowledge.content"></p>
        </el-col>
        <el-col class="image" :lg="12" :xs="24" :sm="24" :md="24">
          <img :src="knowledge.imageSrc" />
        </el-col>
      </el-row>
    </el-row>
    <div
      class="mask-window"
      @click="hidePreview()"
      v-if="knowledgeActive"
    ></div>
  </el-row>
</template>

<script>
export default {
  name: "KnowledgeEditor",
  props: {
    paperPMID: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      queryString: "",
      knowledgeVersions: [
        {
          value: "选项1",
          label: "版本1"
        },
        {
          value: "选项2",
          label: "版本2"
        },
        {
          value: "选项3",
          label: "版本3"
        },
        {
          value: "选项4",
          label: "版本4"
        },
        {
          value: "选项5",
          label: "版本5"
        }
      ],
      version: "",
      knowledge: {
        liked: true,
        likedNum: 100,
        title: "CCDC50剪接变体由SRSF3调节并通过Ras信号传导途径促进肝细胞癌",
        content:
          "①CCDC50的pre-mRNA在50％的HCC病例中异常剪接，CCDC50S是其中一个变体；</br></br>②与肝脏良性肿瘤和几种类型的实体瘤相比，CCDC50S mRNA在HCC中上调，具有一定诊断潜力（敏感性：0.711，特异性：0.793）；</br></br>③CCDC50S mRNA在HCC中的高表达与肿瘤分化差，TNM分期和不良预后显著相关；</br></br>④富含丝氨酸和精氨酸的剪接因子3（SRSF3）直接与CCDC50S mRNA结合，以维持其在细胞质中的稳定性；</br></br>⑤ SRSF3的作用由HBx和14-3-3β相互介导，为复合物调节；</br></br>⑥CCDC50S可与EGFR结合，HCC中过表达的CCDC50S使EGRF/Ras通路中的MEK, c-raf 和ERK磷酸化增强，抑制Foxo4启动子的活性，从而促进HCC的生长和转移。",
        tags: ["CCDC50剪接变体", "肝细胞癌", "SRSF3"],
        author: "冉子涵博士",
        date: "2018-09-24",
        editor: "诺斯博士",
        editorComment: "",
        imageSrc: require("../../assets/img/example.jpeg"),
        knowledgeId: "12345"
      },
      newKnowledge: {
        liked: true,
        likedNum: 100,
        title: "CCDC50剪接变体由SRSF3调节并通过Ras信号传导途径促进肝细胞癌",
        content:
          "①CCDC50的pre-mRNA在50％的HCC病例中异常剪接，CCDC50S是其中一个变体；</br></br>②与肝脏良性肿瘤和几种类型的实体瘤相比，CCDC50S mRNA在HCC中上调，具有一定诊断潜力（敏感性：0.711，特异性：0.793）；</br></br>③CCDC50S mRNA在HCC中的高表达与肿瘤分化差，TNM分期和不良预后显著相关；</br></br>④富含丝氨酸和精氨酸的剪接因子3（SRSF3）直接与CCDC50S mRNA结合，以维持其在细胞质中的稳定性；</br></br>⑤ SRSF3的作用由HBx和14-3-3β相互介导，为复合物调节；</br></br>⑥CCDC50S可与EGFR结合，HCC中过表达的CCDC50S使EGRF/Ras通路中的MEK, c-raf 和ERK磷酸化增强，抑制Foxo4启动子的活性，从而促进HCC的生长和转移。",
        tags: ["CCDC50剪接变体", "肝细胞癌", "SRSF3"],
        author: "冉子涵博士",
        date: "2018-09-24",
        editor: "诺斯博士",
        editorComment: "",
        imageSrc: require("../../assets/img/example.jpeg"),
        knowledgeId: "12345"
      },
      paperActive: true,
      knowledgeActive: true,
      paper: {
        journal: "Hepatolgy",
        impactFactor: "14.07",
        source: "https://sci-hub.tw/10.1002/hep.30147",
        paperTitle:
          "A CCDC50 splice variant is modulated by SRSF3 and promotes hepatocellular carcinoma via the Ras signaling pathway.",
        paperAuthors:
          "Hong W1,2, Zhang CZ1,2, Lu SX1,2, Zhang MF1,2, Liu LL1,2, Luo RZ1,2, Yang X1,2, Wang CH1,2, Chen SL1,2, He YF1,2, Xie D1, Xu RH1, Yun JP1,2.",
        publishedDate: "2018-06-20",
        paperAbstract:
          "① High through-put sequencing revealed that CCDC50 pre-mRNA is aberrantly spliced in 50% of our HCC cases. ②A BaseScope assay was performed to examine the expression of CCDC50S (a truncated oncogenic splice variant) in HCC tissues. Compared with liver benign tumors and several types of solid tumors, CCDC50S mRNA was up-regulated in HCC, with a diagnostic potential (sensitivity: 0.711, specificity: 0.793). ③High expression of CCDC50S mRNA in HCC was significantly correlated with poor tumor differentiation, advanced TNM stage and unfavorable prognosis. ④ serine and arginine rich splicing factor 3 (SRSF3) directly bound to CCDC50S mRNA to maintain its stability in the cytoplasm. ⑤The cytosolic retention of SRSF3 was mediated by the interaction of HBx and 14-3-3β. Ectopic HBx expression induced the expression of cytosolic SRSF3 and CCDC50S. ⑥KEGG pathway enrichment analysis showed that the Ras signaling pathway was significantly altered by knockdown of CCDC50S. CCDC50S directly bound to EGFR.⑥Phosphorylation of AKT and proteins involved in EGRF/Ras signaling, such as ERK, MEK, and c-raf was increased in CCDC50S-overexpressing cells.While the EKR inhibition enhanced the promoter activity of Foxo4.Thus CCDC50S exerted oncogenic functions in HCC via Ras/Foxo4 pathway.",
        paperPMID: "30028541",
        paperDOI: "DOI: 10.1002/hep.30147",
        keywords: "BaseScope; CCDC50S; HBx; SRSF3; hepatocellular carcinoma"
      }
    };
  },
  methods: {
    handleAvatarSuccess: function() {},
    beforeAvatarUpload: function() {},
    downloadPaper: function(source) {
      window.open(source, "_blank");
    },
    hidePreview: function() {
      this.knowledgeActive = false;
    },
    showPreview: function(paperPMID) {
      console.log(paperPMID);
      this.knowledgeActive = true;
    },
    getPaper: function(paperPMID) {
      console.log(paperPMID);
    }
  },
  created() {
    // query传入paperPMID
    if (this.paperPMID) {
      this.getPaper(this.paperPMID);
    }
  }
};
</script>

<style lang="less">
@import "../../assets/css/knowledge-editor.less";
</style>
