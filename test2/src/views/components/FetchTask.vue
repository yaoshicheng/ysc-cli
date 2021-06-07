<template>
  <a-modal
    title="Fetching Task"
    :visible="visible"
    :confirm-loading="confirmLoading"
    @cancel="afterClose"
    @ok="confirmFetch"
  >
    <a-form
      layout="inline"
      ref="fetchForm"
      :model="fetchForm"
      :rules="fetchrule"
    >
      <a-form-item
        ref="fetchingTaskId"
        name="fetchingTaskId"
        label="Task ID"
        :error="get(errorData, 'fetchingTaskId[0]', '')"
      >
        <a-input
          v-model:value="fetchForm.fetchingTaskId"
          placeholder="Task ID"
        ></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import get from "lodash/get";
export default {
  props: ["visible", "confirmLoading", "handleOk", "afterClose", "errorData"],
  data() {
    return {
      fetchrule: {
        fetchingTaskId: [
          { required: true, message: "require TaskId", trigger: "blur" }
        ]
      },
      fetchForm: {
        fetchingTaskId: ""
      },
      get
    };
  },
  mounted() {
    this.fetchForm ={
        fetchingTaskId: ""
      };
  },
  methods: {
    confirmFetch() {
      this.$refs.fetchForm.validate().then(() => {
        const { handleOk } = this.$props;
        const fetchingTaskId = this.fetchForm.fetchingTaskId;
        handleOk(fetchingTaskId);
      });
    }
  }
};
</script>
