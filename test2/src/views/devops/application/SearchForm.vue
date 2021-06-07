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
                v-model:value="filters.application_type"
                allowClear
                placeholder="Application type"
                showSearch
                option-filter-prop="label"
              >
                <a-select-option v-for="(apptype,apptypeindex) of application_type" :key="apptypeindex" :label="apptype.label" :value="apptype.value" >
                  {{ apptype.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :sm="12" :md="5" lg="5">
            <a-form-item>
              <a-select
                size="large"
                v-model:value="filters.module"
                allowClear
                placeholder="Module"
                showSearch
                option-filter-prop="label"
              >
                <a-select-option
                  v-for="(module,moduleindex) of appmodule"
                  :value="module.value"
                  :key="moduleindex"
                >
                  {{ module.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :sm="12" :md="5" lg="5">
            <a-form-item>
              <a-input
                size="large"
                v-model:value="filters.name"
                allowClear
                placeholder="Name"
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
	import { ops_config } from "@/common/const";
export default {
  name: "AppSearch",

  props: {},

  data() {
    return {
      labelCol: { span: 0 },
      wrapperCol: { span: 20 },
	    appmodule: ops_config.appmodule,
	    application_type: ops_config.application_type,
      filters: {
	      application_type: null,
        module: null,
        name: "",
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
