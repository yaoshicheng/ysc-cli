<template>
  <div class="toolbar">
    <a-form
      :inline="true"
      class="searchForm"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-row>
        <a-col :sm="12" :md="7" lg="6">
          <a-form-item>
            <a-input
              size="large"
              allowClear
              v-model:value="database_name"
              placeholder="Database name"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :sm="12" :md="7" lg="6">
          <a-form-item>
            <a-select
              size="large"
              v-model:value="who"
              allowClear
              placeholder="User"
              showSearch
              option-filter-prop="label"
            >
              <a-select-option
                v-for="(user, index) of users"
                :value="user.pk"
                :key="index"
                >{{ user.username }}</a-select-option
              >
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :sm="24" :md="10" lg="12">
          <div class="buttonContainer">
            <a-button type="primary" @click="searchData">
              Search
            </a-button>
          </div>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import { getUsers } from "../../server/user";
import { handleErrorData } from "@/common/js/utils";
import { onMounted, ref } from "vue";

export default {
  name: "SQLSearch",

  props: {
    search: {
      type: Function
    }
  },
  setup(props) {
    const users = ref([]);
    const who = ref(null);
    const database_name = ref("");
    const getDependcy = () => {
      getUsers()
        .then(res => {
          users.value = res.data;
        })
        .catch(err => {
          handleErrorData(err);
        });
      props.search({
        who,
        database_name
      });
    };

    const searchData = () => {
      props.search({
        who,
        database_name
      });
    };

    onMounted(getDependcy);

    return {
      users,
      who,
      database_name,
      getDependcy,
      searchData
    };
  },

  data() {
    return {
      labelCol: { span: 0 },
      wrapperCol: { span: 20 }
    };
  }
};
</script>

<style lang="scss" scoped>
.toolbar {
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  padding: 20px 10px 10px 10px;
  border-bottom: 1px solid #eee;
  .searchForm {
    width: 100%;
  }
  .buttonContainer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
