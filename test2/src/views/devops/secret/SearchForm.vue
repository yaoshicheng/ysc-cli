<template>
  <div class="toolbar">
    <div class="searchBox">
      <a-form
        :inline="true"
        :model="filters"
        class="searchForm"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-row>
          <a-col :sm="12" :md="5" lg="5">
            <a-form-item>
              <a-select
                size="large"
                v-model:value="filters.classification"
                allowClear
                placeholder="Classification"
                showSearch
                option-filter-prop="label"
              >
                <a-select-option
                  v-for="(cla, index) of secret_classification"
                  :value="cla.pk"
                  :key="index"
                >
                  {{ cla.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :sm="12" :md="5" lg="5">
            <a-form-item>
              <a-select
                size="large"
                v-model:value="filters.environment"
                allowClear
                placeholder="Environment"
                showSearch
                option-filter-prop="label"
              >
                <a-select-option
                  v-for="(env, index) of sec_env"
                  :value="env.value"
                  :key="index"
                >
                  {{ env.display_name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :sm="12" :md="5" lg="5">
            <a-form-item>
              <a-input
                size="large"
                v-model:value="filters.key"
                allowClear
                placeholder="Key"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :sm="12" :md="5" lg="5">
            <a-form-item>
              <a-input
                size="large"
                v-model:value="filters.note"
                allowClear
                placeholder="Note"
              ></a-input>
            </a-form-item>
          </a-col>
          <a-col :sm="24" :md="4" lg="4">
            <div class="buttonContainer">
              <a-button type="default" @click="clickAdd">Add</a-button>
              <a-button
                type="primary"
                @click="clickQuery"
                style="margin-left: 10px"
              >
                Search
              </a-button>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "multitoolBarQuery",

  props: {
    secret_classification: {
      type: Array,
      default: () => []
    },
    sec_env: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      labelCol: { span: 0 },
      wrapperCol: { span: 20 },
      environments: [],
      filters: {
        environment: null,
        classification: null,
        key: "",
        note: ""
      }
    };
  },
  methods: {
    clickQuery() {
      this.$emit("click-query", this.filters);
    },

    clickAdd() {
      this.$emit("click-add", this.filters);
    }
  }
};
</script>

<style lang="scss" scoped>
.searchBox {
  width: 100%;
  padding: 20px 10px;
  border-bottom: 1px solid #eee;
}
.toolbar {
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  .searchForm {
    width: 100%;
    /*justify-content: flex-start;*/
    /*display: flex;*/
  }
  .buttonContainer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
