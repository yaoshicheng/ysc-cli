<template>
  <div>
    <a-table
      :pagination="false"
      :columns="Deploy_History_Columns"
      :data-source="dataSource"
      :scroll="{ y: 280 }"
      size="small"
      rowKey="pk"
      :loading="tableLoading"
    >
      <template #time="{text}">
        {{ moment(text).format("YYYY-MM-DD hh:mm:ss") }}
      </template>
    </a-table>
  </div>
</template>

<script>
import { Deploy_History_Columns } from "./const";
import { toRefs } from "vue";
import moment from "moment";

export default {
  name: "deployment",
  props: ["loading", "data"],
  setup(props) {
    const { loading: tableLoading, data: dataSource } = toRefs(props);
    return {
      tableLoading,
      dataSource
    };
  },
  data() {
    return {
      Deploy_History_Columns,
      moment
    };
  }
};
</script>

<style scoped lang="scss"></style>
