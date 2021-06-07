<template>
  <SearchForm :search="searchData"></SearchForm>

  <a-table
    :pagination="false"
    :columns="Deploy_Columns"
    :data-source="DeployList"
    :scroll="{ x: '100%' }"
    :loading="tableLoading"
    rowKey="pk"
  >
    <template #action="{text}">
      <a-button-group class="el-button-group">
        <a-button size="small" type="primary" @click.stop="UpdateDeploy(text)"
          >Update</a-button
        >
        <a-button size="small" type="default" @click.stop="History(text)"
          >History</a-button
        >
        <a-button size="small" type="danger" @click.stop="Reboot(text)"
          >Reboot</a-button
        >
      </a-button-group>
    </template>
  </a-table>
  <div style="text-align: right;margin-top: 20px">
    <a-pagination
      v-model:current="currentPage"
      v-model:pageSize="pageSize"
      :total="total"
      @change="handleSizeChange"
    >
    </a-pagination>
  </div>

  <a-modal
    class="DeployHis"
    :visible="historyVisible"
    width="700px"
    title="Deployment History"
    @ok="handleDeployHistoryOk"
    @cancel="handleDeployHistoryCancel"
  >
    <DeploymentHistory :data="historyList" :loading="historyLoading" />
  </a-modal>

  <a-modal
    :visible="UpdateDeployVisible"
    width="600px"
    title="Update Deployment"
    @ok="handleUpdateDeployOk"
    @cancel="handleUpdateDeployCancel"
  >
    <DeplolyModal :DeployData="DeployData" />
  </a-modal>
</template>

<script>
import { Deploy_Columns, Deploy_History_Columns } from "./const";
import moment from "moment";
import { getDeployment, getDeploymentOpLogs } from "../../server/kube";
import SearchForm from "./SearchForm";
import DeplolyModal from "./DeplolyModal";
import DeploymentHistory from "./DeploymentHistory";
import { ref, nextTick } from "vue";
import { handleErrorData } from "@/common/js/utils";

export default {
  name: "deployment",
  components: {
    SearchForm,
    DeplolyModal,
    DeploymentHistory
  },
  setup() {
    const historyVisible = ref(false);
    const historyLoading = ref(false);
    const tableLoading = ref(false);
    const total = ref(0);
    const pageSize = ref(10);
    const currentPage = ref(1);
    const historyList = ref([]);
    const kube_cluster = ref(null);
    const kube_ns = ref(null);
    const appname = ref(null);
    const DeployList = ref([]);

    const LoadDeploy = () => {
      tableLoading.value = true;
      let params = {
        cluster: kube_cluster.value,
        namespace: kube_ns.value,
        application: appname.value,
        limit: pageSize.value,
        offset: (currentPage.value - 1) * pageSize.value
      };
      getDeployment(params)
        .then(res => {
          DeployList.value = res.data.results;
          total.value = res.data.count;
          const timeout = setTimeout(() => {
            tableLoading.value = false;
            clearTimeout(timeout);
          }, 200);
        })
        .catch(err => {
          handleErrorData(err);
          tableLoading.value = false;
        });
    };

    const searchData = filters => {
      const { kube_cluster: a, kube_ns: b, appname: c } = filters;
      kube_cluster.value = a.value;
      kube_ns.value = b.value;
      appname.value = c.value;
      LoadDeploy();
    };

    return {
      historyVisible,
      historyLoading,
      tableLoading,
	    historyList,
      DeployList,
      total,
      pageSize,
      currentPage,
      kube_cluster,
      kube_ns,
      appname,
      LoadDeploy,
      searchData
    };
  },
  data() {
    return {
      labelCol: { span: 5 },
      wrapper: { span: 18 },
      moment,
      Deploy_Columns,
      Deploy_History_Columns,
      UpdateDeployVisible: false,
      DeployData: {}
    };
  },
  methods: {
    handleDeployHistoryCancel() {
      this.historyVisible = false;
    },
    handleDeployHistoryOk() {
      this.historyVisible = false;
    },
    handleUpdateDeployCancel() {
      this.UpdateDeployVisible = false;
      this.DeployData = {
        cpu: 0,
        ram: 0,
        replica_count: 0,
        cluster: { name: "" },
        namespace: { name: "" }
      };
      this.LoadDeploy();
    },
    handleUpdateDeployOk() {
      this.UpdateDeployVisible = false;
    },

    handleSizeChange(page, pageSize) {
      this.pageSize = pageSize;
      this.currentPage = page;
      this.LoadDeploy();
    },

    UpdateDeploy(row) {
      this.UpdateDeployVisible = true;
      this.DeployData = row;
    },

    History(row) {
      this.historyVisible = true;
      this.historyLoading = true;
      let params = {
        deployment__application: row.application.pk,
        limit: 100
      };
      getDeploymentOpLogs(params)
        .then(res => {
          this.historyList = res.data;
          nextTick(() => {
            const timeout = setTimeout(() => {
              this.historyLoading = false;
              clearTimeout(timeout);
            }, 200);
          });
        })
        .catch(err => {
          handleErrorData(err);
          this.historyLoading = false;
        });
    },

    Reboot() {
      this.$message.warning("Updating....");
    }
  }
};
</script>

<style scoped lang="scss"></style>
