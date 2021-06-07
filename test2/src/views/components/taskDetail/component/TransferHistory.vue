<template>
  <a-table
    rowKey="pk"
    :loading="loading"
    :columns="columns"
    :data-source="tableData"
    :scroll="{ x: true }"
    :pagination="false"
  >
    <template #title="">
      Transfer History
    </template>
    <template #branch="{ text }">
      <div v-for="item in text" :key="item.id">
        {{ item.repo }}/{{ item.branch }}
      </div>
    </template>
    <template #pre="{ text }">
      <a-tooltip class="pre">
        <template #title>
          {{ text }}
        </template>
        <pre>{{ text }}</pre>
      </a-tooltip>
    </template>
    <template #date="{ text }">
      <span>{{ formatDate(text) }}</span>
    </template>
  </a-table>
</template>

<script>
import { formatDate } from "@/common/js/utils";

const columns = [
  {
    title: "Frontend Repo And Branches",
    dataIndex: "frontend_repo_and_branch",
    key: "frontend_repo_and_branch",
    fixed: "left",
    align: "center",
    slots: { customRender: "branch" }
  },
  {
    title: "Backend Repo And Branches",
    align: "center",
    dataIndex: "backend_repo_and_branch",
    key: "backend_repo_and_branch",
    fixed: "left",
    slots: { customRender: "branch" }
  },
  {
    title: "Config",
    dataIndex: "config",
    key: "config",
    slots: { customRender: "pre" }
  },
  {
    title: "Script",
    width: 150,
    dataIndex: "script",
    key: "script",
    slots: { customRender: "pre" }
  },
  {
    title: "Created",
    dataIndex: "action_time",
    key: "action_time",
    width: 180,
    align: "center",
    slots: { customRender: "date" },
    fixed: "right"
  },
  {
    title: "Created User",
    dataIndex: "sender.username",
    key: "username",
    align: "center",
    width: 180,
    fixed: "right"
  }
];
export default {
  props: ["pk", "loading", "tableData"],
  setup() {
    return {
      columns,
      formatDate
    };
  }
};
</script>
<style scoped lang="less">
.content {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
