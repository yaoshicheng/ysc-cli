<template>
  <div class="devops_deployment">
    <h4 class="subTitle">Release Detail</h4>

    <a-descriptions title="User Info" :column="2">
      <a-descriptions-item label="Release Name">
        {{ releasedata.name }}
      </a-descriptions-item>
      <a-descriptions-item label="Release Time">
        {{ releasedata.release_time }}
      </a-descriptions-item>
      <a-descriptions-item label="Creator">
        {{ (releasedata.creator || {}).username || "--" }}
      </a-descriptions-item>
      <a-descriptions-item label="Create Time">
        {{ moment(releasedata.created).format("YYYY-MM-DD hh:mm:ss") }}
      </a-descriptions-item>
      <a-descriptions-item label="Updater">
        {{ (releasedata.updater || {}).username || "--" }}
      </a-descriptions-item>
      <a-descriptions-item label="Update Time">
        {{ moment(releasedata.updated).format("YYYY-MM-DD hh:mm:ss") }}
      </a-descriptions-item>
      <a-descriptions-item label="State">
        {{ releasedata.state }}
      </a-descriptions-item>
    </a-descriptions>

    <h4 class="subTitle">Services to Deploy</h4>

    <div class="deploy_service" style="margin-bottom: 20px">
      <div class="bt_button ">
        <a-button type="danger" @click="TriggerRelease"
          >Trigger Release</a-button
        >
        <a-button
          type="primary"
          @click="AddService"
          v-if="env.name !== 'PRODUCTION'"
          >Add Service</a-button
        >
        <a-button
          type="default"
          @click="SyncService"
          v-if="env.name !== 'BENCHMARK'"
          :disabled="!SyncEnable"
          >Sync Service</a-button
        >
        <a-button type="dashed" @click="LoadServiceData">ReFresh</a-button>
        <a-button
          type="danger"
          @click="ToggleDeploy"
          v-if="env.name === 'PRODUCTION'"
          :disabled="releasedata.state !== 'FINISHED_REGRESSION_TESTING'"
          >DeployDone</a-button
        >
        <a-button
          type="primary"
          @click="handleDeleteBranch"
          v-if="env.name === 'PRODUCTION'"
          :disabled="releasedata.state !== 'PRODUCTION_DEPLOYED'"
          >DelBranch</a-button
        >
      </div>

      <ServiceModal
        :data="modalData"
        :visible="serviceModalVisible"
        :actionType="actionType"
        :AppVersions="AppVersions"
        :ApplicationList="ApplicationList"
        :SelectSvcEnable="SelectSvcEnable"
        :changeAppVersion="getTags"
        :close="closeServiceModal"
        :confirm="confirmServiceModal"
      ></ServiceModal>

      <BranchModal
        :data="DelBranchList"
        :visible="Del_Branch_Visible"
        :close="closeBranchModal"
        :confirm="closeBranchModal"
      ></BranchModal>
    </div>

    <div class="Service_table">
      <a-table
        :pagination="false"
        :columns="Release_Detail_Columns"
        :data-source="DeployServiceList"
        :scroll="{ x: '100%' }"
        :loading="tableLoading"
        rowKey="pk"
      >
        <template #action="{text}">
          <a-button-group v-if="text.state === 'SUCCEED'">
            <a-button type="dashed" size="small" @click="DeploySvc(text)"
              >Re-Deploy</a-button
            >
            <a-button
              type="primary"
              size="small"
              @click="EditService(text)"
              v-if="env.name !== 'PRODUCTION'"
              >Update</a-button
            >
            <a-button type="default" size="small" @click="HistorySvc(text)"
              >History</a-button
            >
            <a-button
              type="danger"
              size="small"
              @click="ActionSvc(text, 'remove')"
              >Remove</a-button
            >
          </a-button-group>
          <a-button-group v-else-if="text.state === 'RECOVERED'">
            <a-button type="default" size="small" @click="DeploySvc(text)"
              >Deploy</a-button
            >
            <a-button
              type="primary"
              size="small"
              @click="EditService(text)"
              v-if="env.name !== 'PRODUCTION'"
              >Update</a-button
            >
            <a-button type="dashed" size="small" @click="HistorySvc(text)"
              >History</a-button
            >
            <a-button
              type="danger"
              size="small"
              @click="ActionSvc(text, 'remove')"
              >Remove</a-button
            >
          </a-button-group>
          <a-button-group v-else-if="text.state === 'REMOVED'">
            <a-button type="primary" size="small">History</a-button>
            <a-button
              type="dashed"
              size="small"
              @click="ActionSvc(text, 'recover')"
              >Recover</a-button
            >
          </a-button-group>
          <a-button-group v-else-if="text.state === 'CREATED' || 'UPDATED'">
            <a-button type="default" size="small" @click="DeploySvc(text)"
              >Deploy</a-button
            >
            <a-button
              type="primary"
              size="small"
              @click="EditService(text)"
              v-if="env.name !== 'PRODUCTION'"
              >Update</a-button
            >
            <a-button type="dashed" size="small" @click="HistorySvc(text)"
              >History</a-button
            >
            <a-button
              type="danger"
              size="small"
              @click="ActionSvc(text, 'remove')"
              >Remove</a-button
            >
          </a-button-group>
          <a-button-group v-else-if="text.state === 'DEPLOYING'">
            <a-button type="primary" size="small" @click="HistorySvc(text)"
              >History</a-button
            >
          </a-button-group>
          <a-button-group v-else-if="text.state === 'FAILED'">
            <a-button type="default" size="small" @click="DeploySvc(text)"
              >Re-Deploy</a-button
            >
            <a-button
              type="primary"
              size="small"
              @click="EditService(text)"
              v-if="env.name !== 'PRODUCTION'"
              >Update</a-button
            >
            <a-button type="dashed" size="small" @click="HistorySvc(text)"
              >History</a-button
            >
            <a-button
              type="danger"
              size="small"
              @click="ActionSvc(text, 'remove')"
              >Remove</a-button
            >
          </a-button-group>
          <a-button-group v-else>
            <a-button type="primary" size="small" @click="HistorySvc(text)"
              >History</a-button
            >
          </a-button-group>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import {
  toggleDeployById,
  getBranchsById,
  triggerReleaseById,
  getTagsById,
  syncServiceById,
  getServiceDataById,
  releaseDeploymentById,
  removeDeploymentById,
  recoverDeploymentById
} from "../../../server/devops";

