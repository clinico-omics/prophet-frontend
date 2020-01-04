<template>
  <div id="app">
    <prophet></prophet>
  </div>
</template>

<script>
import Prophet from "./views/Prophet";

export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    Prophet
  },
  created() {}
};
</script>

<style lang="css">
@import "./assets/css/normalized.css";
@import "./assets/css/reset.css";

body {
  display: flex;
  flex-direction: column;
}
</style>
