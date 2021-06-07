<template>
    <a-tabs>
      <a-tab-pane key="1" tab="SqlPlatform">
        <SqlPlatform></SqlPlatform>
      </a-tab-pane>
      <a-tab-pane key="2" tab="SqlHistory">
        <SqlHis></SqlHis>
      </a-tab-pane>
    </a-tabs>
</template>

<script>
import SqlHis from "./SqlHis";
import SqlPlatform from "./SqlPlatform";

export default {
  name: "MysqlPerform",
  data() {
    return {
      ActiveTab: "sqlplatform" // History
    };
  },
  components: { SqlPlatform, SqlHis }
};
</script>

<style scoped></style>
