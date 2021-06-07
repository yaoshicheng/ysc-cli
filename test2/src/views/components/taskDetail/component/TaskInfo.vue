<template>
  <a-spin :spinning="infoLoading">
    <a-descriptions title="MISC" :column="2">
      <a-descriptions-item label="Issue ID">
        {{ get(thisData, "unique_id", "") }}
      </a-descriptions-item>
      <a-descriptions-item label="Content">
        <a-tooltip>
          <template #title>
            {{ get(thisData, "content", "") }}
          </template>
          {{ get(thisData, "content", "") }}
        </a-tooltip>
      </a-descriptions-item>
    </a-descriptions>
    <a-descriptions :column="4">
      <a-descriptions-item label="Task Type">
        {{ get(thisData, "scenario", "") }}
      </a-descriptions-item>
      <a-descriptions-item label="Task List">
        {{ get(thisData, "task_list.title", "") }}
      </a-descriptions-item>
      <a-descriptions-item label="Stage">
        {{ get(thisData, "stage.name", "") }}
      </a-descriptions-item>
      <a-descriptions-item label="Project">
        {{ get(thisData, "project.name", "") }}
      </a-descriptions-item>
    </a-descriptions>
    <a-descriptions :column="4">
      <a-descriptions-item label="Executor">
        {{ get(thisData, "executor.username", "") }}
      </a-descriptions-item>
      <a-descriptions-item label="Creator">
        {{ get(thisData, "creator.username", "") }}
      </a-descriptions-item>
      <a-descriptions-item label="Tester">
        <span
          v-for="teser of get(thisData, 'custom_field_tester', [])"
          :key="teser.username"
          >{{ teser.username }}</span
        >
      </a-descriptions-item>
    </a-descriptions>
    <a-descriptions :column="1">
      <a-descriptions-item label="Involve Members">
        <span
          v-for="invoke of get(thisData, 'involve_members', [])"
          :key="invoke.username"
          >{{ invoke.username }}</span
        >
      </a-descriptions-item>
    </a-descriptions>
    <a-descriptions :column="4">
      <a-descriptions-item label="Frontend">
        <span
          v-for="frontend of get(thisData, 'custom_field_frontend', [])"
          :key="frontend.username"
          >{{ frontend.username }}</span
        >
      </a-descriptions-item>
      <a-descriptions-item label="Backend">
        <span
          v-for="backend of get(thisData, 'custom_field_backend', [])"
          :key="backend.username"
          >{{ backend.username }}</span
        >
      </a-descriptions-item>
      <a-descriptions-item label="Created">
        {{ get(thisData, "created", "") }}
      </a-descriptions-item>
      <a-descriptions-item label="Updated">
        {{ get(thisData, "updated", "") }}
      </a-descriptions-item>
      <a-descriptions-item label="Note">
        <a-tag color="processing" v-if="get(thisData, 'note', '')">{{
          get(thisData, "note", "")
        }}</a-tag>
      </a-descriptions-item>
    </a-descriptions>
  </a-spin>
</template>
<script>
import { getCurrentInstance, watch, ref } from "vue";
export default {
  props: ["loading", "data"],
  setup(props) {
    const { ctx } = getCurrentInstance();
    const { get } = ctx.$lodash;
    const thisData = ref({});
    const infoLoading = ref(true);
    const updateData = param => {
      thisData.value = param.data;
      infoLoading.value = param.loading;
    };

    watch(props, () => {
      updateData(props);
    });

    updateData(props);

    return {
      thisData,
      infoLoading,
      get
    };
  }
};
</script>
