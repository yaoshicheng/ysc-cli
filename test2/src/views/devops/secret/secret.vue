<template>
  <div class="secret_wrapper" style="height: 100%">
    <SearchForm
      :secret_classification="secretClass"
      :sec_env="secretEnvs"
      @click-query="searchSecret"
      @click-add="addSecret"
    ></SearchForm>

    <a-table
      :pagination="false"
      :columns="Secret_Columns"
      :data-source="SecretList"
      :scroll="{ x: '100%' }"
      :loading="table_loading"
      rowKey="pk"
    >
      <template #action="{text}">
        <a-button-group class="el-button-group">
          <a-button type="primary" size="small" @click="editSecret(text)"
            >Update</a-button
          >
          <a-button type="danger" size="small" @click="deleteSec(text)"
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

    <SecretModal
      :data="modalData"
      :visible="secretModalVisible"
      :actionType="actionType"
      :secretEnvs="secretEnvs"
      :secretClass="secretClass"
      :close="closeSecretModal"
      :confirm="confirmSecretModal"
    />
  </div>
</template>

<script>
import {
  deleteSecret,
  getSecretClassification,
  getSecrets
} from "../../../server/devops";
import { Secret_Columns } from "../const";
import SearchForm from "./SearchForm";
import SecretModal from "./SecretModal";
import { ops_config } from "@/common/const";
import { handleErrorData } from "@/common/js/utils";
import { nextTick, ref, onMounted, unref } from "vue";
export default {
  name: "secret",
  components: {
    SearchForm,
    SecretModal
  },
  setup() {
    const SecretList = ref([]);
    const table_loading = ref(false);
    const pageSize = ref(10);
    const total = ref(0);
    const currentPage = ref(1);
    const secretClass = ref([]);
    const actionType = ref("");
    const secretModalVisible = ref(false);
    const filter = ref({
      classification: "",
      environment: "",
      key: "",
      note: ""
    });

    const LoadSecData = () => {
      const { classification, environment, key, note } = unref(filter);
      let params = {
        classification: classification,
        environment: environment,
        key: key,
        note: note,
        limit: pageSize.value,
        offset: (currentPage.value - 1) * pageSize.value
      };
      table_loading.value = true;
      getSecrets(params)
        .then(res => {
          nextTick(() => {
            // 获取表格最大高度
            const timer = setTimeout(() => {
              table_loading.value = false;
              clearTimeout(timer);
            }, 200);
          });
          SecretList.value = res.data.results;
          total.value = res.data.count;
        })
        .catch(err => {
          handleErrorData(err);
          table_loading.value = false;
        });
    };

    const init = () => {
      getSecretClassification()
        .then(res => {
          secretClass.value = res.data;
        })
        .catch(err => {
          handleErrorData(err);
        });
      LoadSecData();
    };

    onMounted(init);

    return {
      SecretList,
      table_loading,
      pageSize,
      total,
      currentPage,
      secretClass,
      filter,
      secretEnvs: ops_config.sec_env,
      actionType,
      secretModalVisible,
      LoadSecData
    };
  },
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
      Secret_Columns,
      modalData: {
        classification: "",
        environment: "",
        key: "",
        value: "",
        link: "",
        note: ""
      }
    };
  },
  methods: {
    editSecret(row) {
      this.secretModalVisible = true;
      this.actionType = "edit";
      this.modalData = {
        pk: row.pk,
        classification: row.classification.pk,
        environment: row.environment,
        key: row.key,
        value: row.value,
        link: row.link,
        note: row.note
      };
    },

    addSecret() {
      this.secretModalVisible = true;
      this.actionType = "add";
      this.clearModalData();
    },

	  deleteSec(row) {
      this.$modal.confirm({
        title: "Delete ?",
        okText: "Yes",
        cancelButtonText: "No",
        onOk: () => {
          deleteSecret(row.pk)
            .then(() => {
              this.$message.success("Complete");
              this.LoadSecData();
            })
            .catch(err => {
              handleErrorData(err);
            });
        }
      });
    },

    searchSecret(data) {
      this.filter = data;
      this.LoadSecData();
    },

    clearModalData() {
      this.modalData = {
        pk: "",
        classification: "",
        environment: "",
        key: "",
        value: "",
        link: "",
        note: ""
      };
    },

    closeSecretModal() {
      this.secretModalVisible = false;
      this.clearModalData();
    },

    confirmSecretModal() {
      this.closeSecretModal();
      this.LoadSecData();
    },

    handleSizeChange(page, pageSize) {
      this.pageSize = pageSize;
      this.currentPage = page;
      this.LoadSecData();
    }
  }
};
</script>

<style scoped>
.ant-col.ant-form-item-label {
  width: 100px !important;
}
</style>
