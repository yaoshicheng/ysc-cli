<template>
  <a-modal
    title="Add Assign Tasks"
    :visible="visible"
    :confirm-loading="confirmLoading"
    @cancel="afterClose"
    @ok="addConfirm"
  >
    <a-table
      rowKey="pk"
      ref="AssignChoice"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange
      }"
      :columns="columns"
      :loading="loading"
      :data-source="tableData"
      :scroll="{ x: true, y: 300 }"
      :pagination="pagination"
    >
      <template #content="{ text }">
        <a-tooltip class="content">
          <template #title>
            {{ text }}
          </template>
          {{ text }}
        </a-tooltip>
      </template>
    </a-table>
  </a-modal>
</template>

<script>
import { getVrmList } from "@/server/vrm";
import { handleErrorData } from "@/common/js/utils";

const columns = [
  {
    title: "Task ID",
    width: 100,
    dataIndex: "unique_id",
    key: "unique_id",
    fixed: "left",
    align: "center"
  },
  {
    title: "Content",
    dataIndex: "content",
    key: "content",
    slots: { customRender: "content" }
  }
];
export default {
  props: ["visible", "confirmLoading", "afterClose", "listData", "confirm"],
  data() {
    return {
      columns,
      loading: false,
      tableData: [],
      selectedRowKeys: [],
      pagination: false
    };
  },
  mounted() {
    this.getSelectedIds();
    this.getData();
  },
  methods: {
    getSelectedIds() {
      const { forEach } = this.$lodash;
      const tasks = this.$props.listData || [];
      const ids = [];
      forEach(tasks, item => {
        ids.push(item.pk);
      });
      this.selectedRowKeys = ids;
    },
    getData() {
      this.loading = true;
      getVrmList()
        .then(res => {
          const { concat } = this.$lodash;
          const tasks = this.$props.listData || [];
          this.tableData = concat(tasks, res.data);

          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          handleErrorData(err);
        });
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    addConfirm() {
      this.$props.confirm(this.selectedRowKeys);
    }
  }
};
</script>
