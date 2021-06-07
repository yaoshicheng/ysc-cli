<template>
  <a-tabs>
    <a-tab-pane key="1" tab="TaskInfo">
      <task-transfer
        :pk="pk"
        :updateHistory="getLog"
        v-if="accesstype === 'taskdetail'"
      />
      <view-task-trasfer v-else :pk="pk" :log="log" :accesstype="accesstype" />
      <transfer-history :pk="pk" :tableData="tableData" :loading="loading" />
    </a-tab-pane>
    <a-tab-pane key="2" tab="Issue">
      <task-list :justshow="justshow" :getData="getData" :param="param" />
    </a-tab-pane>
  </a-tabs>
</template>
<script>
import { ref, getCurrentInstance } from "vue";

import { getIssueInfo, getTransferHistory } from "@/server/transfer";
import { handleErrorData } from "@/common/js/utils";

import TaskList from "../../TaskList";
import TaskTransfer from "./TaskTransfer";
import ViewTaskTrasfer from "./ViewTaskTrasfer";
import TransferHistory from "./TransferHistory";

export default {
  props: ["pk", "accesstype"],
  components: {
    TaskList,
    TaskTransfer,
    ViewTaskTrasfer,
    TransferHistory
  },
  setup(props) {
    const param = ref({ sub_issue_of: props.pk });
    const loading = ref(false);
    const tableData = ref([]);
    const log = ref({});
    const { ctx } = getCurrentInstance();
    const { get, last } = ctx.$lodash;

    const getLog = () => {
      loading.value = true;
      const pk = props.pk;
      getTransferHistory(pk)
        .then(res => {
          const thisData = get(res, "data", []);
          tableData.value = thisData;
          log.value = last(thisData);
          loading.value = false;
        })
        .catch(err => {
          loading.value = false;
          handleErrorData(err);
        });
    };
    getLog();
    return {
      justshow: true,
      getData: getIssueInfo,
      param,
      loading,
      tableData,
      log,
      getLog
    };
  }
};
</script>
