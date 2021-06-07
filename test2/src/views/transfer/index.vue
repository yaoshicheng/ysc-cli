<template>
  <div class="layout-container">
    <task-list
      :getData="getData"
      :param="param"
      :canFetch="canFetch"
      :hasFetchAll="hasFetchAll"
      :canTransfer="canTransfer"
      :canSync="canSync"
      :hasSelectAll="hasSelectAll"
      detailName="transferDetail"
    />
  </div>
</template>

<script>
import TaskList from "../components/TaskList";
import { getTask } from "../../server/transfer";

export default {
  name: "transfer",
  components: {
    TaskList
  },
  data() {
    return {
      canFetch: true,
      hasFetchAll: true,
      canSync: true,
      canTransfer: true,
      hasSelectAll: true,
      getData: getTask,
      param: {
        scenario: "TASK"
      }
    };
  }
};
</script>
