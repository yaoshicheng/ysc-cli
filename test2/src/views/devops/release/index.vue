<template>
  <div class="secret_wrapper">
    <div style="height: 40px;">
      <a-button-group
        class="btn_right_group"
        style="float:right; margin-bottom: 20px"
      >
        <a-button
          class="btn"
          style="margin-right: 20px"
          type="default"
          @click="clickAdd"
          >Add
        </a-button>
        <a-button
          class="btn"
          type="primary"
          @click="LoadData"
          style="border-left: 1px solid #ddd"
          >Refresh</a-button
        >
      </a-button-group>
    </div>

    <div class="secret_table">
      <a-table
        :pagination="false"
        :columns="Release_Columns"
        :data-source="ReleaseList"
        :scroll="{ x: '100%' }"
        :loading="tableLoading"
        rowKey="pk"
      >
        <template #action="{text}">
          <a-button-group class="el-button-group">
            <a-button type="primary" size="small" @click="EditRelease(text)"
              >Edit</a-button
            >
            <a-button type="default" size="small" @click="DetailRelease(text)"
              >Detail</a-button
            >
            <a-button type="primary" size="small" @click="HistoryRelease(text)"
              >History</a-button
            >
            <a-button type="danger" size="small" @click="TransferRelease(text)"
              >Transfer</a-button
            >
            <a-button
              type="dashed"
              size="small"
              :disabled="!(text.state in Regressionstate)"
            >
              <a-popconfirm
                :title="`Regression state to ${text.state}?`"
                ok-text="Yes"
                cancel-text="No"
                @confirm="RegressionRelease(text)"
              >
                <a href="#">Regression_flow</a>
              </a-popconfirm>
            </a-button>
          </a-button-group>
        </template>
        <template #time="{text}">
          {{ moment(text).format("YYYY-MM-DD hh:mm:ss") }}
        </template>
      </a-table>
    </div>
    <div style="text-align: right;margin-top: 10px">
      <a-pagination
        v-model:current="currentPage"
        v-model:pageSize="pageSize"
        :total="total"
        @change="handleSizeChange"
      >
      </a-pagination>
    </div>

    <ReleaseModal
      :data="modalData"
      :visible="releaseModalVisible"
      :actionType="actionType"
      :close="closeModal"
      :confirm="confirmModal"
    ></ReleaseModal>

    <ReleaseHistoryModal
      :data="ReleaseHistoryList"
      :visible="releaseHistoryModalVisible"
      :actionType="actionType"
      :close="closeHistoryModal"
      :confirm="closeHistoryModal"
    ></ReleaseHistoryModal>
  </div>
</template>

<script>
import {
  getRelease,
  regressionRelease,
  getReleaseHistoryById
} from "../../../server/devops";
import { Release_Columns } from "../const";
import moment from "moment";
import ReleaseModal from "./ReleaseModal";
import ReleaseHistoryModal from "./ReleaseHistoryModal";
import { handleErrorData } from "@/common/js/utils";
import { nextTick, ref, onMounted } from "vue";

export default {
  name: "secret",
  components: {
    ReleaseModal,
	  ReleaseHistoryModal
  },
  mounted() {
    this.LoadData();
  },
  setup() {
    const currentPage = ref(1);
    const total = ref(0);
    const pageSize = ref(10);
    const releaseModalVisible = ref(false);
    const releaseHistoryModalVisible = ref(false);
    const actionType = ref("");
    const ReleaseHistoryList = ref([]);

    const tableLoading = ref(false);
    const ReleaseList = ref([]);

    const LoadData = () => {
      const params = {
        limit: pageSize.value,
        offset: (currentPage.value - 1) * pageSize.value
      };
      tableLoading.value = true;
      getRelease(params)
        .then(res => {
          ReleaseList.value = res.data.results;
          total.value = res.data.count;
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

    onMounted(LoadData);

    return {
      currentPage,
      total,
      pageSize,
      releaseModalVisible,
	    releaseHistoryModalVisible,
      actionType,
      tableLoading,
      ReleaseList,
      ReleaseHistoryList,
      LoadData
    };
  },
  data() {
    return {
      moment,
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
      Release_Columns,
      modalData: {
        name: "",
        ticket_link: "",
        release_time: ""
      },
      Regressionstate: {
        PENDING_REGRESSION_TESTING: "DOING_REGRESSION_TESTING",
        DOING_REGRESSION_TESTING: "FINISHED_REGRESSION_TESTING",
        FINISHED_REGRESSION_TESTING: "RESTARTED_REGRESSION_TESTING",
        RESTARTED_REGRESSION_TESTING: "FINISHED_REGRESSION_TESTING"
      }
    };
  },
  methods: {
    clickAdd() {
      this.clearFormData();
      this.actionType = "add";
      this.releaseModalVisible = true;
    },

    clearFormData() {
      this.modalData = {
        pk: "",
        name: "",
        ticket_link: "",
        release_time: ""
      };
    },

    closeModal() {
      this.releaseModalVisible = false;
      this.clearFormData();
    },

	  closeHistoryModal(){
    	this.releaseHistoryModalVisible = false;
    },

    confirmModal() {
      this.releaseModalVisible = false;
      this.clearFormData();
      this.LoadData();
    },

    EditRelease(row) {
      this.actionType = "Edit";
      this.releaseModalVisible = true;
      this.modalData = {
        pk: row.pk,
        name: row.name,
        ticket_link: row.ticket_link,
        release_time: row.release_time
      };
    },

    handleSizeChange(page, pageSize) {
      this.pageSize = pageSize;
      this.currentPage = page;
      this.LoadData();
    },

    DetailRelease(row) {
      this.$router.push(`/devops/release/detail/${row.pk}`);
    },

    HistoryRelease(row) {
    	this.releaseHistoryModalVisible = true;
      getReleaseHistoryById(row.pk)
        .then(res => {
          this.ReleaseHistoryList = res.data;
          this.tableLoading = false;
        })
        .catch(err => {
          handleErrorData(err);
          this.tableLoading = false;
        });
    },

    RegressionRelease(row) {
      regressionRelease({
        id: row.pk,
        data: {
          state: this.Regressionstate[row.state]
        }
      })
        .then(() => {
          this.$message.success("Regression Complete");
          this.LoadData();
        })
        .catch(err => {
          handleErrorData(err);
        });
    },

    TransferRelease(row) {
      this.$router.push({
        name: "devops_release_transfer",
        params: {
          pk: row.pk
        }
      });
    }
  }
};
</script>

<style scoped></style>
