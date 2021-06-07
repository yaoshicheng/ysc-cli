<template>
  <div class="layout-container">
    <search-form
      :search="search"
      :fetchTask="showFetch"
      :disabled="disabledSelectAll"
      :fetchAll="fetchAll"
      :canFetch="canFetch"
      :hasFetchAll="hasFetchAll"
      :hasAssignAll="hasAssignAll"
      :assignAll="showAssignAll"
    />
    <a-table
      rowKey="pk"
      :row-selection="
        hasSelectAll
          ? {
              selectedRowKeys: selectedRowKeys,
              onChange: onSelectChange
            }
          : null
      "
      @change="handleTableChange"
      :columns="justshow ? justshowColumns : columns"
      :loading="loading"
      :data-source="tableData"
      :scroll="{ x: true }"
      :pagination="pagination"
    >
      <template #scope="{ text,record }">
        <a target="_blank" :href="`${tbUrl}${record.pk}`">{{ text }}</a>
      </template>
      <template #content="{ text }">
        <a-tooltip class="content">
          <template #title>
            {{ text }}
          </template>
          {{ text }}
        </a-tooltip>
      </template>
      <template #done="{ text }">
        <span>{{ text ? "Yes" : "No" }}</span>
      </template>
      <template #issue="{ text,record }">
        <span>{{ record.linked_done_issue_count }}/{{ text }}</span>
      </template>
      <template #date="{ text }">
        <span>{{ formatDate(text) }}</span>
      </template>
      <template #action="data">
        <div class="btn-text-group">
          <a-button type="link" @click="gotoDetail(data)" v-if="canViewDetail">
            View Detail
          </a-button>
          <a-button type="link" @click="gotoDetail(data)" v-if="canTransfer">
            Transfer
          </a-button>
          <a-button type="link" @click="syncTask(data)" v-if="canSync"
            >Sync</a-button
          >
        </div>
      </template>
    </a-table>
    <fetch-task
      :visible="fetchVisible"
      v-if="fetchVisible"
      :afterClose="closeFetchModal"
      :confirmLoading="fetchLoading"
      :handleOk="fetchTaskConfirm"
      :errorData="fetchErrorData"
    />
    <release-modal
      :visible="releaseVisible"
      v-if="releaseVisible"
      :afterClose="closeReleaseModal"
      :confirmLoading="releaseLoading"
      :handleOk="releaseTaskConfirm"
      :errorData="releaseErrorData"
    />
  </div>
</template>

