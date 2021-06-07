<template>
  <div class="secret_wrapper" style="height: 100%">
    <SearchForm
      :secret_classification="secretClass"
      @click-query="search"
      @click-add="add"
    ></SearchForm>

    <a-table
      :pagination="false"
      :columns="Application_Columns"
      :data-source="ApplicationList"
      :scroll="{ x: '100%' }"
      :loading="table_loading"
      rowKey="pk"
    >
      <template #list="{text}">
        <span
          v-for="(user, index) of text"
          style="margin-left: 5px"
          v-bind:key="index"
          >{{ user.username }}</span
        >
      </template>

      <template #status="{text}">
        {{ text ? "Yes" : "No" }}
      </template>

      <template #time="{text}">
        {{ moment(text).format("YYYY-MM-DD hh:mm:ss") }}
      </template>

      <template #action="{text}">
        <a-button-group class="el-button-group">
          <a-button type="primary" size="small" @click="editApp(text)"
            >Update</a-button
          >
          <a-button type="default" size="small" @click="historyApp(text)"
            >History</a-button
          >
          <a-button type="danger" size="small" @click="deleteApp(text)"
            >Delete</a-button
          >
        </a-button-group>
      </template>
    </a-table>
    <div style="text-align: right;margin-top: 10px">
      <a-pagination
        v-model:current="currentPage"
        v-model:pageSize="pageSize"
        :total="total"
        @change="handleSizeChange"
      >
      </a-pagination>
    </div>

    <ApplicationModal
      :data="modalData"
      :visible="applicationModalVisible"
      :actionType="actionType"
      :close="closeModal"
      :confirm="confirmModal"
    />
  </div>
</template>

<script>
import moment from "moment";
import { deleteApplication, getApplications } from "../../../server/devops";
import { Application_Columns } from "../const";
import SearchForm from "./SearchForm";
import ApplicationModal from "./ApplicationModal";
import { handleErrorData } from "@/common/js/utils";
import { ref, onMounted, unref } from "vue";
export default {
  name: "Application",
  components: {
    SearchForm,
    ApplicationModal
  },
  setup() {
    const ApplicationList = ref([]);
    const table_loading = ref(false);
    const pageSize = ref(10);
    const total = ref(0);
    const currentPage = ref(1);
    const secretClass = ref([]);
    const actionType = ref("");
    const applicationModalVisible = ref(false);
    const filter = ref({
      application_type: "",
      module: "",
      name: "",
      note: ""
    });

    const LoadApplicationData = () => {
      const { application_type, module, name, note } = unref(filter);
      let params = {
        application_type,
        module,
        name,
        note,
        limit: pageSize.value,
        offset: (currentPage.value - 1) * pageSize.value
      };
      table_loading.value = true;
      getApplications(params)
        .then(res => {
          ApplicationList.value = res.data.results;
          total.value = res.data.count;
          table_loading.value = false;
        })
        .catch(err => {
          handleErrorData(err);
          table_loading.value = false;
        });
    };

    // const init = () => {
    //   LoadApplicationData();
    // };
    //
    onMounted(LoadApplicationData);

    return {
      moment,
      ApplicationList,
      table_loading,
      pageSize,
      total,
      currentPage,
      secretClass,
      filter,
      actionType,
      applicationModalVisible,
      LoadApplicationData
    };
  },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
      Application_Columns,
      modalData: {
        name: "",
        project: "MATRIX",
        application_type: "",
        module: "",
        classification: "",
        release_sequence: "",
        involved_people: [],
        deployment_method: "",
        multi_instance_supported: false,
        state: "",
        note: "--"
      }
    };
  },
  methods: {
    getUsersIds(users) {
      return users.map(item => item.pk);
    },

    editApp(row) {
      this.applicationModalVisible = true;
      this.actionType = "edit";
      this.modalData = {
        pk: row.pk,
        name: row.name,
        project: row.project,
        application_type: row.application_type,
        module: row.module,
        classification: row.classification,
        release_sequence: row.release_sequence,
        involved_people: this.getUsersIds(row.involved_people),
        deployment_method: row.deployment_method,
        multi_instance_supported: row.multi_instance_supported,
        state: row.state,
        note: row.note
      };
    },

    add() {
      this.applicationModalVisible = true;
      this.actionType = "add";
      this.clearModalData();
    },

    // eslint-disable-next-line no-unused-vars
    historyApp(row) {},

    deleteApp(row) {
      this.$modal.confirm({
        title: "Delete ?",
        okText: "Yes",
        cancelButtonText: "No",
        onOk: () => {
          deleteApplication(row.pk)
            .then(() => {
              this.$message.success("Complete");
              this.LoadApplicationData();
            })
            .catch(err => {
              handleErrorData(err);
            });
        }
      });
    },

    search(data) {
      this.filter = data;
      this.LoadApplicationData();
    },

    clearModalData() {
      this.modalData = {
        name: "",
        project: "MATRIX",
        application_type: "",
        module: "",
        classification: "",
        release_sequence: "",
        involved_people: [],
        deployment_method: "",
        multi_instance_supported: false,
        state: "",
        note: "--"
      };
    },

    closeModal() {
      this.applicationModalVisible = false;
      this.clearModalData();
    },

    confirmModal() {
      this.closeModal();
      this.LoadApplicationData();
    },

    handleSizeChange(page, pageSize) {
      this.pageSize = pageSize;
      this.currentPage = page;
      this.LoadApplicationData();
    }
  }
};
</script>

<style scoped>
.ant-col.ant-form-item-label {
  width: 100px !important;
}
</style>
