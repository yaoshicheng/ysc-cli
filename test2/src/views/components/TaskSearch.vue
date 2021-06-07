<template>
  <a-form
    ref="ruleForm"
    layout="inline"
    :model="taskForm"
    class="search-form clearfix"
  >
    <a-form-item>
      <a-input
        size="large"
        v-model:value="taskForm.unique_id"
        placeholder="Task ID"
      ></a-input>
    </a-form-item>
    <a-form-item>
      <a-select
        size="large"
        allowClear
        v-model:value="taskForm.is_done"
        placeholder="Done"
      >
        <a-select-option
          v-for="item in doneList"
          :key="item.value"
          :value="item.value"
        >
          {{ item.label }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item>
      <a-select
        v-model:value="taskForm.task_list"
        size="large"
        filterable
        clearable
        allowClear
        placeholder="Task List"
      >
        <a-select-option
          v-for="task in tasklist"
          :key="task.value"
          :value="task.value"
        >
          {{ task.label }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item>
      <a-select
        v-model:value="taskForm.stage"
        size="large"
        filterable
        clearable
        allowClear
        placeholder="Stage"
        no-data-text="Select Tasklist"
        class="stageList"
      >
        <a-select-option
          v-for="stage in stageList"
          :key="stage.value"
          :value="stage.value"
        >
          {{ stage.label }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <div class="btn-group">
      <a-button type="primary" @click="searchData">
        Search
      </a-button>
      <a-button type="primary" @click="resetForm">
        Reset
      </a-button>
      <a-button type="primary" @click="fetchTask" v-if="canFetch">
        Fetch
      </a-button>
      <a-button
        type="primary"
        @click="fetchAll"
        :disabled="disabled"
        v-if="hasFetchAll"
      >
        Fetching Tasks
      </a-button>
      <a-button
        type="primary"
        @click="assignAll"
        :disabled="disabled"
        v-if="hasAssignAll"
      >
        Assign Release
      </a-button>
    </div>
  </a-form>
</template>

<script>
import { getCurrentInstance, ref } from "vue";
import { getTaskList } from "../../server/transfer";
import { handleErrorData } from "@/common/js/utils";
export default {
  props: [
    "search",
    "fetchTask",
    "disabled",
    "fetchAll",
    "canFetch",
    "hasFetchAll",
    "hasAssignAll",
    "assignAll"
  ],
  setup(props) {
    const doneList = [
      {
        label: "Yes",
        value: true
      },
      {
        label: "No",
        value: false
      }
    ];

    const tasklist = ref([]);
    const stageList = ref([]);
    const { ctx } = getCurrentInstance();
    const { forEach, get } = ctx.$lodash;

    const LoadTaskLit = () => {
      getTaskList()
        .then(res => {
          const data = get(res, "data", []) || [];
          forEach(data, item => {
            tasklist.value.push({
              value: item.pk,
              label: item.title
            });
            forEach(item.stages, stageItem => {
              stageList.value.push({
                label: stageItem.name,
                value: stageItem.pk
              });
            });
          });
        })
        .catch(err => {
          handleErrorData(err);
        });
    };

    const taskForm = ref({
      unique_id: "",
      is_done: null,
      task_list: null,
      stage: null
    });

    const searchData = () => {
      props.search(taskForm);
    };

    const resetForm = () => {
      taskForm.value = {
        unique_id: "",
        is_done: null,
        task_list: null,
        stage: null
      };
      props.search(taskForm);
    };

    const keyupEnter = () => {
      if (window.event.keyCode == 13) {
        searchData();
      }
    };

    window.addEventListener("keyup", keyupEnter, false);

    LoadTaskLit();

    return {
      doneList,
      tasklist,
      stageList,
      taskForm,
      searchData,
      KeyboardEvent,
      resetForm
    };
  }
};
</script>
<style scoped>
.stageList {
  width: 270px;
}
</style>
