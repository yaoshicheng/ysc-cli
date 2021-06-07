<template>
  <div>
    <task-info :loading="loading" :data="taskInstanceData" />
    <task-tabs :pk="pk" :accesstype="accesstype" />
  </div>
</template>
<script>
import { handleErrorData, formatDate } from "@/common/js/utils";
import { getTaskInfo } from "@/server/transfer";

import TaskInfo from "./component/TaskInfo";
import TaskTabs from "./component/TaskTabs";
import { getCurrentInstance, ref } from "vue";

export default {
  name: "transferDetail",
  components: {
    TaskInfo,
    TaskTabs
  },
  setup() {
    const loading = ref(false);
    const pk = ref("");
    const accesstype = ref("");
    const taskInstanceData = ref({});
    const loadTaskInstance = () => {
      loading.value = true;
      const { ctx } = getCurrentInstance();
      const { get } = ctx.$lodash;
      const { currentRoute } = ctx.$router;
      const pkValue = get(currentRoute, "value.query.pk", "");
      accesstype.value = get(currentRoute, "value.query.accesstype", "");
      pk.value = pkValue;
      getTaskInfo(pkValue)
        .then(res => {
          const result = get(res, "data", {});
          const createdTime = get(result, "created", "");
          const updatedTime = get(result, "created", "");
          const created = formatDate(createdTime);
          const updated = formatDate(updatedTime);
          taskInstanceData.value = {
            ...result,
            created,
            updated
          };
          loading.value = false;
        })
        .catch(() => {
          handleErrorData({ message: "Get Task Detail Failed" });
          loading.value = false;
        });
    };

    loadTaskInstance();
    return {
      taskInstanceData,
      loading,
      pk,
      accesstype
    };
  }
};
</script>
