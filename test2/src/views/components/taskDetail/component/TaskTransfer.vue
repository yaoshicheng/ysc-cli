<template>
  <a-form
    class="transferForm"
    :model="form"
    ref="transferForm"
    :rules="rules"
    layout="vertical"
  >
    <a-row>
      <a-col :span="11">
        <a-form-item
          ref="frontend_repo_and_branch"
          name="frontend_repo_and_branch"
          label="Frontend Repo And Branches"
          :error="get(errorData, 'frontend_repo_and_branch[0]', '')"
        >
          <cascader
            v-model:value="form.frontend_repo_and_branch"
            :data="frontend_Repo"
            placeholder="Frontend Repo And Branches"
            clearable
            filterable
          />
        </a-form-item>
      </a-col>
      <a-col :span="11">
        <a-form-item
          ref="backend_repo_and_branch"
          name="backend_repo_and_branch"
          label="Backend Repo And Branches"
          :error="get(errorData, 'backend_repo_and_branch[0]', '')"
        >
          <cascader
            v-model:value="form.backend_repo_and_branch"
            :data="backend_Repo"
            placeholder="Backend Repo And Branches"
            clearable
            filterable
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row type="flex" justify="space-around">
      <a-col :span="11">
        <a-form-item
          label="Rework Related Issue ID"
          :error="get(errorData, 'rework_related_issue_id[0]', '')"
        >
          <a-input
            v-model:value="form.rework_related_issue_id"
            placeholder="Rework Related Issue ID"
          />
        </a-form-item>
      </a-col>
      <a-col :span="3">
        <a-form-item
          label="Self Tested"
          :error="get(errorData, 'self_tested[0]', '')"
        >
          <a-checkbox v-model:checked="form.self_tested" />
        </a-form-item>
      </a-col>
      <a-col :span="4"
        ><a-form-item
          label="YApi Updated"
          :error="get(errorData, 'yapi_updated[0]', '')"
        >
          <a-checkbox v-model:checked="form.yapi_updated" />
        </a-form-item>
      </a-col>
      <a-col :span="6"
        ><a-form-item
          label="Master Branch Rebased"
          :error="get(errorData, 'master_branch_rebased[0]', '')"
        >
          <a-checkbox v-model:checked="form.master_branch_rebased" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item label="Configs" :error="get(errorData, 'config[0]', '')">
      <a-textarea
        v-model:value="form.config"
        placeholder="Configs"
        :auto-size="{ minRows: 4, maxRows: 8 }"
      />
    </a-form-item>
    <a-form-item label="Scripts" :error="get(errorData, 'script[0]', '')">
      <a-textarea v-model:value="form.script" placeholder="Scripts" :rows="4" />
    </a-form-item>
    <a-form-item
      label="Transfer Comment"
      :error="get(errorData, 'comment[0]', '')"
    >
      <a-textarea
        v-model:value="form.comment"
        placeholder="Transfer Comment"
        :rows="4"
      />
    </a-form-item>
    <div class="btn-group">
      <a-button type="primary" @click="syncTask" :loading="syncLoading">
        Sync From TB
      </a-button>
      <a-button type="primary" @click="transferTask" :loading="transferLoading">
        Transfer ( {{ logs_count }} times)
      </a-button>
    </div>
  </a-form>
</template>
<script>
import { message } from "ant-design-vue";
import { getRepo, syncTaskTransfer, transfer } from "@/server/transfer";
import { handleErrorData } from "@/common/js/utils";
import Cascader from "@/components/Cascader";

export default {
  props: ["pk", "updateHistory"],
  components: {
    Cascader
  },
  data() {
    return {
      form: {
        frontend_repo_and_branch: [],
        backend_repo_and_branch: [],
        rework_related_issue_id: "",
        self_tested: false,
        yapi_updated: false,
        master_branch_rebased: false,
        config: "",
        script: "",
        comment: ""
      },
      rules: {
        frontend_repo_and_branch: [
          {
            required: true,
            message: "require branch",
            trigger: "blur"
          }
        ],
        backend_repo_and_branch: [
          {
            required: true,
            message: "require branch",
            trigger: "blur"
          }
        ]
      },
      errorData: {},
      frontend_Repo: [],
      backend_Repo: [],
      logs_count: 0,
      transferLoading: false,
      syncLoading: false,
      get: this.$lodash.get
    };
  },
  mounted() {
    this.getAllRepo();
  },
  methods: {
    getAllRepo() {
      this.setRepo("frontend");
      this.setRepo("backend");
    },
    setRepo(type) {
      getRepo({ group: type })
        .then(res => {
          const { get, forEach } = this.$lodash;
          const data = get(res, "data", []);
          forEach(data, (item, index) => (item.value = `${index}-index`));
          if (type == "frontend") {
            this.frontend_Repo = data;
          } else {
            this.backend_Repo = data;
          }
        })
        .catch(err => {
          handleErrorData(err);
        });
    },
    transferTask() {
      this.$refs.transferForm
        .validate()
        .then(() => {
          this.transferLoading = true;
          const { pk, updateHistory } = this.$props;
          transfer(pk, this.form)
            .then(() => {
              message.success("Success Complete");
              updateHistory();
              this.transferLoading = false;
            })
            .catch(err => {
              this.transferLoading = false;
              const { errorData } = err;
              this.errorData = errorData;
              handleErrorData(err);
            });
        })
        .catch(error => {
          console.log("error", error);
        });
    },
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
