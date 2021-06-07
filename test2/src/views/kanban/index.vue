<template>
  <a-tabs v-model:activeKey="activeKey" @change="changeTab">
    <a-tab-pane v-for="tab in tabData" :key="tab.key" :tab="tab.title">
      <task-list
        :canViewDetail="canViewDetail"
        :getData="getData"
        :param="{
          roleType: `${tab.key}`,
          scenario: 'TASK'
        }"
        :hasSelectAll="tab.hasSelectAll"
        :hasAssignAll="tab.hasAssignAll"
        detailName="kanbanDetail"
        v-if="item.show"
      />
    </a-tab-pane>
  </a-tabs>
</template>
<script>
import TaskList from "../components/TaskList";
import { getKanban } from "@/server/kanban";

export default {
  name: "kanban",
  components: {
    TaskList
  },
  data() {
    const { get } = this.$lodash;
    const tabPower = localStorage.getItem("AUTH_MENU")
      ? get(JSON.parse(localStorage.getItem("AUTH_MENU")), "kanban", {})
      : {};
    return {
      activeKey: "tester",
      getData: getKanban,
      canViewDetail: true,
      tabData: [
        {
          key: "tester",
          title: "Tester",
          hasSelectAll: false,
          hasAssignAll: false,
          show: get(tabPower, "TESTER_KANBAN_ACCESS", false)
        },
        {
          key: "tester_leader",
          title: "Tester Leader",
          hasSelectAll: false,
          hasAssignAll: false,
          show: get(tabPower, "TESTER_LEADER_KANBAN_ACCESS", false)
        },
        {
          key: "pm",
          title: "PM",
          hasSelectAll: true,
          hasAssignAll: true,
          show: get(tabPower, "PM_KANBAN_ACCESS", false)
        }
      ]
    };
  },
  methods: {
    changeTab(key) {
      this.activeKey = key;
    }
  }
};
</script>