import moment from "moment";
import { Release_Detail_Columns } from "../const";
import ServiceModal from "./ServiceModal";
import BranchModal from "./BranchModal";
import { nextTick, onMounted, ref, getCurrentInstance } from "vue";
import { handleErrorData } from "../../../common/js/utils";

export default {
  name: "deployment",
  props: ["env", "releasedata", "envinfo", "ApplicationList"],
  components: {
    ServiceModal,
    BranchModal
  },
  setup() {
    const { ctx } = getCurrentInstance();
    const tableLoading = ref(false);
    const DeployServiceList = ref([]);
    const AppVersions = ref([]);
    const LoadServiceData = () => {
      let params = {
        environment: ctx.env.pk
      };
      tableLoading.value = true;
      getServiceDataById({ id: ctx.release_id, params })
        .then(res => {
          DeployServiceList.value = res.data.results;
          nextTick(() => {
            const timer = setTimeout(() => {
              tableLoading.value = false;
              clearTimeout(timer);
            }, 200);
          });
        })
        .catch(err => {
          handleErrorData(err);
          tableLoading.value = false;
        });
    };

    const getTags = val => {
      ctx.modalData.version = "";
      getTagsById(val)
        .then(res => {
          AppVersions.value = res.data;
        })
        .catch(err => {
          handleErrorData(err);
        });
    };

    onMounted(LoadServiceData);

    return {
      tableLoading,
      DeployServiceList,
      AppVersions,
      LoadServiceData,
      getTags
    };
  },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      Release_Detail_Columns,
      release_id: this.$route.params.release_id,
      moment,
      DelBranchList: [],
      Del_Branch_Visible: false,
      startIntervel: "",
      serviceModalVisible: false,
      actionType: "add",
      SelectSvcEnable: true,
      modalData: {
        application: "",
        version: "",
        env: this.env.pk,
        note: ""
      }
    };
  },

  mounted() {
    setTimeout(() => {
      this.AutoRefresh();
    }, 2000);
  },

  computed: {
    /**
     * @return {boolean}
     */
    SyncEnable() {
      if (["BENCHMARK", "UAT", "PRODUCTION"].indexOf(this.env.name) === -1) {
        return this.releasedata.state === "PRODUCTION_DEPLOYED";
      }
      return true;
    }
  },

  methods: {
    // auto refresh service
    AutoRefresh() {
      if (
        this.DeployServiceList.filter(item => item.state === "DEPLOYING")
          .length !== 0
      ) {
        // console.log("删除旧计时器");
        clearInterval(this.startIntervel);
        // console.log("创建新计时器");
        this.startIntervel = setInterval(() => {
          setTimeout(this.LoadServiceData(), 0);
          // console.log("Refresh");
        }, 30000);
      } else {
        clearInterval(this.startIntervel);
      }
    },

    // branch
    handleDeleteBranch() {
      this.getDelBranches();
      this.Del_Branch_Visible = true;
    },

    getDelBranches() {
      getBranchsById(this.release_id)
        .then(res => {
          this.DelBranchList = res.data;
        })
        .catch(err => {
          handleErrorData(err);
        });
    },

    closeBranchModal() {
      this.Del_Branch_Visible = false;
    },

    // service
    AddService() {
      this.actionType = "add";
      this.SelectSvcEnable = true;
      this.serviceModalVisible = true;
      this.modalData = {
        application: "",
        version: "",
        environment: this.env.pk,
        note: ""
      };
    },

    EditService(row) {
      this.getTags(row.application.pk);
      this.actionType = "Edit";
      this.SelectSvcEnable = false;
      this.modalData = {
        pk: row.pk,
        application: row.application.pk,
        version: row.version,
        env: this.env.pk,
        note: row.note
      };
      this.serviceModalVisible = true;
    },

    clearServiceModalData() {
      this.modalData = {
        application: "",
        version: "",
        env: this.env.pk,
        note: ""
      };
    },
    closeServiceModal() {
      this.clearServiceModalData();
      this.SelectSvcEnable = false;
      this.serviceModalVisible = false;
    },

    confirmServiceModal() {
      this.serviceModalVisible = false;
      this.clearServiceModalData();
      this.LoadServiceData();
    },

    GetSourceEnv() {
      let source_env;
      const envName = this.env.name;
      if (envName === "UAT") {
        source_env = this.envinfo.find(item => item.name === "BENCHMARK").pk;
      } else if (envName === "PRODUCTION") {
        source_env = this.envinfo.find(item => item.name === "UAT").pk;
      } else {
        source_env = this.envinfo.find(item => item.name === "PRODUCTION").pk;
      }
      return source_env;
    },

    SyncService() {
      this.$modal.confirm({
        title: "Sync Service ?",
        okText: "Yes",
        cancelButtonText: "No",
        type: "warning",
        onOk: () => {
          let params = {
            source_env: this.GetSourceEnv(),
            target_env: this.env.pk
          };
          syncServiceById({ id: this.release_id, data: params })
            .then(() => {
              this.$message.success("Sync Complete");
              this.LoadServiceData();
            })
            .catch(err => {
              handleErrorData(err);
            });
        }
      });
    },

    // btn group
    ToggleDeploy() {
      let params = {
        state: "PRODUCTION_DEPLOYED"
      };
      toggleDeployById({ id: this.release_id, data: params })
        .then(() => {
          this.$message.success("Complete");
          this.$emit("LoadRelease");
        })
        .catch(err => {
          handleErrorData(err);
        });
    },

    TriggerRelease() {
      this.$modal.confirm({
        title: "Warning",
        content: `Release ${this.releasedata.name} ${this.env.name}?`,
        okText: "Yes",
        cancelButtonText: "No",
        type: "warning",
        onOk: () => {
          triggerReleaseById({
            id: this.release_id,
            data: {
              environment: ""
            }
          })
            .then(() => {
              this.$message.message("Submit Complete");
              this.LoadServiceData();
            })
            .catch(err => {
              handleErrorData(err);
            });
        }
      });
    },

    ActionSvc(row, type) {
      let content;
      let action;
      if (type === "remove") {
        content = `Removing ${row.application.name} ?`;
        action = removeDeploymentById;
      } else {
        content = `Recover ${row.application.name} ?`;
        action = recoverDeploymentById;
      }
      this.$modal.confirm({
        title: "Warning",
        content,
        okText: "Yes",
        cancelButtonText: "No",
        type: "warning",
        onOk: () => {
          if (typeof action === "function") {
            action(row.pk)
              .then(() => {
                this.$message.success("Success!");
                this.LoadServiceData();
              })
              .catch(err => {
                handleErrorData(err);
              });
          }
        }
      });
    },

	  HistorySvc(){

    },

    DeploySvc(row) {
      this.$modal.confirm({
        title: "Warning",
        content: `Deploy ${row.application.name} ( ${row.version} )?`,
        okText: "Yes",
        cancelButtonText: "No",
        type: "warning",
        onOk: () => {
          releaseDeploymentById(row.pk)
            .then(() => {
              this.$message.success("Submit Complete");
              this.LoadServiceData();
            })
            .catch(err => {
              handleErrorData(err);
            });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.bt_button {
  margin: 20px 0;
  .ant-btn {
    margin-right: 15px;
  }
}
</style>