<script>
import { message } from "ant-design-vue";
import {
  fetchNewTask,
  fetchMoreTask,
  syncTaskTransfer
} from "@/server/transfer";
import { assignRelease } from "@/server/kanban";
import { handleErrorData, formatDate } from "@/common/js/utils";
import SearchForm from "./TaskSearch";
import FetchTask from "./FetchTask";
import ReleaseModal from "../kanban/components/ReleaseModal";
const columns = [
  {
    title: "Task ID",
    width: 100,
    dataIndex: "unique_id",
    key: "unique_id",
    fixed: "left",
    align: "center",
    slots: { customRender: "scope" }
  },
  {
    title: "Type",
    width: 80,
    align: "center",
    dataIndex: "scenario",
    key: "scenario",
    fixed: "left"
  },
  {
    title: "Content",
    dataIndex: "content",
    key: "content",
    slots: { customRender: "content" }
  },
  {
    title: "Task List",
    width: 150,
    dataIndex: "task_list.title",
    key: "task_list"
  },
  {
    title: "Stage",
    dataIndex: "stage.name",
    key: "stage",
    align: "center",
    width: 100
  },
  {
    title: "Done",
    width: 100,
    dataIndex: "is_done",
    key: "is_done",
    align: "center",
    slots: { customRender: "done" }
  },
  {
    title: "Issue",
    width: 80,
    dataIndex: "linked_issue_count",
    key: "linked_issue_count",
    align: "center",
    class: "td-disabled",
    slots: { customRender: "issue" }
  },
  {
    title: "Created",
    dataIndex: "created",
    key: "created",
    width: 180,
    align: "center",
    slots: { customRender: "date" }
  },
  {
    title: "Updated",
    dataIndex: "updated",
    key: "updated",
    align: "center",
    width: 180,
    slots: { customRender: "date" }
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    align: "center",
    class: "td-disabled",
    width: 200,
    slots: { customRender: "action" }
  }
];
export default {
  components: {
    SearchForm,
    FetchTask,
    ReleaseModal
  },
  props: [
    "justshow",
    "getData",
    "param",
    "detailName",
    "canFetch",
    "hasFetchAll",
    "canViewDetail",
    "canTransfer",
    "canSync",
    "hasSelectAll",
    "hasAssignAll"
  ],
  data() {
    return {
      disabledSelectAll: true,
      columns,
      justshowColumns: this.$lodash.filter(
        columns,
        item => item.class != "td-disabled"
      ),
      tbUrl: "https://www.teambition.com/task/",
      selectedRowKeys: [],
      searchData: {
        is_done: "",
        unique_id: "",
        task_list: "",
        stage: ""
      },
      loading: false,
      fetchVisible: false,
      fetchLoading: false,
      releaseVisible: false,
      releaseLoading: false,
      tableData: [],
      pagination: {
        showQuickJumper: true,
        total: 0,
        current: 1,
        pageSize: 10
      },
      formatDate,
      fetchErrorData: {}
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    search(data) {
      this.pagination.current = 1;
      this.searchData = data;
      this.loadData();
    },
    loadData() {
      const { get, replace } = this.$lodash;
      const {
        searchData,
        pagination: { current, pageSize }
      } = this;
      const params = {
        ...searchData,
        ...this.$props.param,
        unique_id: replace(get(searchData, "unique_id", ""), "MTX-", ""),
        limit: pageSize,
        offset: (current - 1) * pageSize
      };

      this.loading = true;
      this.$props
        .getData(params)
        .then(res => {
          this.pagination.total = get(res, "data.count", 0);
          this.tableData = res.data.results;
          this.$nextTick(() => {
            setTimeout(() => {
              this.loading = false;
            }, 200);
          });
        })
        .catch(err => {
          this.loading = false;
          handleErrorData(err);
        });
    },
    onSelectChange(selectedRowKeys) {
      const { size } = this.$lodash;
      this.selectedRowKeys = selectedRowKeys;
      if (size(selectedRowKeys)) {
        this.disabledSelectAll = false;
      } else {
        this.disabledSelectAll = true;
      }
    },
    handleTableChange(pagination) {
      this.pagination.current = pagination.current;
      this.loadData();
    },
    showFetch() {
      this.fetchVisible = true;
    },
    closeFetchModal() {
      this.fetchVisible = false;
      this.fetchLoading = false;
    },
    showAssignAll() {
      this.releaseVisible = true;
    },
    closeReleaseModal() {
      this.releaseVisible = false;
      this.releaseLoading = false;
    },
    fetchTaskConfirm(id) {
      const { replace } = this.$lodash;
      this.fetchLoading = true;
      const params = {
        unique_ids: [replace(id, "MTX-", "")]
      };
      fetchNewTask(params)
        .then(() => {
          message.success("Fetch Success");
          this.closeFetchModal();
          this.loadData();
        })
        .catch(err => {
          this.fetchLoading = false;
          const { errorData } = err;
          this.fetchErrorData = errorData;
        });
    },
    releaseTaskConfirm(id) {
      this.releaseLoading = true;
      const params = {
        tasks: this.selectedRowKeys,
        action: "ADD",
        release_pk: id
      };
      assignRelease(params)
        .then(() => {
          this.releaseLoading = false;
          this.selectedRowKeys = [];
          this.disabledSelectAll = true;
          message.success("Assign Complete");
          this.closeReleaseModal();
          this.loadData();
        })
        .catch(err => {
          this.releaseLoading = false;
          handleErrorData(err);
        });
    },
    fetchAll() {
      const params = {
        unique_ids: this.selectedRowKeys
      };
      this.loading = true;
      fetchMoreTask(params)
        .then(() => {
          this.loading = false;
          this.selectedRowKeys = [];
          this.disabledSelectAll = true;
          message.success("Success complete");
          this.loadData();
        })
        .catch(err => {
          this.loading = false;
          handleErrorData(err);
        });
    },
    gotoDetail(data) {
      const pk = this.$lodash.get(data, "record.pk", "");
      const name = this.$props.detailName;
      let accesstype = "";
      switch (name) {
        case "transferDetail":
          accesstype = "taskdetail";
          break;
        case "kanbanDetail":
          accesstype = "kanban";
          break;
        default:
          accesstype = "";
      }
      if (pk && name && accesstype) {
        this.$router.push({
          name,
          query: {
            pk,
            accesstype
          }
        });
      }
    },
    syncTask(data) {
      const pk = this.$lodash.get(data, "record.pk", "");
      if (pk) {
        this.loading = true;
        syncTaskTransfer(pk)
          .then(() => {
            message.success("Success complete");
            this.loading = false;
          })
          .catch(err => {
            this.loading = false;
            handleErrorData(err);
          });
      }
    }
  }
};
</script>
<style scoped lang="less">
.content {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
