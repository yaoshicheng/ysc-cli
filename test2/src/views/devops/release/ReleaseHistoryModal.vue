<template>
  <a-modal
    title="Release History"
    :visible="modalVisible"
    width="600px"
    @ok="submit"
    @cancel="closeModal"
  >
    <a-table
      :pagination="false"
      size="small"
      :columns="Release_History_Columns"
      :data-source="tableData"
      :scroll="{ x: '100%' }"
      :loading="loading"
      :row-selection="deleteRowSelection"
    >
      <template #status="{text}">
        {{ text ? "Yes" : "No" }}
      </template>
      <template #time="{text}">
        {{ moment(text).format("YYYY-MM-DD hh:mm:ss") }}
      </template>
    </a-table>
  </a-modal>
</template>

<script>
import { Release_History_Columns } from "../const";
import { toRefs } from "vue";
import moment from "moment";

export default {
  name: "ReleaseModal",
  props: [
    "data",
    "visible",
    "tableLoading",
    "close",
    "confirm"
  ],
  setup(props) {
    const {
      data: tableData,
      visible: modalVisible,
      confirm: onConfirm,
      tableLoading: loading
    } = toRefs(props);

    const closeModal = () => {
      if (props.close && typeof props.close === "function") {
        props.close();
      }
    };
    return {
	    moment,
      tableData,
      modalVisible,
      loading,

      closeModal,
      onConfirm
    };
  },
  data() {
    return {
	    Release_History_Columns,
    };
  },
  methods: {
    submit() {
	    this.onConfirm();
    }
  }
};
</script>

<style scoped></style>
