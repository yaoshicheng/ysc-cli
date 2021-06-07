<template>
  <a-form class="transferForm" layout="vertical">
    <a-row>
      <a-col :span="11">
        <a-form-item label="Frontend Repo And Branches">
          <a-tag
            v-for="item of get(log, 'frontend_repo_and_branch', [])"
            :key="item.id"
          >
            {{ item.repo }}/{{ item.branch }}
          </a-tag>
        </a-form-item>
      </a-col>
      <a-col :span="11">
        <a-form-item label="Backend Repo And Branches">
          <a-tag
            v-for="item of get(log, 'backend_repo_and_branch', [])"
            :key="item.id"
          >
            {{ item.repo }}/{{ item.branch }}
          </a-tag>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row type="flex" justify="space-around">
      <a-col :span="11">
        <a-form-item label="Rework Related Issue ID">
          {{ get(log, "rework_related_issue_id", "") }}
        </a-form-item>
      </a-col>
      <a-col :span="3">
        <a-form-item label="Self Tested">
          {{ get(log, "self_tested", "") ? "Yes" : "No" }}
        </a-form-item>
      </a-col>
      <a-col :span="4"
        ><a-form-item label="YApi Updated">
          {{ get(log, "yapi_updated", "") ? "Yes" : "No" }}
        </a-form-item>
      </a-col>
      <a-col :span="6"
        ><a-form-item label="Master Branch Rebased">
          {{ get(log, "master_branch_rebased", "") ? "Yes" : "No" }}
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item label="Configs">
      {{ get(log, "config", "") }}
    </a-form-item>
    <a-form-item label="Scripts">
      {{ get(log, "script", "") }}
    </a-form-item>
    <a-form-item label="Transfer Comment">
      {{ get(log, "comment", "") }}
    </a-form-item>
    <div class="btn-group">
      <a-button type="primary" @click="syncTask" :loading="syncLoading">
        Sync From TB
      </a-button>
      <a-button
        type="primary"
        @click="finishTest"
        :loading="finishLoading"
        v-if="accesstype === 'kanbanDetail'"
      >
        Finish Testing
      </a-button>
    </div>
  </a-form>
</template>
<script>
import { message } from "ant-design-vue";
import { syncTaskTransfer } from "@/server/transfer";
import { finishTest } from "@/server/kanban";
import { handleErrorData } from "@/common/js/utils";

export default {
  props: ["pk", "updateHistory", "log", "accesstype"],
  data() {
    return {
      finishLoading: false,
      syncLoading: false,
      get: this.$lodash.get
    };
  },
  methods: {
    syncTask() {
      this.syncLoading = true;
      const pk = this.$props.pk;
      syncTaskTransfer(pk)
        .then(() => {
          message.success("Fetch Success");
          this.syncLoading = false;
        })
        .catch(err => {
          this.syncLoading = false;
          handleErrorData(err);
        });
    },
    finishTest() {
      this.finishLoading = true;
      const { pk, updateHistory } = this.$props;
      finishTest(pk)
        .then(() => {
          message.success("Complete");
          this.finishLoading = false;
          updateHistory();
        })
        .catch(err => {
          this.finishLoading = false;
          handleErrorData(err);
        });
    }
  }
};
</script>
<style lang="less">
.transferForm {
  .ant-form-item {
    padding: 8px;
  }
  .ant-checkbox-wrapper {
    margin-top: 5px;
  }
}
</style>
