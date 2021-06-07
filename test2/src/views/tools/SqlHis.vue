<template>
  <SearchForm :search="searchData"></SearchForm>

  <a-table
    :pagination="false"
    :columns="SQL_History_Columns"
    :data-source="historyData"
    :scroll="{ x: '100%' }"
    rowKey="pk"
  >
    <template #name="{text}">
      <a>{{ text }}</a>
    </template>
    <template #time="{text}">
      {{ moment(text).format("YYYY-MM-DD hh:mm:ss") }}
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
</template>
<script>
import { SQL_History_Columns } from "./const";
import { loadHistory } from "../../server/tools";
import SearchForm from "./SearchForm";
import moment from "moment";
import { ref, nextTick } from "vue";
import { handleErrorData } from "@/common/js/utils";

export default {
  name: "SqlHistory",
  components: {
    SearchForm
  },
  setup() {
    const historyData = ref([]);
    const total = ref(0);
    const currentPage = ref(1);
    const pageSize = ref(10);
    return {
      historyData,
      total,
      currentPage,
      pageSize
    };
  },
  data() {
    return {
      moment,
      SQL_History_Columns,
      table_loading: false,
      pageSizes: [10],
      filters: {
        who: "",
        database_name: ""
      }
    };
  },
  methods: {
    LoadData() {
      this.table_loading = true;
      let params = {
        who: this.filters.who,
        database_name: this.filters.database_name,
        limit: this.pageSize,
        offset: (this.currentPage - 1) * this.pageSize
      };
      loadHistory(params)
        .then(res => {
          this.historyData = res.data.results;
          this.total = res.data.count;
	        nextTick(() => {
            const timeout = setTimeout(() => {
              this.table_loading = false;
              clearTimeout(timeout);
            }, 200);
          });
        })
        .catch(err => {
	        handleErrorData(err);
          this.table_loading = false;
        });
    },

    handleSizeChange(page, pageSize) {
      this.pageSize = pageSize;
      this.currentPage = page;
      this.LoadData();
    },

	  searchData(data) {
      this.filters = data;
      this.LoadData(data);
    }
  }
};
</script>

<style scoped></style>
